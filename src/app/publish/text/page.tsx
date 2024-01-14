import Civ5RenderedText_Server from "@/components/Civ5RenderedText_Server";
import { decodeBase64ToUnicode } from "@/utils";

const TextPage = ({ 
  searchParams
} : { 
  searchParams?: {
    [key: string]: string
  }
}) => {
  const param = searchParams?.d;
  const text = typeof param === "string" ? decodeBase64ToUnicode(param) : "";

  return (
    <Civ5RenderedText_Server str={text}/>
   );
}
 
export default TextPage;