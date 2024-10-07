import React from 'react';
import { Link } from 'react-router-dom';

const UsersTable = ({ users, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user.id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>
              <Link to={`/users/${user.id}`}>View</Link>
              <button onClick={() => onEdit(user)}>Edit</button> {/* Call the onEdit handler */}
              <button onClick={() => onDelete(user.id)}>Delete</button> {/* Call the onDelete handler */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
