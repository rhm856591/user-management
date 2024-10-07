import React from 'react';

const ConfirmDelete = ({ onDelete, onCancel }) => {
  return (
    <div>
      <h3>Are you sure you want to delete this user?</h3>
      <button onClick={onDelete}>Yes</button>
      <button onClick={onCancel}>No</button>
    </div>
  );
};

export default ConfirmDelete;

