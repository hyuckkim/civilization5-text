import Civ5RenderedText_Server from "@/components/Civ5RenderedText_Server";
import { getText } from "@/db";
import { Base64 } from "js-base64";

const TextPage = ({ 
  searchParams
} : { 
  searchParams?: {
    [key: string]: string
  }
}) => {
  const binary = searchParams?.d;
  const key = searchParams?.k;
  
  const text = typeof binary === "string" 
    ? Base64.decode(binary)
    : typeof key === "string"
      ? getText(key, "Language_ko_KR").Text
      : "";
0
  return (
    <Civ5RenderedText_Server str={text}/>
   );
}
 
export default TextPage;