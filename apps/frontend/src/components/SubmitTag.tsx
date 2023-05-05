import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Submittag = () => {
  const [name, setTagName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem('user') || '{}');
    const createdBy = data.user._id;
    const tags = { name, createdBy };

    const create_tag_url = process.env.REACT_APP_API_URL + "tag";
    fetch(create_tag_url, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tags)
    })
    .then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json();
        console.log("err:" , errorData);
        throw new Error(errorData.error);
      }
      return response.json();
    })
    .then(() => {
      console.log('new tag submitted');
      navigate('/');
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error.message);
      setError(error.message);
    });
  }

  return (
    <div className="create">
      <h2>Submit a new tag</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>TagName</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setTagName(e.target.value)}
        />
        <button>Add Tag</button>
      </form>
    </div>
  );
}

export default Submittag;
