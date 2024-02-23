export type civ5saveinfo = {
  chunkStarts: number[],
  civ: string,
  save: number,
  game: string,
  build: string,
  turn: number,
  startingCiv: string,
  handicap: string, 
  era: string,
  currentEra: string,
  gameSpeed: string,
  worldSize: string,
  mapScript: string,

  dlcs: { id: string, name: string }[],
  mods: { id: string, ver: number, name: string }[],

  headerLength: number,
  civilizations: {
    playerName: string,
    type: number,
    name: string,
    leader: string,
    password: string,
    color: string,
  }[],

  barbarianCount: number,
  player: number,
};

export function parse(
  buffer: Buffer,
  validate: boolean = true
): civ5saveinfo;