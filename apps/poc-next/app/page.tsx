"use client"

import { useState } from "react"
import { Tag, TagMap } from "@/types"
import useSWR from "swr"

import TagList from "@/components/ui/tag-list"

const getTags = async () => {
  try {
    // TODO: Tags should only return tags that have links
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/tag")
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

export default async function IndexPage() {
  const [tags, setTags] = useState<TagMap>(new Map())

  useSWR("tag", getTags, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    onSuccess: (data) => {
      let _tags: TagMap = new Map()
      if (data && "tags" in data) {
        data.tags.forEach((tag: Tag) => {
          _tags.set(tag._id, tag)
        })
        setTags(_tags)
      } else {
        _tags = new Map()
      }
    },
  })

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6">
      <div className="flex max-w-[900px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight sm:text-3xl md:text-5xl lg:text-6xl">
          Your journey starts here.
        </h1>
        <p className="text-foreground/70 max-w-[700px] text-lg sm:text-xl">
          Get ready to see random content from all over the internet. You can
          choose tags first or just click the button below to get started.
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
