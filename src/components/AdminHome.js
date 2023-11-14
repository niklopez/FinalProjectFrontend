import React, { useState, useEffect } from 'react';
import EditStudent from './EditStudent';
import {SERVER_URL} from '../constants';
const AdminHome = () => {
  const [students, setStudents] = useState([]);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [message, setMessage] = useState('');
  const [editedStudent, setEditedStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);
  /*
   *  GET students that currently exsist
   */ 
  const fetchStudents = () => {

    fetch('http://localhost:8080/student')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        return response.json();
      })
      .then((data) => {
        setStudents(data);
      })
      .catch((err) => {
        console.error('Error fetching students:', err.message);
        setMessage('Failed to fetch students. ' + err.message);
      });
  };
   /*
  *  add student
  */ 

  const handleAddStudent = () => {
    const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailFormat.test(newStudentEmail)) {
      setMessage('Must be a Valid Email');
      return;
    }

    if (students.some((student) => student.email === newStudentEmail)) {
      setMessage('Email Already in Use');
      return;
    }

    const nextStudentId = students.length + 1;

    const newStudent = {
      studentId: nextStudentId,
      name: newStudentName,
      email: newStudentEmail,
      statusCode: 0, 
      status: null, 
    };

    setStudents([...students, newStudent]);

    setNewStudentName('');
    setNewStudentEmail('');

    setMessage('');
  };
  /* 
   *   remove a student
   */ 
  const handleDeleteStudent = (studentId) => {
    const studentIndex = students.findIndex((student) => student.studentId === studentId);
  
    if (studentIndex === -1) {
      // Student not found
      setMessage('Student not found.');
      return;
    }
  
    if (window.confirm('Are you sure you want to delete the student')) {
      fetch(`${SERVER_URL}/student/${studentId}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (res.ok||res.status === 400) {
            console.log('Delete successful');
  
            const updatedStudents = [...students];
            updatedStudents.splice(studentIndex, 1);
  
            setStudents(updatedStudents);
            setMessage('Student deleted.');
          } else {
            // Delete error
            console.log('Delete error:', res.status);
            setMessage('Error deleting student. ' + res.status);
          }
        })
        .catch((err) => {
          // Exception/error during fetch
          console.error('Exception:', err);
          setMessage('Exception. ' + err.message);
        });
    }
  };
  
  
  
  //Utlizes Edit Student
  

  const handleEditStudent = (student) => {
    setEditedStudent(student);
  };

  const handleEditSubmit = (editedStudentData) => {
    const index = students.findIndex((student) => student.studentId === editedStudentData.studentId);

    if (index !== -1) {
      // Create a new array with the edited student data
      const updatedStudents = [...students];
      updatedStudents[index] = editedStudentData;

      // Update the students state with the new array
      setStudents(updatedStudents);
      setMessage('Student Update');

    }

    // You can also close the edit form if needed
    setEditedStudent(null);

  };

  return (
    <div>
      <h3>Student List</h3>
      <ul>
        {students.map((student, index) => (
          <li key={index}>
            {'Student ID: ' + student.studentId + ' '}{'Name: ' + student.name} - {'Email: '+student.email}{' Status ' +student.status}
            <button type="button" onClick={() => handleDeleteStudent(student.studentId)}>
              Delete
            </button>
            <button type="button" onClick={() => handleEditStudent(student)}>
              Edit
            </button>
          </li>
        ))}
      </ul>

      <h3>Add Student</h3>
      <inputc
        type="text"
        placeholder="Student Name"
        value={newStudentName}
        onChange={(e) => setNewStudentName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Student Email"
        value={newStudentEmail}
        onChange={(e) => setNewStudentEmail(e.target.value)}
      />
      <button type="button" onClick={handleAddStudent}>
        Add
      </button>

      {editedStudent && (
  <EditStudent
    student={editedStudent}
    onCancel={() => setEditedStudent(null)}
    onEdit={handleEditSubmit}
    onDelete={handleDeleteStudent}
  />
)}


      {message && <div>{message}</div>}
    </div>
  );
};

export default AdminHome;
