import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';

const PostList = ({ extraPosts }) => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setPosts([...extraPosts, ...data]));

    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, [extraPosts]);

  const getAuthorName = (userId, userName) => {
    if (userName) {
      return userName;
    }
    const user = users.find(user => user.id === userId);
    return user ? user.name : 'Unknown';
  };

  return (
    <div>
      <h1>News Feed</h1>
      {posts.map(post => (
        <Card key={post.id} className="post-card">
          <CardActionArea component={Link} to={`/post/${post.id}`}>
            <CardContent>
              <Typography variant="h5" component="div">
                {post.title}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Author: {getAuthorName(post.userId, post.userName)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {post.body}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
};

export default PostList;
