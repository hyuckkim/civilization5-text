"use client";

import { useOrigin } from "@/hooks/useOrigin";

export function CopyPublishKeyButton({ binary, className }: { binary: string, className?: string}) {
  const origin = useOrigin();
  const url = `${origin}/publish?k=${binary}`;
  return <button onClick={() => navigator.clipboard.writeText(url)} className={className}>키 링크 복사</button>
}