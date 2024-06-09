import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetails from './components/PostDetails';
import NewPostForm from './components/NewPostForm';
import { Container } from '@mui/material';

function App() {
  const [posts, setPosts] = useState([]);

  const addNewPost = newPost => {
    setPosts([newPost, ...posts]);
  };

  return (
    <Router>
      <Container maxWidth="md">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NewPostForm onNewPost={addNewPost} />
                <PostList extraPosts={posts} />
              </>
            }
          />
          <Route path="/post/:postId" element={<PostDetails />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
