import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TagList = ({ tags, title }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    console.log(selectedTags);
  }, [selectedTags]);

  const handleCheckedTags = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((t) => t !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  return (
    <div className="tag-list">
      <h2>{title}</h2>
      {tags.tags.map((tag, index) => (
        <div className="tag-preview" key={`${tag._id}-${index}`}>
          <input
            type="checkbox"
            checked={selectedTags.includes(tag._id)}
            onChange={() => handleCheckedTags(tag._id)}
          />
          <label>{tag.name}</label>
        </div>
      ))}
      <p>Please select at least one tag to discover content</p>
      <button onClick={() => {
        navigate("/discover", { state: { taglist: selectedTags } });
      }}>discover</button>
    </div>
  );
};

export default TagList;
