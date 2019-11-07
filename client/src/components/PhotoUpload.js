import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

// this component presents a form to upload photos to a given project (with the id)

class PhotoUpload extends Component {
  state = {
    photo: null,
    isUploading: false
  };

  onFormChange = e => {
    e.preventDefault();
    this.setState({ photo: e.target.files[0] });
  };

  onFormSubmit = e => {
    e.preventDefault();

    const projectId = this.props.projectId;
    const data = new FormData();
    data.append("photo", this.state.photo);

    this.setState({ isUploading: true });

    fetch(`/api/projects/${projectId}/upload`, {
      method: "POST",
      body: data
    })
      .then(res => res.json())
      .then(res => {
        // handle res
        console.log(res);
      })
      .catch(err => console.error(err))
      .finally(() => this.setState({ isUploading: false }));
  };

  render() {
    return (
      <>
        <Form>
          <Form.Group controlId="formFiles">
            <Form.Label>Upload photo for {this.props.projectId}</Form.Label>
            <Form.Control
              type="file"
              name="photo"
              onChange={this.onFormChange}
            />
          </Form.Group>
          <Button
            variant="primary"
            onClick={this.onFormSubmit}
            disabled={this.state.isUploading || !this.state.photo}
          >
            Submit
          </Button>
        </Form>
      </>
    );
  }
}

PhotoUpload.propTypes = {
  projectId: PropTypes.string.isRequired
};

export default PhotoUpload;
