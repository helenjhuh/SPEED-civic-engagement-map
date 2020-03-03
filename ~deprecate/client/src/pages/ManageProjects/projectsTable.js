import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";

const ProjectsTable = props => {
  const { projects, onEditBtnClick, onDeleteBtnClick } = props;

  return (
    <Table>
      <thead>
        <tr>
          {[
            "Verified",
            "Featured",
            "Name",
            "Decsription",
            "Type(s)",
            "Issue(s)",
            "Lang Grants",
            "Community Partners",
            "Funders",
            "Beneficiaries",
            "URL",
            "Location",
            "Manager",
            "Actions"
          ].map(header => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {projects.map(project => {
          const {
            _id,
            isVerified,
            isFeatured,
            name,
            description,
            type = [],
            issues = [],
            langGrants = [],
            communityPartners = [],
            funders,
            beneficiaries,
            website,
            address,
            owner
          } = project;

          return (
            <tr key={_id}>
              <td>{isVerified ? "Yes" : "No"}</td>
              <td>{isFeatured ? "Yes" : "No"}</td>
              <td>{name}</td>
              <td>{description}</td>
              <td>
                {type.map(t => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </td>
              <td>
                {issues.map(issue => (
                  <Badge key={issue}>{issue}</Badge>
                ))}
              </td>
              <td>
                {langGrants.map(grant => (
                  <Badge key={grant}>{grant}</Badge>
                ))}
              </td>
              <td>
                {communityPartners.map(partner => (
                  <Badge key={partner}>{partner}</Badge>
                ))}
              </td>
              <td>{funders}</td>
              <td>{beneficiaries}</td>
              <td>{website}</td>
              <td>
                {address.city}, {address.region}
              </td>
              <td>{owner.email}</td>

              <td>
                <Button
                  size="sm"
                  variant="text"
                  onClick={() => onEditBtnClick(project)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="text"
                  onClick={() => onDeleteBtnClick(project)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

ProjectsTable.propTypes = {
  projects: PropTypes.array.isRequired,
  onEditBtnClick: PropTypes.func.isRequired,
  onDeleteBtnClick: PropTypes.func.isRequired
};

export default ProjectsTable;
