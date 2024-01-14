"use client";

export function CopyPublishLinkButton({ binary, className }: { binary: string, className?: string}) {
  const url = `${document.location.origin}/publish/text?d=${binary}`;
  return <button onClick={() => navigator.clipboard.writeText(url)} className={className}>텍스트 링크 복사</button>
}