import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Tag } from "../types"

type TagListProps = {
  tags: Tag[]
  title: string
}

const TagList = ({ tags, title }: TagListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    console.log(selectedTags)
  }, [selectedTags])

  const handleCheckedTags = (tagId: Tag) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((t) => t !== tagId))
    } else {
      setSelectedTags([...selectedTags, tagId])
    }
  }

  return (
    <section>
      <h2>{title}</h2>
      {tags.length === 0 && <p>No tags found</p>}
      {tags.map((tag, index) => (
        <div key={`${tag._id}-${index}`}>
          <input
            type="checkbox"
            checked={selectedTags.includes(tag)}
            onChange={() => handleCheckedTags(tag)}
          />
          <label>{tag.name}</label>
        </div>
      ))}
      <p>Please select at least one tag to discover content</p>
      <button
        onClick={() => {
          navigate("/discover", { state: { taglist: selectedTags } })
        }}
      >
        discover
      </button>
    </section>
  )
}

export default TagList
