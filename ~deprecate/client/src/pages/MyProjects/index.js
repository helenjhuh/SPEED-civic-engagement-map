import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const mapStateToProps = state => ({
  loggedInAs: state.auth.loggedInAs
});

const MyProjects = props => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);

  const submitPin = async () => {
    try {
      setLoading(true);
      const projectId = "some_id";
      const headers = { "Content-Type": "application/json" };
      const res = await fetch(
        `/api/pins/add-with-address-to-project?id=${projectId}`
      );
      const json = await res.json();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const removeProject = async id => {
    const opts = { method: "DELETE" };
    const res = await fetch(`/api/projects/${id}/delete`, opts);
    const json = await res.json();
  };

  const showCreateModal = () => {
    setModalType("Create");
    setShowModal(true);
  };

  const showPhotoModal = () => {
    setModalType("Photo");
    setShowModal(true);
  };

  const closeModals = () => {
    setModalType("");
    setShowModal(false);
  };

  const getUserProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/projects/by-user/${this.props.loggedInAs._id}`
      );
      const { data } = await res.json();
      setProjects(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const geocode = async () => {
    try {
      setLoading(true);
      const payload = {};
      const res = await fetch(`/api/mapbox/geocode/${payload}`);
      const json = await res.json();
      // res.data.results.features
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1>test page</h1>
    </Container>
  );
};

export default MyProjects;
