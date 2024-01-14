"use client";

import { useOrigin } from "@/hooks/useOrigin";

export function CopyPublishLinkButton({ binary, className }: { binary: string, className?: string}) {
  const origin = useOrigin();
  const url = `${origin}/publish?d=${binary}`;
  return <button onClick={() => navigator.clipboard.writeText(url)} className={className}>텍스트 링크 복사</button>
}