import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SelectTags from '../components/SelectedTags'
import { API_URL } from '../constants'


const Submiturl = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault()
      const blog = { title, body }

      fetch(API_URL + '/blogs', {
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
      )
}

export default Submiturl