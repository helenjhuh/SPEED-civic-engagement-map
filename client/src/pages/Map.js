import React, { Component } from "react";
import { connect } from "react-redux";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { actions } from "../store/actions";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

const MapView = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiYXdlZWQxIiwiYSI6ImNrMGZxa2ZldTAyNHMzb3M4YTZyM3QxNzMifQ.qZtFXEGeC-VE3IwTKHIk_g",
  minZoom: 8,
  maxZoom: 15
});

const mapStateToProps = state => ({
  projects: state.project.browsing,
  isLoading: state.project.isLoading,
  error: state.project.error
});

// TODO: Browse projects should eventually accept a payload, that will tell the server
// to limit the amount of projects returned, as well the offset to start at in the databse
const mapDispatchToProps = dispatch => ({
  browse: () => dispatch(actions.project.browse())
});

class Map extends Component {
  constructor() {
    super();
    this.state = {
      map: {
        viewport: {
          center: [-75.3499, 39.9021]
        }
      },
      filter: ""
    };
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onViewportChange = this.onViewportChange.bind(this);
    this.projectBtnOnClick = this.projectBtnOnClick.bind(this);
  }

  componentDidMount() {
    this.props.browse();
  }

  onFilterChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });

    // When the filter text is changed, it should filter the list of projects containing
    // only text with whatever the text string is. We will need to figure out what fields
    // on the project itself should allow filtering against.
  }

  onViewportChange() {
    console.log("Changing map view....");
  }

  projectBtnOnClick(project) {
    console.log({ project });
  }

  render() {
    return (
      <div className="row">
        {/* The map filter section */}
        <div className="col-sm-4">
          <h2>Civic Engagement Projects</h2>
          <input
            id="feature-filter"
            className="mt-3"
            name="filter"
            value={this.state.filter}
            type="text"
            onChange={this.onFilterChange}
          />

          {/* If the projects are loading, display it to the user */}
          {this.props.isLoading && <p className="text-muted">Loading...</p>}

          {/* If there is an error loading the projects, display it to the user */}
          {this.props.error && (
            <p className="text-danger">{this.props.error}</p>
          )}

          {/* If the projects are loaded, display them to the user in a list */}
          {this.props.projects && (
            <ListGroup className="mt-3">
              {this.props.projects.map((project, i) => (
                <ListGroup.Item key={i}>
                  <h3>{project.name}</h3>
                  <p className="font-weight-bold">
                    Managed by {project.owner.first} - {project.owner.email}
                  </p>
                  <p className="text-muted">{project.description}</p>
                  <Button onClick={() => this.projectBtnOnClick(project)}>
                    Click me
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </div>

        {/* The map */}
        <div
          className="col-sm-8"
          style={{
            minHeight: "800px",
            minWidth: "400px"
          }}
        >
          <MapView
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: "100%",
              width: "100%"
            }}
            center={this.state.map.viewport.center}
          >
            {/* for each project, generate a feature */}
            <Layer
              type="symbol"
              id="marker"
              layout={{ "icon-image": "marker-15" }}
            >
              {this.props.projects &&
                this.props.projects.map((project, i) => (
                  <Feature
                    coordinates={[project.address.lat, project.address.lng]}
                  />
                ))}
            </Layer>
          </MapView>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
