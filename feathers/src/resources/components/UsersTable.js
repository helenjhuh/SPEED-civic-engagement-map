import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const UsersTable = props => {
  const { users, handleEditClick, handleDeleteClick } = props;

  return (
    <Table>
      <thead>
        <tr>
          <th>First</th>
          <th>Last</th>
          <th>College</th>
          <th>Email</th>
          <th>Joined On</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user._id}>
            <td>{user.first}</td>
            <td>{user.last}</td>
            <td>{user.college}</td>
            <td>{user.email}</td>
            <td>{new Date(user.createdAt).toDateString()}</td>
            <td>
              <FontAwesomeIcon
                icon={faPencilAlt}
                fixedWidth
                className="mr-3 text-warning"
                onClick={() => handleEditClick(user)}
              />
              <FontAwesomeIcon
                icon={faTrashAlt}
                fixedWidth
                className="text-danger"
                onClick={() => handleDeleteClick(user)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired
};

export default UsersTable;
