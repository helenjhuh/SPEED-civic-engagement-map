import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import EditModal from "./editModal";
import useAPI from "../../hooks/useAPI";
import { EDIT_MODAL } from "../../defs";
import ProjectsTable from "./projectsTable";

const ManageProjects = props => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [activeProject, setActiveProject] = useState({});

  const closeModal = () => {
    setActiveProject({});
    setModalType("");
    setShowModal(false);
  };

  const openModal = (type, project) => {
    setActiveProject(project);
    setModalType(type);
    setShowModal(true);
  };

  const updateProject = async (project, payload) => {
    try {
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
    } finally {
    }
  };

  const deleteProject = async project => {
    try {
      const { _id } = project;
      const res = await fetch(`/api/projects/${_id}/delete`, {
        method: "DELETE"
      });
      const json = await res.json();
    } catch (error) {
    } finally {
    }
  };

  const handleEditBtnClick = async project => {
    console.log("woof");
  };

  const handleDeleteBtnClick = async project => {
    console.log("boop");
  };

  const { data, error, loading } = useAPI("/api/projects", null);

  if (!data.projects) {
    data.projects = [];
  }

  return (
    <Container fluid>
      <h1 className="display-4 mb-4">Manage Projects</h1>

      {/* If there's an error, display it to the user */}
      {error && <p className="text-danger">{error}</p>}

      {/* If the content is loading, diplay it to the user  */}
      {loading && <p className="text-muted">loading...</p>}

      {data && (
        <ProjectsTable
          projects={data.projects}
          onEditBtnClick={handleEditBtnClick}
          onDeleteBtnClick={handleDeleteBtnClick}
        />
      )}

      {/* Only show this if the project edit modal is open */}
      <EditModal
        show={showModal && modalType === EDIT_MODAL}
        onHide={closeModal}
        project={activeProject}
        onSubmit={updateProject}
      />

      {/* If there aren't any projects, display a message letting the user know */}
      {data && !data.projects.length && (
        <p className="lead">
          It doesn't look like there are any projects in your system yet
        </p>
      )}
    </Container>
  );
};

export default ManageProjects;
