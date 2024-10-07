import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UsersTable from '../components/UsersTable';
import Modal from '../components/Modal';
import UserForm from '../components/UserForm';
import ConfirmDelete from '../components/ConfirmDelete';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null); // For delete confirmation modal

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleAddUser = (newUser) => {
    axios.post('https://jsonplaceholder.typicode.com/users', newUser)
      .then((response) => setUsers([...users, response.data]))
      .catch((error) => console.error("Error creating user:", error));
  };

  const handleEditUser = (updatedUser) => {
    axios.put(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, updatedUser)
      .then((response) => {
        setUsers(users.map(user => user.id === updatedUser.id ? response.data : user));
        setIsModalOpen(false);  // Close modal after editing
        setEditingUser(null);   // Reset editing state
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  const handleDeleteUser = (userId) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== userId));
        setUserToDelete(null);  // Close the confirmation modal after deleting
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  const handleEditButtonClick = (user) => {
    setEditingUser(user);      // Set the user to be edited
    setIsModalOpen(true);      // Open modal
  };

  const handleDeleteButtonClick = (userId) => {
    setUserToDelete(userId);   // Show the confirmation modal for this user
  };

  const handleCancelDelete = () => {
    setUserToDelete(null);     // Close the confirmation modal
  };

  return (
    <div>
      <h1>User Management</h1>
      <button onClick={() => setIsModalOpen(true)}>Add User</button>
      <UsersTable 
        users={users} 
        onEdit={handleEditButtonClick}  // Pass edit handler
        onDelete={handleDeleteButtonClick}  // Pass delete handler
      />
      
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <UserForm 
            user={editingUser} 
            onSave={(user) => {
              if (editingUser) handleEditUser(user);  // If editing, update the user
              else handleAddUser(user);               // If adding new, create the user
            }} 
          />
        </Modal>
      )}

      {userToDelete && (
        <Modal onClose={handleCancelDelete}>
          <ConfirmDelete 
            onDelete={() => handleDeleteUser(userToDelete)}  // Pass the correct userId to delete
            onCancel={handleCancelDelete}
          />
        </Modal>
      )}
    </div>
  );
};

export default HomePage;
