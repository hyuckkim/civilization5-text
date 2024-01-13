import { ChangableRenderedText } from "@/components";

export default async function Page() {
  return (
      <div className='mx-auto my-0'>
          <div className="text-5xl text-center p-8">Diff Two</div>
          <div className="flex justify-center w-full">
              <div className="flex flex-col w-1/2">
                  <ChangableRenderedText text="" />
              </div>
              <div className="flex flex-col w-1/2">
                  <ChangableRenderedText text="" />
              </div>
          </div>
      </div>
  )
}