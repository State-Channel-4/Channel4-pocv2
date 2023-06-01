"use client";

import { C4Content } from "@/types";





const SiteFrame = ({ content }: { content: C4Content | null }) => {
  if (!content) return null

  return (
    <section className="bg-c4-gradient-main h-[768px] rounded-2xl pe-2 ps-2">
      <div className="bg-secondary relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl">
        <iframe src={content.url} className="h-full w-full"></iframe>
      </div>
    </section>
  )
}

export default SiteFrame