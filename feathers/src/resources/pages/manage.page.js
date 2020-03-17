import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import feathers, { services } from '../feathers';
import UsersTable from '../components/UsersTable';
import RolesTable from '../components/RolesTable';
import ProjectsTable from '../components/ProjectsTable';
import UserCreateModal from '../components/UserCreateModal';
import UserEditModal from '../components/UserEditModal';
import RoleEditModal from '../components/RoleEditModal';
import ConfirmModal from '../components/ConfirmModal';
import RoleCreateModal from '../components/RoleCreateModal';
import ProjectCreateModal from '../components/ProjectCreateModal';
import ProjectEditModal from '../components/ProjectEditModal';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faGem } from '@fortawesome/free-solid-svg-icons';
import FeathersConfig from '../../../config/default.json';
import { fakeProject, fakeAddress, fakeUser } from '../migrations';

const ManagePage = () => {
  //
  // Page state
  //
  const [tabKey, setTabKey] = useState('users');
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalType, setModalType] = useState('');
  const [showModal, setShowModal] = useState('');
  const [modalData, setModalData] = useState({});

  //
  // Modal Types
  //
  const CREATE_USER_MODAL = 'CREATE_USER_MODAL';
  const CREATE_ROLE_MODAL = 'CREATE_ROLE_MODAL';
  const CREATE_PROJECT_MODAL = 'CREATE_PROJECT_MODAL';
  const EDIT_USER_MODAL = 'EDIT_USER_MODAL';
  const EDIT_PROJECT_MODAL = 'EDIT_PROJECT_MODAL';
  const EDIT_ROLE_MODAL = 'EDIT_ROLE_MODAL';
  const DELETE_USER_MODAL = 'DELETE_USER_MODAL';
  const DELETE_PROJECT_MODAL = 'DELETE_PROJECT_MODAL';
  const DELETE_ROLE_MODAL = 'DELETE_ROLE_MODAL';

  const closeModals = () => {
    setModalType('');
    setShowModal(false);
  };

  const handleTabSelect = key => {
    setTabKey(key);
    switch (key) {
      case 'users':
        getUsers();
        break;
      case 'roles':
        getRoles();
        break;
      case 'projects':
        getProjects();
        break;
      default:
        break;
    }
  };

  //
  // API Functions
  //

  //
  // User actions
  //
  const createUser = async payload => {
    try {
      setLoading(true);
      await services.users.create(payload);
    } catch (error) {
      setError(error.message);
    } finally {
      setModalData({});
      closeModals();
      setLoading(false);
    }
  };

  const getUsers = async () => {
    try {
      setLoading(true);
      const { data } = await services.users.find({ query: { $populate: "roles" } });
      setUsers(data);
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
  
  const handleGenerateUsersClick = async count => {
    try {
      setLoading(true);
      await feathers.get('authentication');
      for (let i=0; i<count; i++) {
        const userPayload = fakeUser();
        await services.users.create(userPayload);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  //
  // Role actions
  //
  const createRole = async payload => {
    try {
      setLoading(true);
      const createdRole = await services.roles.create(payload);
    } catch (error) {
      setError(error.message);
    } finally {
      setModalData({});
      closeModals();
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

  const updateRole = async (id, payload) => {
    try {
      setLoading(true);
      const updatedRole = await services.roles.patch(id, payload);
    } catch (error) {
      setError(error.message);
    } finally {
      setModalData({});
      closeModals();
      setLoading(false);
    }
  };

  const deleteRole = async () => {
    try {
      setLoading(true);
      const { _id } = modalData;
      const deletedRole = await services.roles.remove(_id);
    } catch (error) {
      setError(error.message);
    } finally {
      setModalData({});
      closeModals();
      setLoading(false);
    }
  };

  //
  // Project actions
  //
  const createProject = async project => {
    try {
      setLoading(true);
      const { user } = await feathers.get('authentication');

      // destructure this, it looks messy, but makes contructing the 
      // needed requests easier, since the project var is used in the
      // creation of different resources
      const {
        name,
        description,
        types,
        issues,
        langGrants,
        communityPartners,
        funders,
        beneficiaries,
        website,
        street1,
        street2,
        city,
        region,
        zip,
        country } = project

      // first we need to geocode the address
      const opts = {
        query: {
          query: `${street1} ${street2} ${city} ${region} ${zip}`,
          limit: 5
        }
      };

      const [result] = await services.mapbox.find(opts);
      const [lat, lng] = result.center

      // we need to create an address record for the project
      const addressPayload = {
        street1, street2, city, region, zip, country, lat, lng
      }
      const { _id: addressId } = await services.addresses.create(addressPayload)
      const projectPayload = {
        verified: false,
        featured: false,
        name,
        description,
        types,
        issues,
        langGrants,
        communityPartners,
        funders,
        beneficiaries,
        website,
        owner: user._id,
        address: addressId
      }
      const createdProject = await services.projects.create(projectPayload);
    } catch (error) {
      setError(error.message);
    } finally {
      setModalData({});
      closeModals();
      setLoading(false);
      getProjects();
    }
  };

  const getProjects = async () => {
    try {
      setLoading(true);
      const { data, total, limit, skip } = await services.projects.find({
        query: {
          $populate: ["address", "owner"]
        }
      });
      setProjects(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (id, payload) => {
    try {
      setLoading(true);
      const updateProject = await services.projects.patch(id, payload);
    } catch (error) {
      setError(error.message);
    } finally {
      setModalData({});
      closeModals();
      setLoading(false);
    }
  };

  const deleteProject = async () => {
    try {
      setLoading(true);
      const { _id } = modalData;
      const deletedProject = await services.projects.remove(_id);
    } catch (error) {
      setError(error.message);
    } finally {
      setModalData({});
      closeModals();
      setLoading(false);
      getProjects();
    }
  };

  const handleGenerateProjectsClick = async count => {
    try {
      setLoading(true);
      const { user } = await feathers.get('authentication');
      for (let i=0; i<count; i++) {
        const addressPayload = fakeAddress();
        const {_id:addressId} = await services.addresses.create(addressPayload); 
        const payload = fakeProject(user._id, addressId);
        await services.projects.create(payload);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleProjectVerifyToggle = async project => {
    try {
      setLoading(true)
      const { _id, verified } = project
      const payload = { verified: !verified }
      const res = await services.projects.patch(_id, payload)
      getProjects()
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false)
    }
  }

  const handleProjectFeaturedToggle = async project => {
    const { _id, featured } = project
    try {
      setLoading(true)
      const { _id, verified } = project
      const payload = { featured: !featured }
      const res = await services.projects.patch(_id, payload)
      getProjects()
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false)
    }

  }

  //
  // User handler functions
  //

  const handleUserCreateSubmit = user => {
    createUser(user);
  };

  const handleUserCreateClick = () => {
    setModalType(CREATE_USER_MODAL);
    const initialState = {
      first: '',
      last: '',
      email: '',
      password: '',
      password2: '',
      college: '',
      permissions: []
    };
    setModalData(initialState);
    setShowModal(true);
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

  const handleUserDeleteClick = user => {
    setModalType(DELETE_USER_MODAL);
    setModalData(user);
    setShowModal(true);
  };

  //
  // Role handler functions
  //
  const handleRoleCreateClick = () => {
    setModalType(CREATE_ROLE_MODAL);
    // @note: The role parameter maps to formik's intial values
    const initialState = {
      name: '',
      description: ''
    };
    setModalData(initialState);
    setShowModal(true);
  };
  const handleRoleCreateSubmit = role => {
    createRole(role);
  };
  const handleRoleEditClick = role => {
    setModalType(EDIT_ROLE_MODAL);
    setModalData(role);
    setShowModal(true);
  };
  const handleRoleEditSubmit = role => {
    const { _id, ...rest } = role;
    updateRole(_id, rest);
  };
  const handleRoleDeleteClick = role => {
    setModalType(DELETE_ROLE_MODAL);
    setModalData(role);
    setShowModal(true);
  };

  //
  // Project handler functions
  //
  const handleProjectCreateClick = () => {
    setModalType(CREATE_PROJECT_MODAL);
    // @note: The role parameter maps to formik's intial values
    const initialState = {
      name: '',
      description: '',
      website: '',
      street1: '',
      street2: '',
      city: '',
      region: '',
      zip: '',
      country: ''
    };
    setModalData(initialState);
    setShowModal(true);
  };

  const handleProjectCreateSubmit = project => {
    // Send request to API
    // API should have a hook to geolocate address and add lat/lng
    // Before posting it to the database
    createProject(project);
  };

  const handleProjectEditClick = project => {
    setModalType(EDIT_PROJECT_MODAL);
    setModalData(project);
    setShowModal(true);
  };

  const handleProjectEditSubmit = project => {
    console.log({ project });
  };

  const handleProjectDeleteClick = project => {
    setModalType(DELETE_PROJECT_MODAL);
    setModalData(project);
    setShowModal(true);
  };

  //
  // Render
  //
  return (
    <Container fluid className="px-5">
      <h1 className="mb-4">Manage Site</h1>

      {loading && <p className="text-muted">Getting your data...</p>}
      {error && <p className="text-danger">{error}</p>}

      <Tabs activeKey={tabKey} onSelect={handleTabSelect}>
        <Tab eventKey="users" title="Users">
          <div className="float-right">
            {FeathersConfig.development && <Button className="my-3 mr-2" onClick={() => handleGenerateUsersClick(10)} variant="secondary"><FontAwesomeIcon icon={faGem} className="mr-2"/>Generate Users</Button>} 
            <Button
              className="my-3 float-right"
              onClick={handleUserCreateClick}
              variant="success"
            >
              <FontAwesomeIcon icon={faPlusCircle} fixedWidth className="mr-2" />
              New User
            </Button>
          </div>
          <UsersTable
            users={users}
            handleEditClick={handleUserEditClick}
            handleDeleteClick={handleUserDeleteClick}
            handleGenerateClick={handleGenerateUsersClick}
          />
        </Tab>
        <Tab eventKey="projects" title="Projects">
          <div className="float-right">
            {FeathersConfig.development && <Button className="my-3 mr-2" onClick={() => handleGenerateProjectsClick(10)} variant="secondary"><FontAwesomeIcon icon={faGem} className="mr-2"/>Generate Projects</Button>} 
            <Button
              className="my-3 float-right"
              onClick={handleProjectCreateClick}
              variant="success"
            >
              <FontAwesomeIcon icon={faPlusCircle} fixedWidth className="mr-2" />
              New Project
            </Button>
          </div>
          <ProjectsTable
            projects={projects}
            handleEditClick={handleProjectEditClick}
            handleDeleteClick={handleProjectDeleteClick}
            handleVerifyToggle={handleProjectVerifyToggle}
            handleFeaturedToggle={handleProjectFeaturedToggle}
            handleGenerateClick={handleGenerateProjectsClick}
          />
        </Tab>
        <Tab eventKey="roles" title="Roles">
          <Button
            className="my-3 float-right"
            onClick={handleRoleCreateClick}
            variant="success"
          >
            <FontAwesomeIcon icon={faPlusCircle} fixedWidth className="mr-2" />
            New Role
          </Button>
          <RolesTable
            roles={roles}
            handleEditClick={handleRoleEditClick}
            handleDeleteClick={handleRoleDeleteClick}
          />
        </Tab>
      </Tabs>

      {/* keep all modals here, or in a seperate file */}
      <UserCreateModal
        show={modalType === CREATE_USER_MODAL && showModal}
        onHide={closeModals}
        user={modalData}
        onSubmit={handleUserCreateSubmit}
      />

      <UserEditModal
        title="Edit User"
        description="Use this form to update a user"
        show={modalType === EDIT_USER_MODAL && showModal}
        onHide={closeModals}
        user={modalData}
        onSubmit={handleUserEditSubmit}
      />

      <RoleCreateModal
        show={modalType === CREATE_ROLE_MODAL && showModal}
        onHide={closeModals}
        role={modalData}
        onSubmit={handleRoleCreateSubmit}
      />

      <RoleEditModal
        title="Edit Role"
        description="Use this form to update a role"
        show={modalType === EDIT_ROLE_MODAL && showModal}
        onHide={closeModals}
        role={modalData}
        onSubmit={handleRoleEditSubmit}
      />

      <ProjectCreateModal
        show={modalType === CREATE_PROJECT_MODAL && showModal}
        onHide={closeModals}
        project={modalData}
        onSubmit={handleProjectCreateSubmit}
      />

      <ProjectEditModal
        show={modalType === EDIT_PROJECT_MODAL && showModal}
        title="Edit Project"
        description="Use this form to update a project"
        onHide={closeModals}
        project={modalData}
        onSubmit={handleProjectEditSubmit}
      />

      <ConfirmModal
        show={modalType === DELETE_USER_MODAL && showModal}
        onHide={closeModals}
        message="This action is permanent. Are you sure you want to proceed?"
        buttonText="Delete User"
        action={deleteUser}
      />

      <ConfirmModal
        show={modalType === DELETE_ROLE_MODAL && showModal}
        onHide={closeModals}
        message="This action is permanent. Are you sure you want to proceed?"
        buttonText="Delete Role"
        action={deleteRole}
      />

      <ConfirmModal
        show={modalType === DELETE_PROJECT_MODAL && showModal}
        onHide={closeModals}
        message="This action is permanent. Are you sure you want to proceed?"
        buttonText="Delete Project"
        action={deleteProject}
      />
    </Container>
  );
};

export default ManagePage;
