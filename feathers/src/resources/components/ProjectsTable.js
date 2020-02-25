import React from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const ProjectsTable = props => {
  const { projects, handleEditClick, handleDeleteClick } = props;

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
            <td>{project.verified && "x"}</td>
            <td>{project.featured && "x"}</td>
            <td>{project.name}</td>
            <td>{project.description}</td>
            <td>
              {project.types.map(t => (
                <p key={t}>{t}</p>
              ))}
            </td>
            <td>
              {project.issues.map(i => (
                <p key={i}>{i}</p>
              ))}
            </td>
            <td>
              {project.langGrants.map(lg => (
                <p key={lg}>{lg}</p>
              ))}
            </td>
            <td>
              {project.communityPartners.map(cp => (
                <p key={cp}>{cp}</p>
              ))}
            </td>
            <td>
              {project.funders.map(f => (
                <p key={f}>{f}</p>
              ))}
            </td>
            <td>{project.beneficiaries}</td>
            <td>{project.website}</td>
            <td>{project.owner}</td>
            <td>{project.address}</td>
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
                onCLick={() => handleDeleteClick(project)}
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
