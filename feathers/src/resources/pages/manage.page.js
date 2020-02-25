import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { services } from "../feathers";
import UsersTable from "../components/UsersTable";
import RolesTable from "../components/RolesTable";
import ProjectsTable from "../components/ProjectsTable";
import UserEditModal from "../components/UserEditModal";
import ConfirmModal from "../components/ConfirmModal";

const ManagePage = props => {
  const [tabKey, setTabKey] = useState("users");
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalType, setModalType] = useState("");
  const [showModal, setShowModal] = useState("");
  const [modalData, setModalData] = useState({});

  const EDIT_USER_MODAL = "EDIT_USER_MODAL";
  const EDIT_PROJECT_MODAL = "EDIT_PROJECT_MODAL";
  const EDIT_ROLE_MODAL = "EDIT_ROLE_MODAL";
  const DELETE_USER_MODAL = "DELETE_USER_MODAL";
  const DELETE_PROJECT_MODAL = "DELETE_PROJECT_MODAL";
  const DELETE_ROLE_MODAL = "DELETE_ROLE_MODAL";

  const openModal = type => {
    if (
      ![EDIT_USER_MODAL, EDIT_PROJECT_MODAL, EDIT_ROLE_MODAL].includes(type)
    ) {
      throw new TypeError();
    }
    setModalType(type);
    setShowModal(true);
  };

  const closeModals = () => {
    setModalType("");
    setShowModal(false);
  };

  const getUsers = async () => {
    try {
      setLoading(true);
      const { data, total, limit, skip } = await services.users.find();
      setUsers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getProjects = async () => {
    try {
      setLoading(true);
      const { data, total, limit, skip } = await services.projects.find();
      setProjects(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getRoles = async () => {
    try {
      setLoading(true);
      const { data, total, limit, skip } = await services.roles.find();
      setRoles(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id, payload) => {
    try {
      setLoading(true);
      const updatedUser = await services.users.patch(id, payload);
    } catch (error) {
      setError(error.message);
    } finally {
      setModalData({});
      closeModals();
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    try {
      setLoading(true);
      const { _id } = modalData;
      const deletedUser = await services.users.remove(_id);
    } catch (error) {
      setError(error.message);
    } finally {
      setModalData({});
      closeModals();
      setLoading(false);
    }
  };

  const handleTabSelect = key => {
    setTabKey(key);

    switch (key) {
      case "users":
        getUsers();
        break;
      case "roles":
        getRoles();
        break;
      case "projects":
        getProjects();
        break;
      default:
        break;
    }
  };

  const handleUserEditClick = user => {
    setModalType(EDIT_USER_MODAL);
    setModalData(user);
    setShowModal(true);
  };

  const handleUserEditSubmit = user => {
    const { _id, ...rest } = user;
    updateUser(_id, rest);
  };

  const handleProjectEditClick = project => {
    const { _id } = project;
  };

  const handleRoleEditClick = role => {
    const { _id } = role;
  };

  const handleUserDeleteClick = user => {
    setModalType(DELETE_USER_MODAL);
    setModalData(user);
    setShowModal(true);
  };

  const handleProjectDeleteClick = projects => {};
  const handleRoleDeleteClick = role => {};

  return (
    <Container className="container-lg">
      <h1 className="mb-4">Manage Site</h1>

      {loading && <p className="text-muted">Getting your data...</p>}
      {error && <p className="text-danger">{error}</p>}

      <Tabs activeKey={tabKey} onSelect={handleTabSelect}>
        <Tab eventKey="users" title="Users">
          <UsersTable
            users={users}
            handleEditClick={handleUserEditClick}
            handleDeleteClick={handleUserDeleteClick}
          />
        </Tab>
        <Tab eventKey="projects" title="Projects">
          <ProjectsTable
            projects={projects}
            handleEditClick={handleProjectEditClick}
            handleDeleteClick={handleProjectDeleteClick}
          />
        </Tab>
        <Tab eventKey="roles" title="Roles">
          <RolesTable
            roles={roles}
            handleEditClick={handleRoleEditClick}
            handleDeleteClick={handleRoleDeleteClick}
          />
        </Tab>
      </Tabs>

      {/* when the user clicks hte edit icon for a resource, a modal should display with a form to edit that resource*/}
      <UserEditModal
        title="Edit User"
        description="Use this form to update a user"
        show={modalType === EDIT_USER_MODAL && showModal}
        onHide={closeModals}
        user={modalData}
        onSubmit={handleUserEditSubmit}
      />

      <ConfirmModal
        show={modalType === DELETE_USER_MODAL && showModal}
        onHide={closeModals}
        message="This action is permanent. Are you sure you want to proceed?"
        buttonText="Delete User"
        action={deleteUser}
      />
    </Container>
  );
};

export default ManagePage;
