import React, { useState } from 'react';

const PostInput = () => {
  const [post, setPost] = useState('');
  const [posts, setPosts] = useState([]);

  const handleChange = (event) => {
    setPost(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (post.trim()) {
      setPosts([...posts, post]);
      setPost('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={post}
          onChange={handleChange}
          placeholder="Enter your post here"
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        {posts.map((p, index) => (
          <div key={index}>
            <p>{p}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostInput;