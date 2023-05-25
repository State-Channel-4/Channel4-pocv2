import { Tag, TagMap } from "@/types"

import TagList from "@/components/ui/tag-list"

const getTags = async () => {
  try {
    // TODO: Tags should only return tags that have links
    const response = await fetch(process.env.API_URL + "/tag")
    const data: { tags: Tag[] } = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

export default async function IndexPage() {
  const data = await getTags()
  let tags: TagMap = new Map()

  if ("tags" in data) {
    data.tags.forEach((tag) => {
      tags.set(tag._id, tag)
    })
  } else {
    tags = new Map()
  }
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6">
      <div className="flex max-w-[900px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Your journey starts here.
        </h1>
        <p className="text-foreground/70 max-w-[700px] text-lg sm:text-xl">
          Start by selecting tags that interest you. We&apos;ll use these tags
          to generate a randomized feed of content for you.
        </p>
      </div>
      <TagList
        tags={tags}
        title={"Choose as many tags as you'd like."}
        selectable
      />
    </section>
  )
}
