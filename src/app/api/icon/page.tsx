import { getAllIcon } from "@/db"
import Civ5RenderedText_Server from "@/components/Civ5RenderedText_Server";

export default function IconPage() {
  const icons = getAllIcon();
  const merged = icons.reduce((prev, curr) => 
    prev + `[${curr}]`,
  "");

  return (
    <div className='mx-auto m-0 max-w-2xl'>
      <div className="text-5xl text-center p-8">Icons</div>
      <textarea defaultValue={merged} disabled className='w-full resize-y bg-gray-300 h-48 border-gray-200 border-2'/>
      <Civ5RenderedText_Server str={merged} />
    </div>
  )
}