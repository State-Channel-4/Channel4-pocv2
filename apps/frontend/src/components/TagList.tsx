import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TagType } from '../types'

type TagListProps = {
    tags: TagType[]
    title: string
}

const TagList = ({ tags, title }: TagListProps) => {
  const [selectedTags, setSelectedTags] = useState<TagType[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    console.log(selectedTags)
  }, [selectedTags])

  const handleCheckedTags = (tagId: TagType) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((t) => t !== tagId))
    } else {
      setSelectedTags([...selectedTags, tagId])
    }
  }

  return (
    <div className="tag-list">
      <h2>{title}</h2>
      {tags.map((tag, index) => (
        <div className="tag-preview" key={`${tag._id}-${index}`}>
          <input
            type="checkbox"
            checked={selectedTags.includes(tag)}
            onChange={() => handleCheckedTags(tag)}
          />
          <label>{tag.name}</label>
        </div>
      ))}
      <p>Please select at least one tag to discover content</p>
      <button onClick={() => {
        navigate("/discover", { state: { taglist: selectedTags } })
      }}>discover</button>
    </div>
  )
}

export default TagList
