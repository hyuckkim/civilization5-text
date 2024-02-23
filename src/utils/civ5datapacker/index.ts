import _data from "./packages.json";
const data: {
  name: string,
  dlcs?: string[],
  mods?: string[]
}[] = _data;

export function packaging(
  dlcs: { id: string, name: string }[],
  mods: { id: string, ver: number, name: string }[],
): {
  packages: {
    name: string,
    dlcs?: { id: string, name: string }[],
    mods?: { id: string, ver: number, name: string }[],
  }[],
  remainDlcs: { id: string, name: string }[],
  remainMods: { id: string, ver: number, name: string }[],
} {

  const dlcIds = dlcs.map(v => v.id);
  const modIds = mods.map(v => v.id);

  const packages = data.filter(p => {
    return (p.dlcs
      ?.filter(d => 
      dlcIds.includes(d))
      .length === p.dlcs?.length)
    && (p.mods
      ?.filter(m => 
      modIds.includes(m))
      .length === p.mods?.length)
  }).map(p => {
    return {
      name: p.name,
      dlcs: p.dlcs?.map(pd => dlcs.filter(d => d.id === pd)[0]),
      mods: p.mods?.map(pm => mods.filter(m => m.id === pm)[0])
    }
  });
  const flatDlcs = packages
    .map(p => p.dlcs)
    .reduce((prev, curr) => [...prev ?? [], ...curr ?? []], []);
  const flatMods = packages
    .map(p => p.mods)
    .reduce((prev, curr) => [...prev ?? [], ...curr ?? []], []);

  const remainDlcs = dlcs.filter(d => !flatDlcs?.includes(d));
  const remainMods = mods.filter(m => !flatMods?.includes(m));

  return {
    packages,
    remainDlcs,
    remainMods,
  }
}