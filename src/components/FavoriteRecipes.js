import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function AddCourse(props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // Save course and close modal form
  const handleAdd = () => {
    // Pass the title and description to the addCourse function
    props.addCourse({ title, description });
    handleClose();
  };

  return (
    <div>
      <Button
        id="addCourse"
        variant="outlined"
        color="primary"
        style={{ margin: 10 }}
        onClick={handleClickOpen}
      >
        Add Recipe
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Recipe</DialogTitle>
        <DialogContent style={{ paddingTop: 20 }}>
          <TextField
            id="title"
            autoFocus
            fullWidth
            label="Title"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
          <TextField
            id="description"
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button id="add" color="primary" onClick={handleAdd}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// required property:  addCourse is a function to call to perform the Add action
AddCourse.propTypes = {
  addCourse: PropTypes.func.isRequired,
};

export default AddCourse;