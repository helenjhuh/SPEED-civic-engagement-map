import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

// this component presents a form to upload photos to a given project (with the id)

class PhotoUpload extends Component {
  state = {
    photos: [],
    isUploading: false,
    error: ""
  };

  onFormChange = e => {
    e.preventDefault();
    this.setState({
      photos: e.target.files
    });
  };

  onFormSubmit = e => {
    e.preventDefault();

    const projectId = this.props.projectId;
    const formData = new FormData();

    Array.from(this.state.photos).forEach(file => {
      formData.append("photos", file);
    });

    this.setState({ isUploading: true });

    fetch(`/api/projects/${projectId}/upload`, {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(res => {
        // handle res
        document.location.reload();
      })
      .catch(err => console.error(err))
      .finally(() => this.setState({ isUploading: false }));
  };

  render() {
    return (
      <>
        {this.state.error && (
          <p className="text-danger">{this.state.error.toString()}</p>
        )}
        <Form>
          <Form.Group controlId="formFiles">
            <Form.Label>Upload photo for {this.props.projectId}</Form.Label>
            <Form.Control
              type="file"
              name="photos[]"
              multiple
              onChange={this.onFormChange}
            />
          </Form.Group>
          <Button
            variant="primary"
            onClick={this.onFormSubmit}
            disabled={this.state.isUploading || this.state.photos.length === 0}
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
