import { C4Content, TagMap } from "@/types"
import { Fetcher } from "swr"

export const getMix: Fetcher<{ urls: C4Content[] }, TagMap> = (tags) => {
  const tagQueries = new URLSearchParams()
  tags.forEach((tag) => tagQueries.append("tags", tag._id))
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/mix?${tagQueries.toString()}`
  ).then((response) => response.json())
}

export const updateLikesInApi = (contentId: string) => {
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/likes/${contentId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  }).then((response) => {
    return response.json()
  })
}

export const feedbackMessages = {
  "not-found": "No content found for the selected tags. Please try again.",
  "no-tags": "No tags selected. Please select at least one tag.",
  loading: "Loading content...",
}
