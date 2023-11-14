import React, { useState } from 'react';

const EditStudent = (props) => {
  const { studentId, name, email, status } = props.student;
  //store the edited varibles
  const [editedName, setEditedName] = useState(name);
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedStatus, setEditedStatus] = useState(status); 

  // Submit the Edits
  const handleSubmit = (e) => {
    e.preventDefault();
    //We can Update the Name, Email and HOLD Status
    const updatedStudent = {
      studentId,
      name: editedName,
      email: editedEmail,
      status: editedStatus, 
    };

    props.onEdit(updatedStudent);
  };
//The fields to edit Name, Email and HOLD Status
  return (
    <div>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>

        <div>
          <label>Name:</label>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
          />
        </div>
        
        <div>
          <label>Status:</label> 
          <input
            type="text"
            value={editedStatus}
            onChange={(e) => setEditedStatus(e.target.value)}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditStudent;
