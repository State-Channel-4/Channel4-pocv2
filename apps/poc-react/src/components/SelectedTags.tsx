import { useEffect, useState } from "react"
import Select from "react-select"

function SelectTags() {
  const [tags, setTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])

  useEffect(() => {
    const storedTags = localStorage.getItem("tags")
    if (storedTags) {
      setTags(JSON.parse(storedTags))
    }
  }, [])

  const options = tags.map((tag) => ({ value: tag, label: tag }))

  const handleTagSelection = (selectedOptions: any) => {
    const selectedTags = selectedOptions.map((option: any) => option.value)
    setSelectedTags(selectedTags)
  }

  return (
    <Select
      options={options}
      value={selectedTags.map((tag) => ({ value: tag, label: tag }))}
      isMulti
      onChange={handleTagSelection}
    />
  )
}

export default SelectTags
