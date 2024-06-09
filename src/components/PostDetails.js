import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Box, TextField, Button } from '@mui/material';

const PostDetails = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState(null);
  const { postId } = useParams();
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(response => response.json())
      .then(data => {
        setPost(data);
        return data.userId;
      })
      .then(userId =>
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      )
      .then(response => response.json())
      .then(data => setAuthor(data));

    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then(response => response.json())
      .then(data => setComments(data));
  }, [postId]);

  const handleAddComment = () => {
    if (commentText) {
      const newComment = {
        body: commentText,
        postId: parseInt(postId),
        id: comments.length + 1,
      };
      setComments([...comments, newComment]);
      setCommentText('');
    }
  };

  return (
    <div>
      {post && author && (
        <Card className="post-details-card">
          <CardContent>
            <Typography variant="h4" component="div">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Author: {author.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {post.body}
            </Typography>
            <Typography variant="h5" component="div" sx={{ marginTop: 2 }}>
              Comments
            </Typography>
            {comments.map(comment => (
              <Card key={comment.id} className="comment-card">
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {comment.body}
                  </Typography>
                </CardContent>
              </Card>
            ))}
            <Box component="form" sx={{ marginTop: 2 }}>
              <TextField
                label="Add a comment"
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                fullWidth
                multiline
                rows={2}
                sx={{ marginBottom: 1 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddComment}
              >
                Add Comment
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PostDetails;
