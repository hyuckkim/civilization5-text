import { civ5saveinfo } from "@/utils/civsaveparser/parser_5";

export const CivilizationInfo = ({
  i
}: {
  i: civ5saveinfo,
}) => {
  const isGameSpeedValue = (value: string): value is 
    ("GAMESPEED_QUICK"
    | "GAMESPEED_STANDARD"
    | "GAMESPEED_EPIC"
    | "GAMESPEED_MARATHON") =>
    value === "GAMESPEED_QUICK" ||
    value === "GAMESPEED_STANDARD" ||
    value === "GAMESPEED_EPIC" ||
    value === "GAMESPEED_MARATHON";
  
  const gameSpeed = {
    GAMESPEED_QUICK: "빠름",
    GAMESPEED_STANDARD: "표준",
    GAMESPEED_EPIC: "서사시",
    GAMESPEED_MARATHON: "마라톤",
  }[isGameSpeedValue(i.gameSpeed) ? i.gameSpeed : "GAMESPEED_STANDARD"];

  return (
    <div className="flex flex-col">
      <label>{i.civilizations[0].name}</label>
      <label>속도: {gameSpeed}, {i.turn}턴</label>
    </div>
  )
}