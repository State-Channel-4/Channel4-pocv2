// SwitchFrame.js
import React, { useState } from 'react';
import './SwitchFrame.css';

const SwitchFrame = ({ initialUrl, urlId, userAddress }) => {
  const [currentUrl, setCurrentUrl] = useState(initialUrl);

  const handleVote = async (voteType) => {
    try {
      const response = await fetch(`http://localhost:4000/api/vote/${urlId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: userAddress,
          vote: voteType,
        }),
      });

      if (!response.ok) {
        throw new Error('Error during voting');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpvote = () => {
    handleVote('upvote');
  };

  const handleDownvote = () => {
    handleVote('downvote');
  };

  const handleSwitch = async () => {
    const newUrl = await fetchNewUrl(); // Replace with your method to fetch a new URL
    setCurrentUrl(newUrl);
  };

  const handleOpenInNewTab = () => {
    window.open(currentUrl, '_blank');
  };

  const fetchNewUrl = async() => {
    console.log("new url")
  }

  return (
    <div className="Switch-frame">
      <iframe src={currentUrl} title="SwitchFrame" className="Switch-iframe" />
      <div className="bottom-navbar">
        <button onClick={handleUpvote}>Upvote</button>
        <button onClick={handleDownvote}>Downvote</button>
        <button onClick={handleOpenInNewTab}>Open in New Tab</button>
        <button onClick={handleSwitch}>Switch</button>
      </div>
    </div>
  );
};

export default SwitchFrame;
