import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Traverse random content from all over the internet.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          Unlock a world of surprises and laughter with Channel 4! Explore
          random content, and submit the creative gems with our community. 🎉✨
        </p>
      </div>
      <div className="flex gap-4">
        <Link href={`/discover`} className={buttonVariants({ size: "lg" })}>
          Start your journey ✨
        </Link>
      </div>
    </section>
  )
}
