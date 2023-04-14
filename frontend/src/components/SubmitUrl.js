import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectTags from "./SelectTags";


const Submiturl = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const navigate = useNavigate()
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const blog = { title, body };
  
      fetch('http://localhost:8000/blogs/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog)
      }).then(() => {
        console.log('new url submitted');
        navigate('/')
      })
      
    }
    return (
        <div className="create">
          <h2>Submit a new url</h2>
          <form onSubmit={handleSubmit}>
            <label>Url title:</label>
            <input 
              type="text" 
              required 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>url :</label>
            <textarea
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
            <label>tags:</label>
            <SelectTags></SelectTags>
            <button>Add URL</button>
          </form>
        </div>
      );
}
export default Submiturl;