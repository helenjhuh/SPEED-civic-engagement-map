import React, { Component } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { actions } from "../../store/actions";

const mapStateToProps = state => ({
  isLoading: state.pin.isLoading,
  error: state.pin.error,
  added: state.pin.added
});

const mapDispatchToProps = dispatch => ({
  add: payload => dispatch(actions.pin.add(payload))
});

class AddPinToProjectForm extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      error: "",
      results: ""
    };
    this.onFormChange = this.onFormChange.bind(this);
    this.geocode = this.geocode.bind(this);
  }

  onFormChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  // make a request to the backend, which will in tern return geocode
  // information from the search string
  // make sure to debounce this..
  geocode(place) {
    if (place.length > 1) {
      fetch(`/api/mapbox/geocode/${place}`)
        .then(res => res.json())
        .then(res => {
          const { results } = res.data;
          this.setState({ results });
        })
        .catch(error => {
          this.setState({ error });
        });
    }
  }

  // This function dispatches the action to create the pin for the given
  // project
  addPin() {
    // contruct the payload
    const { features } = this.state.results;

    const payload = {
      lat: features[0].center[0],
      lng: features[0].center[1]
    };

    this.props.add(payload);
  }

  render() {
    return (
      <>
        {/* If there's an error, display it to the user */}
        {this.state.error && <p>{this.state.error}</p>}

        {/* If there's an added pin, display it to the user (for testing) */}
        {this.state.added && <p>{this.state.added}</p>}

        <Form>
          <Form.Group controlId="formProjectName">
            <Form.Label>Search for a location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Try typing... Philadelphia, PA"
              name="name"
              onChange={this.onFormChange}
              value={this.state.search}
            />
          </Form.Group>

          <Button onClick={props.onClick}>{props.buttonLabel}</Button>
        </Form>
      </>
    );
  }
}

AddPinToProjectForm.propTypes = {
  onClick: PropTypes.func,
  buttonLabel: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPinToProjectForm);
