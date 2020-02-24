import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import feathers, { services } from "../feathers";
import UsersTable from "../components/UsersTable";
import RolesTable from "../components/RolesTable";
import ProjectsTable from "../components/ProjectsTable";
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

  const EDIT_MODAL = "EDIT_MDOAL";
  const DELETE_MODAL = "DELETE_MODAL"; // this is a confirmation modal, ie. are you sure you want to delete this resource

  const openModal = type => {
    if (![EDIT_MODAL, DELETE_MODAL].includes(type)) {
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
      console.log({ data, total, limit, skip });
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
    const { _id } = user;
    console.log(user);
  };

  const handleProjectEditClick = project => {
    const { _id } = project;
  };

  const handleRoleEditClick = role => {
    const { _id } = role;
    console.log(role);
  };

  return (
    <Container className="container-lg">
      <h1 className="mb-4">Manage Site</h1>

      {loading && <p className="text-muted">Getting your data...</p>}
      {error && <p className="text-danger">{error}</p>}

      <Tabs activeKey={tabKey} onSelect={handleTabSelect}>
        <Tab eventKey="users" title="Users">
          <UsersTable users={users} handleEditClick={handleUserEditClick} />
        </Tab>
        <Tab eventKey="projects" title="Projects">
          <ProjectsTable
            projects={projects}
            handleEditClick={handleProjectEditClick}
          />
        </Tab>
        <Tab eventKey="roles" title="Roles">
          <RolesTable roles={roles} handleEditClick={handleRoleEditClick} />
        </Tab>
      </Tabs>

      {/*
        <ConfirmModal 
          show={modalType === DELETE_MODAL && showModal} 
          onHide={closeModals} 
          action={console.log}
          title="Please confirm that you actually want to do this"
          messag="This is a PERMANENT ACTION"
          buttonText="I WANT TO DO THIS"
        />
      */}
    </Container>
  );
};

export default ManagePage;
