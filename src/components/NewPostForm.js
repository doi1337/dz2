import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const NewPostForm = ({ onNewPost }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const newPost = {
      title,
      body,
      userId: 1, // Используем userId 1 для простоты
      userName: 'Смагин Данила Алексеевич', // Указываем ваше имя
    };
    onNewPost(newPost);
    setTitle('');
    setBody('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: 2 }}>
      <TextField
        label="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        fullWidth
        required
        sx={{ marginBottom: 1 }}
      />
      <TextField
        label="Body"
        value={body}
        onChange={e => setBody(e.target.value)}
        fullWidth
        required
        multiline
        rows={4}
        sx={{ marginBottom: 1 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Publish
      </Button>
    </Box>
  );
};

export default NewPostForm;
