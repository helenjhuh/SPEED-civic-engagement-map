import React from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const RolesTable = props => {
  const { roles, handleEditClick, handleDeleteClick } = props;

  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Created On</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {roles.map(role => (
          <tr key={role._id}>
            <td>{role.name}</td>
            <td>{role.description}</td>
            <td>{new Date(role.createdAt).toDateString()}</td>
            <td>
              <FontAwesomeIcon
                icon={faPencilAlt}
                fixedWidth
                className="mr-3 text-warning"
                onClick={() => handleEditClick(role)}
              />
              <FontAwesomeIcon
                icon={faTrashAlt}
                fixedWidth
                className="text-danger"
                onClick={() => handleDeleteClick(role)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

RolesTable.propTypes = {
  roles: PropTypes.array.isRequired
};

export default RolesTable;
