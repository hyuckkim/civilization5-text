import Civ5RenderedText_Server from "@/components/Civ5RenderedText_Server";
import { Base64 } from "js-base64";

const TextPage = ({ 
  searchParams
} : { 
  searchParams?: {
    [key: string]: string
  }
}) => {
  const param = searchParams?.d;
  const text = typeof param === "string" ? Base64.decode(param) : "";
0
  return (
    <Civ5RenderedText_Server str={text}/>
   );
}
 
export default TextPage;