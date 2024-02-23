'use strict';

module.exports = {
  parse: function(buffer, validate = true) {
    const result = {
      chunkStarts: [],
    };

    // Process header information
    processHeader(buffer, result);

    // Make sure file ends correctly...
    if (!buffer.slice(buffer.length - 4, buffer.length).equals(Buffer.from([0, 0, 0xFF, 0xFF]))) {
      throw new Error('Truncated save file detected!');
    }

    let chunkCount = 0;
    let chunk = {
      endIndex: result.headerLength,
    };

    result.civilizations = [];

    while (null !== (chunk = getChunk(buffer, chunk.endIndex))) {
      result.chunkStarts[chunkCount] = chunk.startIndex - DELIMITER.length;

      // 1st chunk contains player names
      if (chunkCount === 1) {
        while (chunk.pos < chunk.buffer.length) {
          result.civilizations.push({
            playerName: readString(chunk),
          });
        }
      }

      // 2nd chunk contains the type/status of civilization - 1 alive, 2 dead, 3 human, 4 missing
      if (
        chunkCount === 2 ||
        (result.civ === 'CIV5' && chunkCount === 26) ||
        (result.civ === 'CIVBE' && chunkCount === 29)
      ) {
        let i = 0;
        while (chunk.pos < chunk.buffer.length) {
          if (!result.civilizations[i]) {
            break;
          }

          if (!result.civilizations[i].type) {
            result.civilizations[i].type = readInt(chunk);
          } else {
            const secondaryType = readInt(chunk);
            if (validate && result.civilizations[i].type !== secondaryType) {
              console.log(chunk.buffer);
              throw new Error(
                  `Secondary player type chunk did not validate! ` +
                  `Index: ${i}, type: ${result.civilizations[i].type}, secondary: ${secondaryType}`
              );
            }
          }

          i++;
        }
      }

      // 6th chunk contains all civ names
      if (chunkCount === 6) {
        let i = 0;
        while (chunk.pos < chunk.buffer.length) {
          const civ = readString(chunk);
          if (civ.trim() !== '') {
            result.civilizations[i].name = civ;
          }
          i++;
        }
      }

      // 7th chunk contains leader names and current player byte
      // The current player byte is at the end of the seventh chunk...
      if (chunkCount === 7) {
        // Read through leader names
        result.barbarianCount = 0;
        let i = 0;
        while (chunk.pos < chunk.buffer.length && i < result.civilizations.length) {
          result.civilizations[i].leader = readString(chunk);
          if (result.civilizations[i].leader === 'LEADER_BARBARIAN') {
            result.barbarianCount++;
          }
          i++;
        }
        // Look 4 bytes backwards from end of chunk for the current player...
        result.player = chunk.buffer.readUInt32LE(chunk.buffer.length - 16);
      }

      // 11th chunk contains passwords
      if (chunkCount === 11) {
        let i = 0;
        while (chunk.pos < chunk.buffer.length && i < result.civilizations.length) {
          result.civilizations[i].password = readString(chunk);
          i++;
        }
      }

      if ((result.civ === 'CIV5' && chunkCount === 23) || (result.civ === 'CIVBE' && chunkCount === 26)) {
        // Read through player colors, make sure we find them to fix turn 64 issues
        let i = 0;
        while (chunk.pos < chunk.buffer.length && i < result.civilizations.length) {
          const colorString = readString(chunk);

          if (i === 0 && (!colorString || colorString.charCodeAt(0) === 0)) {
            chunkCount--;
            break;
          }

          result.civilizations[i].color = colorString;

          i++;
        }
      }
      chunkCount++;
    }

    // remove missing civs (status 4)
    for (let i = result.civilizations.length-1; i >= 0; i--) {
      if (!result.civilizations[i].name || result.civilizations[i].type === 4) {
        result.civilizations.splice(i, 1);
      }
    }

    return result;
  },
};

// Parse helper functions
const DELIMITER = Buffer.from([0x40, 0, 0, 0]);

function getChunk(buffer, startIndex) {
  const result = {
    startIndex: startIndex,
    pos: 0,
  };

  if (!startIndex) {
    result.startIndex = buffer.indexOf(DELIMITER);
  }

  result.startIndex += DELIMITER.length;

  result.endIndex = buffer.indexOf(DELIMITER, result.startIndex);

  if (result.endIndex >= 0) {
    result.buffer = buffer.slice(result.startIndex, result.endIndex);
    return result;
  }

  return null;
}

function processHeader(buffer, result) {
  const buf = {
    buffer: buffer,
    pos: 0,
  };

  result.civ = readString(buf, 4);

  if (result.civ !== 'CIV5') {
    buf.pos = 0;
    result.civ = readString(buf, 5);

    if (result.civ !== 'CIVBE') {
      throw new Error('No Civ Save File Header Found!');
    }
  }

  result.save = readInt(buf);
  result.game = readString(buf);
  result.build = readString(buf);
  result.turn = readInt(buf);
  // TODO: investigate this Byte
  skipBytes(buf, 1);
  result.startingCiv = readString(buf);
  result.handicap = readString(buf);
  result.era = readString(buf);
  result.currentEra = readString(buf);
  result.gameSpeed = readString(buf);
  result.worldSize = readString(buf);
  result.mapScript = readString(buf);
  result.dlcs = [];
  result.mods = [];

  const dlcLength = readInt(buf);

  for (let i = 0; i < dlcLength; i++) {
    const id = buf.buffer.slice(buf.pos, (buf.pos += 16)).toString('hex');
    buf.pos += 4;
    const name = readString(buf);

    result.dlcs.push({id, name});
  }

  const modLength = readInt(buf);

  for (let i = 0; i < modLength; i++) {
    const id = readString(buf);
    const ver = readInt(buf);
    const name = readString(buf);

    result.mods.push({id, ver, name});
  }

  // Skipping rest of header - There is still more content in the header to investigate
  result.headerLength = buf.buffer.indexOf(DELIMITER, buf.pos);
}

function readString(buf, length) {
  if (!length) {
    length = readInt(buf);

    if (length === 0 || length > 1000) {
      return '';
    }
  }

  return buf.buffer.slice(buf.pos, (buf.pos += length)).toString();
}

function readInt(buf) {
  const int = buf.buffer.readUInt32LE(buf.pos);
  buf.pos+=4;
  return int;
}

function skipBytes(buf, num) {
  buf.pos += num;
}