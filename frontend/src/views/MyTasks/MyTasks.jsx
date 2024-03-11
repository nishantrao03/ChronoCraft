// MyTasks.jsx

import React, { useState, useEffect } from 'react';
import TaskBox from '../../components/TaskBox/TaskBox';
import MyNav from '../../components/Navbar/MyNav';
import AddTask from '../../components/AddTask/AddTask';
import './MyTasks.css';
import AddTaskModal from '../../components/AddTaskModal/AddTaskModal';
import { auth } from '../../firebase';

function MyTasks() {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserID(user.uid);
  
        // Fetch tasks after setting the user ID
        fetch(`http://localhost:5000/api/tasks/${user.uid}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to fetch tasks');
            }
            return response.json();
          })
          .then(data => {
            setTasks(data);
            console.log(data); // Log the fetched data
          })
          .catch(error => {
            console.error('Error fetching tasks:', error);
          });
      } else {
        // User is signed out
        setUserID(null);
      }
    });
  
    // Clean up subscription to avoid memory leaks
    return () => unsubscribe();
  }, []);

  const handleDeleteTask = (taskID) => {
    fetch(`http://localhost:5000/api/tasks/${taskID}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          console.log(response);
          throw new Error('Failed to delete task');
        }
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <MyNav />
      {tasks.map(task => (
        <TaskBox key={task.taskID} task={task} onDeleteTask={(taskID) => handleDeleteTask(taskID)} />
      ))}
      <div className='add-task'>
        <AddTask handleShowModal={handleShowModal} />
      </div>
      <AddTaskModal show={showModal} handleClose={handleCloseModal}  />
    </div>
  )
}

export default MyTasks;
