import React, { useState, useEffect } from 'react';
import './AddTaskModal.css'; // Import CSS file for styling
import { auth } from '../../firebase';

function AddTaskModal({ show, handleClose }) {
    const [uid, setUid] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
      } else {
        // User is signed out
        setUid(null);
      }
    });

    // Clean up subscription to avoid memory leaks
    return () => unsubscribe();
  }, []);
    
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    resources: '',
    category: '',
    priority: 'normal'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to backend
    formData.admins = [uid];
    fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        })
        .then(data => {
          console.log('Task created successfully:', data);
          handleClose();
        })
        .catch(error => {
          console.error('Error creating task:', error);
          // Handle error
        });
  };

  return (
    <div className={`modal ${show ? 'show' : ''}`}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Task</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="form-group">
                <label>Deadline</label>
                <input
                  type="date"
                  className="form-control"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Resources</label>
                <input
                  type="text"
                  className="form-control"
                  name="resources"
                  value={formData.resources}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <textarea
                  className="form-control"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="form-group">
  <label>Priority</label>
  <select
    className="form-control"
    name="priority"
    value={formData.priority}
    onChange={handleChange}
  >
    <option value="normal">Normal</option>
    <option value="high">High</option>
  </select>
</div>
              <button type="submit" className="btn btn-primary">Add Task</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTaskModal;
