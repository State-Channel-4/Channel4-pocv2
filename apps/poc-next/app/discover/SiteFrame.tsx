"use client"

import { Channel4Link } from "@/types"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

const SiteFrame = ({ content }: { content: Channel4Link }) => {
  return (
    <section className="bg-c4-gradient h-[768px] rounded-2xl pe-2 ps-2">
      <div className="bg-secondary relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl">
        <div className="text-primary absolute bottom-3 left-3 flex select-none flex-col  gap-1 rounded-lg bg-slate-800/70 p-3 backdrop-blur-sm">
          <p className="font-mono text-xs uppercase tracking-widest">
            Now viewing
          </p>
          <p className="text-base font-semibold">{content.title}</p>
          <p className="text-sm">by {content.submittedBy}</p>
        </div>
        <Button
          className={cn(
            buttonVariants({ size: "lg" }),
            "bg-c4-gradient absolute bottom-3 right-3 rounded-full font-bold transition hover:scale-105"
          )}
          onClick={() => console.log("clicked")}
        >
          next
        </Button>
        <iframe src={content.url} className="h-full w-full"></iframe>
      </div>
    </section>
  )
}

export default SiteFrame
