import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

//TODO: create edit modal component
//TODO: atomize these commonly used arrays
const projectTypes = [
  { value: "Engaged Teaching", label: "Engaged Teaching", name: "type" },
  { value: "Engaged Research", label: "Engaged Research", name: "type" },
  { value: "Engaged Projects", label: "Engaged Projects", name: "type" },
  { value: "Other", label: "Other" }
];
const projectIssues = [
  {
    value: "Arts, Media, and Culture",
    label: "Arts, Media, and Culture",
    name: "issue"
  },
  {
    value: "Economic Development",
    label: "Economic Development",
    name: "issue"
  },
  {
    value: "Education and Access",
    label: "Education and Access",
    name: "issue"
  },
  {
    value: "Environment and Sustainability",
    label: "Environment and Sustainability",
    name: "issue"
  },
  {
    value: "Ethics and Human Rights",
    label: "Ethics and Human Rights",
    name: "issue"
  },
  {
    value: "Identities and Inequality",
    label: "Identities and Inequality",
    name: "issue"
  },
  { value: "Public Health", label: "Public Health", name: "issue" },
  {
    value: "Politics and Public Policy",
    label: "Politics and Public Policy",
    name: "issue"
  },
  {
    value: "Refugees and Immigration",
    label: "Refugees and Immigration",
    name: "issue"
  },
  { value: "Science and Society", label: "Science and Society", name: "issue" }
];

const projectGrants = [
  {
    value: "Chester Community Fellowship",
    label: "Chester Community Fellowship",
    name: "langGrants"
  },
  {
    value: "Lang Opportunity Scholarship",
    label: "Lang Opportunity Scholarship",
    name: "langGrants"
  },
  {
    value: "Project Pericles Fund",
    label: "Project Pericles Fund",
    name: "langGrants"
  },
  {
    value: "Summer Grants ( projects, internships, research )",
    label: "Summer Grants ( projects, internships, research )",
    name: "langGrants"
  },
  { value: "Faculty Award", label: "Faculty Award", name: "langGrants" }
];

class ManageProjects extends Component {
  constructor() {
    super();
    this.state = {
      error: "",
      isLoading: "",
      projects: "",
      editModal: false,
      name: "",
      description: "",
      type: [],
      issue: [],
      langGrants: [],
      communityPartners: [],
      funders: [],
      beneficiaries: "",
      website: ""
    };

    this.getProjects = this.getProjects.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.updateProject = this.updateProject.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.onEditBtnClick = this.onEditBtnClick.bind(this);
    this.onDeleteBtnClick = this.onDeleteBtnClick.bind(this);
    this.onEditFormChange = this.onEditFormChange.bind(this);
    this.onEditFormChangeSelect = this.onEditFormChangeSelect.bind(this);
  }

  componentDidMount() {
    this.getProjects();
  }

  getProjects() {
    // When the component mounts, get the users and set them in the state
    this.setState({ isLoading: true });

    fetch(`/api/projects`)
      .then(res => res.json())
      .then(res => this.setState({ projects: res.data.projects }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  closeEditModal() {
    this.setState({ editModal: false });
  }

  openEditModal(project) {
    this.setState({
      editModal: true,
      projectId: project._id,
      name: project.name,
      description: project.description,
      type: project.type,
      issue: project.issue,
      langGrants: project.langGrants,
      communityPartners: project.communityPartners,
      funders: project.funders,
      beneficiaries: project.beneficiaries,
      website: project.website,
      isVerified: project.isVerified,
      isFeatured: project.isFeatured
    });
  }

  // Send the request to update the project, then fetch the new projects list
  updateProject() {
    console.log(this.state);
    fetch(`/api/projects/${this.state.projectId}/edit`, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.description,
        type: this.state.type,
        issue: this.state.issue,
        langGrants: this.state.langGrants,
        communityPartners: this.state.communityPartners,
        funders: this.state.funders,
        beneficiaries: this.state.beneficiaries,
        website: this.state.website,
        isVerified: this.state.isVerified,
        isFeatured: this.state.isFeatured
      })
    })
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.closeEditModal();
        this.getProjects();
      });
  }

  // Send the request to delete the project, then fetch the new projects list
  deleteProject(project) {
    fetch(`/api/projects/${project.id}/delete`, { method: "DELETE" })
      .then(res => res.json())
      .then(res => {
        // TODO: This isn't refreshing the page on a success response for some reason
        if (res.status === "success") {
          this.setState(this.state);
        } else if (res.status === "failure") {
          this.setState({ error: res.data.message });
        } else if (res.status === "error") {
          this.setState({ error: res.error });
        }
      })
      .finally(() => {
        // fetch the projects again
        this.getProjects();
      });
  }

  onEditBtnClick(project) {
    this.openEditModal(project);
  }

  onDeleteBtnClick(project) {}

  // Set the state based on the edit form
  onEditFormChange(e) {
    const { name, value, checked } = e.target;
    const toggleCheck = name === "isVerified" || name === "isFeatured";

    // If toggling check-box
    toggleCheck && this.setState({ [name]: checked });

    //If editing value
    !toggleCheck && this.setState({ [name]: value });
  }

  onEditFormChangeSelect(array, actionMeta) {
    const valueArray = [];
    array.forEach(item => {
      valueArray.push(item.value);
    });

    this.setState({
      [actionMeta.name]: valueArray
    });

    console.log(this.state);
  }

  render() {
    const { error, isLoading, projects } = this.state;

    return (
      <div className="container-fluid">
        <h1 className="display-4 mb-4">Manage Projects</h1>
        {/* If there's an error, display it to the user */}
        {error && <p className="text-danger">{error}</p>}
        {/* If the content is loading, diplay it to the user  */}
        {isLoading && <p className="text-muted">{isLoading}</p>}
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
                  <td>
                    {project.issue && project.issue.map(i => <li>{i}</li>)}
                  </td>
                  <td>
                    {project.langGrants &&
                      project.type.map(lg => <li>{lg}</li>)}
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
                <Select
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
                />
              </Form.Group>

              <Form.Group controlId="issues">
                <Form.Label>Issues</Form.Label>
                <Select
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
                />
              </Form.Group>

              <Form.Group controlId="projectGrants">
                <Form.Label>Lang Center Grants and Awards</Form.Label>
                <Select
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
                />
              </Form.Group>

              <Form.Group controlId="communityPartners">
                <Form.Label>Community Partners</Form.Label>
                <CreatableSelect
                  isMulti
                  defaultValue={this.state.communityPartners.map(part => ({
                    value: part,
                    label: part
                  }))}
                  name="communityPartners"
                  onChange={this.onEditFormChangeSelect}
                />
              </Form.Group>

              <Form.Group controlId="formFunders">
                <Form.Label>Funders</Form.Label>
                <CreatableSelect
                  isMulti
                  defaultValue={this.state.funders.map(fund => ({
                    value: fund,
                    label: fund
                  }))}
                  name="funders"
                  onChange={this.onEditFormChangeSelect}
                />
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
      </div>
    );
  }
}

export default ManageProjects;
