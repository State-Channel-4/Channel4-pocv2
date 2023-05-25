"use client"

import { Channel4Link } from "@/types"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

const SiteFrame = ({ content }: { content: Channel4Link }) => {
  return (
    <section className="bg-c4-gradient h-[768px] rounded-2xl pe-2 ps-2">
      <div className="bg-secondary relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl">
        <iframe src={content.url} className="h-full w-full"></iframe>
      </div>
    </section>
  )
}

export default SiteFrame
