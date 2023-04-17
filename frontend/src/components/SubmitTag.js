import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Submittag = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const navigate = useNavigate()
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const tags = { title, body };
  
      fetch('http://localhost:8000/blogs/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tags)
      }).then(() => {
        console.log('new tag submitted');
        navigate('/')
      })
      
    }
    return (
        <div className="create">
          <h2>Submit a new tag</h2>
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
            <button>Add URL</button>
          </form>
        </div>
      );
}
export default Submittag;