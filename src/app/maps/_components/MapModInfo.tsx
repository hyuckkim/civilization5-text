import { packaging } from "@/utils/civ5datapacker";

export const MapModInfo = ({
  dlcs,
  mods
}: {
  dlcs: { id: string, name: string }[],
  mods: { id: string, ver: number, name: string }[],
}) => {
  const {
    packages,
    remainDlcs,
    remainMods
  } = packaging(dlcs, mods);
  
  return (<div className="flex flex-col">
    <label className="mr-1.5">DLC/모드 묶음:</label>
    {packages.map(v => (
      <div key={v.name} className="relative group">
      <p className="underline text-sm">{v.name}</p>
        <div className="absolute hidden bg-white group-hover:block bottom-3 p-1 m-1 rounded-md shadow-md">
          <label className="mr-1.5">DLC:</label>
          {v.dlcs?.length ?? 0 > 0 ? v.dlcs?.map(d => (
            <p className="text-xs" key={d.id}>{d.name}</p>
          )) : (
            <p className="text-xs">dlc 없음</p>
          )}
          <label className="mr-1.5">모드:</label>
          {v.mods?.length ?? 0 > 0 ? v.mods?.map(m => (
            <p className="text-xs" key={m.id}>{m.name} (v{m.ver})</p>
          )) : (
            <p className="text-xs">모드 없음</p>
          )}
        </div>
      </div>
    ))}
    <label className="mr-1.5">DLC:</label>
    {remainDlcs.length > 0 ? remainDlcs.map(v => (
      <p className="text-sm" key={v.id}>{v.name}</p>
    )) : (
      <p className="text-sm">패키지 이외의 추가 dlc 없음</p>
    )}
    <label className="mr-1.5">모드:</label>
    {remainMods.length > 0 ? remainMods.map(v => (
      <p className="text-sm" key={v.id}>{v.name} (v{v.ver})</p>
    )) : (
      <p className="text-sm">패키지 이외의 추가 모드 없음</p>
    )}
  </div>
  );
}