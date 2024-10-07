import React from 'react';

const UserDetail = ({ user }) => {
  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Street:</strong> {user.address.street}</p>
      <p><strong>City:</strong> {user.address.city}</p>
      <p><strong>Company:</strong> {user.company.name}</p>
      <p><strong>Website:</strong> {user.website}</p>
    </div>
  );
};

export default UserDetail;
