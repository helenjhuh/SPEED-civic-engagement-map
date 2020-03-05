import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ConfirmModal from './ConfirmModal'
import Form from 'react-bootstrap/Form'
import Badge from 'react-bootstrap/Badge'

const ProjectsTable = props => {

  const {
    projects,
    handleEditClick,
    handleDeleteClick,
    handleVerifyToggle,
    handleFeaturedToggle
  } = props;

  return (
    <Table>
      <thead>
        <tr>
          <th>Verified</th>
          <th>Featured</th>
          <th>Name</th>
          <th>Description</th>
          <th>Types</th>
          <th>Issues</th>
          <th>Lang Grants</th>
          <th>Community Partners</th>
          <th>Funders</th>
          <th>Beneficiaries</th>
          <th>Website</th>
          <th>Owner</th>
          <th>Address</th>
          <th>Created On</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {projects.map(project => (
          <tr key={project._id}>
            <td>
              <Form.Check
                type="switch"
                id={"form_verified_" + project._id}
                label="Verified"
                checked={project.verified}
                onChange={() => handleVerifyToggle(project)}
              />
            </td>
            <td>
              <Form.Check
                type="switch"
                id={"form_featured_" + project._id}
                label="Featured"
                checked={project.featured}
                onChange={() => handleFeaturedToggle(project)}
              />
            </td>
            <td>{project.name}</td>
            <td>{project.description}</td>
            <td>
              {project.types.map(t => (
                <Badge variant="light" key={t} pill>{t}</Badge>
              ))}
            </td>
            <td>
              {project.issues.map(i => (
                <Badge variant="light" key={i} pill>{i}</Badge>
              ))}
            </td>
            <td>
              {project.langGrants.map(lg => (
                <Badge variant="light" key={lg} pill>{lg}</Badge>
              ))}
            </td>
            <td>
              {project.communityPartners.map(cp => (
                <Badge variant="light" key={cp} pill>{cp}</Badge>
              ))}
            </td>
            <td>
              {project.funders.map(f => (
                <Badge variant="light" key={f} pill>{f}</Badge>
              ))}
            </td>
            <td>{project.beneficiaries}</td>
            <td>{project.website}</td>
            <td>{project.owner.first} {project.owner.last}<br />{project.owner.email}</td>
            <td>{project.address.city} {project.address.region}, {project.address.zip}</td>
            <td>{new Date(project.createdAt).toDateString()}</td>
            <td>
              <FontAwesomeIcon
                icon={faPencilAlt}
                fixedWidth
                className="mr-3 text-warning"
                onClick={() => handleEditClick(project)}
              />
              <FontAwesomeIcon
                icon={faTrashAlt}
                fixedWidth
                className="text-danger"
                onClick={() => handleDeleteClick(project)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

ProjectsTable.propTypes = {
  projects: PropTypes.array.isRequired
};

export default ProjectsTable;
