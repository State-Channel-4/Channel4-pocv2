import { useState } from "react";
import { Link } from "react-router-dom";

const TagList = ({tags, title}) => {
    const [selectedTags, setSelectedTags] = useState([])

    const handleCheckedTags = () => {
    }
    return (
        <div className="tag-list">
            <h2>{title}</h2>
            {tags.tags.map((tag, index) => (
            <div className="tag-preview" key={`${tag.id}-${index}`} >
                <input type="checkbox" value={tag.id} />
                <label>{tag.name}</label>
            </div>
            ))}
        </div>
    );
}
 
export default TagList;