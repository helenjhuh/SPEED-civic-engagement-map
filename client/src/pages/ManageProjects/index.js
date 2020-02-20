import React, { Component, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import {
  projectTypes,
  projectIssues,
  projectGrants
} from "../../selectOptions";

const EDIT_MODAL = "EDIT_MODAL";
const DELETE_MODAL = "DELETE_MODAL";

const ManageProjects = props => {
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const getProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      const json = await res.json();
      setProjects(json);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalType("");
    setShowModal(false);
  };

  const openEditModal = (type, project) => {
    setModalType(EDIT_MODAL);
    setShowModal(true);
  };

  const updateProject = async (project, payload) => {
    try {
      setLoading(true);
      const { _id } = project;
      const opts = {
        method: "PUT",
        headers: {
          "content-type": "application/json"
        }
      };
      const res = await fetch(`/api/projects/${_id}/edit`, opts);
      const json = await res.json();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async project => {
    try {
      setLoading(true);
      const { _id } = project;
      const res = await fetch(`/api/projects/${_id}/delete`, {
        method: "DELETE"
      });
      const json = await res.json();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1 className="display-4 mb-4">Manage Projects</h1>
      {/* If there's an error, display it to the user */}
      {error && <p className="text-danger">{error}</p>}
      {/* If the content is loading, diplay it to the user  */}
      {loading && <p className="text-muted">loading...</p>}
      {/* If the projects are loaded, display them */}
      {projects && projects.length > 0 && (
        <Table striped className="table table-bordered">
          <thead>
            <tr>
              <th>Verified</th>
              <th>Featured</th>
              <th>Name</th>
              <th>Description</th>
              <th>Type(s)</th>
              <th>Issue(s)</th>
              <th>Lang Grants</th>
              <th>Community Partners</th>
              <th>Funders</th>
              <th>Beneficiaries</th>
              <th>URL</th>
              <th>Location</th>
              <th>Manager</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project, i) => (
              <tr key={`project-${i}`}>
                <td>{project.isVerified ? "x" : " "}</td>
                <td>{project.isFeatured ? "x" : " "}</td>
                <td>{project.name}</td>
                <td>
                  <div
                    style={{
                      height: "9em",
                      overflow: "auto"
                    }}
                  >
                    {project.description}
                  </div>
                </td>
                <td>{project.type && project.type.map(t => <li>{t}</li>)}</td>
                <td>{project.issue && project.issue.map(i => <li>{i}</li>)}</td>
                <td>
                  {project.langGrants && project.type.map(lg => <li>{lg}</li>)}
                </td>
                <td>
                  {project.communityPartners &&
                    project.communityPartners.map(cp => <li>{cp}</li>)}
                </td>
                <td>
                  {project.funders && project.funders.map(f => <li>{f}</li>)}
                </td>
                <td>{project.beneficiaries}</td>
                <td>{project.website}</td>
                <td>
                  {project.address.city || ""} {project.address.region || ""}
                </td>
                <td>{project.owner.email}</td>
                <td>
                  <Button
                    size="sm"
                    variant="text"
                    onClick={() => this.onEditBtnClick(project)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="text"
                    onClick={() => this.onDeleteBtnClick(project)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Only show this if the project edit modal is open */}
      <Modal show={this.state.editModal} onHide={this.closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editing project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name">
              <Form.Control
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.onEditFormChange}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Control
                type="text"
                name="description"
                value={this.state.description}
                onChange={this.onEditFormChange}
              />
            </Form.Group>

            <Form.Group controlId="type">
              <Form.Label>Type</Form.Label>
              {/*                 <Select
                  isMulti
                  name="type"
                  defaultValue={this.state.type.map(type => ({
                    value: type,
                    label: type
                  }))}
                  options={projectTypes}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={this.onEditFormChangeSelect}
                /> */}
            </Form.Group>

            <Form.Group controlId="issues">
              <Form.Label>Issues</Form.Label>
              {/*                 <Select
                  isMulti
                  name="issue"
                  defaultValue={this.state.issue.map(issue => ({
                    value: issue,
                    label: issue
                  }))}
                  options={projectIssues}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={this.onEditFormChangeSelect}
                /> */}
            </Form.Group>

            <Form.Group controlId="projectGrants">
              <Form.Label>Lang Center Grants and Awards</Form.Label>
              {/*                 <Select
                  isMulti
                  name="langGrants"
                  defaultValue={this.state.langGrants.map(grant => ({
                    value: grant,
                    label: grant
                  }))}
                  options={projectGrants}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={this.onEditFormChangeSelect}
                /> */}
            </Form.Group>

            <Form.Group controlId="communityPartners">
              <Form.Label>Community Partners</Form.Label>
              {/*                 <CreatableSelect
                  isMulti
                  defaultValue={this.state.communityPartners.map(part => ({
                    value: part,
                    label: part
                  }))}
                  name="communityPartners"
                  onChange={this.onEditFormChangeSelect}
                /> */}
            </Form.Group>

            <Form.Group controlId="formFunders">
              <Form.Label>Funders</Form.Label>
              {/*                 <CreatableSelect
                  isMulti
                  defaultValue={this.state.funders.map(fund => ({
                    value: fund,
                    label: fund
                  }))}
                  name="funders"
                  onChange={this.onEditFormChangeSelect}
                /> */}
            </Form.Group>

            <Form.Group controlId="beneficiaries">
              <Form.Label> Beneficiaries </Form.Label>
              <Form.Control
                type="text"
                name="beneficiaries"
                value={this.state.beneficiaries}
                onChange={this.onEditFormChange}
              />
            </Form.Group>

            <Form.Group controlId="website">
              <Form.Control
                type="text"
                name="website"
                value={this.state.website}
                onChange={this.onEditFormChange}
              />
            </Form.Group>

            <Form.Group controlId="verify">
              <Form.Check
                name="isVerified"
                type="checkbox"
                label="Verify Project"
                defaultChecked={this.state.isVerified}
                onChange={this.onEditFormChange}
              />
            </Form.Group>

            <Form.Group controlId="feature">
              <Form.Check
                name="isFeatured"
                type="checkbox"
                label="Feature Project"
                defaultChecked={this.state.isFeatured}
                onChange={this.onEditFormChange}
              />
            </Form.Group>

            <Button className="mt-3" onClick={() => this.updateProject()}>
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* If there aren't any projects, display a message letting the user know */}
      {projects && !projects.length && (
        <p className="lead">
          It doesn't look like there are any projects in your system yet
        </p>
      )}
    </Container>
  );
};

export default ManageProjects;
