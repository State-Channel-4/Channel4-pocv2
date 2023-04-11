import { useState } from "react";
import { Link } from "react-router-dom";

const TagList = ({tags, title}) => {
    const [selectedTags, setSelectedTags] = useState([])

    const handleCheckedTags = () => {
    }
    return (
        <div className="tag-list">
            <h2>{title}</h2>
            {tags.map(tag => (
            <div className="tag-preview" key={tag.id} >
                <input type="checkbox"
                value={tag.id}>{title}
                </input>
            </div>
            ))}
        </div>
    );
}
 
export default TagList;