import React, { Component } from "react";
import ReactMapboxGl, {
  Layer,
  Feature,
  Popup,
  MapContext
} from "react-mapbox-gl";
import mapboxgl from "mapbox-gl";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { LinkContainer } from "react-router-bootstrap";

const MapView = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiYXdlZWQxIiwiYSI6ImNrMGZxa2ZldTAyNHMzb3M4YTZyM3QxNzMifQ.qZtFXEGeC-VE3IwTKHIk_g",
  minZoom: 8,
  maxZoom: 20
});

const defaultCenter = [-75.3499, 39.9021];
const onClickZoomLevel = [18];
const defaultZoomLevel = [11];

const popupStyles = {
  backgroundColor: "white",
  borderRadius: "8px 8px 0px 0px",
  maxWidth: "25em"
};

class Map extends Component {
  constructor() {
    super();
    this.state = {
      map: {
        viewport: {
          center: defaultCenter,
          zoom: defaultZoomLevel,
          fitBounds: undefined
        }
      },
      filter: "",
      viewing: "", // this is the project the user is currently interacting with
      isLoading: false,
      projects: "",
      error: ""
    };
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onViewportChange = this.onViewportChange.bind(this);
    this.projectBtnOnClick = this.projectBtnOnClick.bind(this);
    this.featureOnClick = this.featureOnClick.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch("/api/projects")
      .then(res => res.json())
      .then(results => this.setState({ projects: results.data.projects }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  onFilterChange(e) {
    const { name, value } = e.target;
    const { projects } = this.state;
    const listItems = document.getElementsByClassName("project-list");

    this.setState({
      [name]: value
    });

    value.toLowerCase();
    projects.forEach(
      (project, i) =>
        // compare value to project.name
        project.name.toLowerCase().includes(value) ||
        project.description.toLowerCase().includes(value) ||
        project.type.toLowerCase().includes(value) ||
        project.owner.first.toLowerCase().includes(value) ||
        project.owner.last.toLowerCase().includes(value)
          ? (listItems[i].style.display = "block")
          : (listItems[i].style.display = "none")

      // compare value to project.description
      // compare value to project.category
      // get element with key = i , set show or hide
    );
    // When the filter text is changed, it should filter the list of projects containing
    // only text with whatever the text string is. We will need to figure out what fields
    // on the project itself should allow filtering against.
  }

  onViewportChange() {
    console.log("Changing map view....");
  }

  projectBtnOnClick(project) {
    //Close any existing popups
    const popups = document.getElementsByClassName("popup");
    const l = popups.length;
    for (let i = 0; i < l; i++) {
      console.log(popups[i]);
      popups[i].remove();
    }

    this.setState({
      map: {
        viewport: {
          center: [project.address.lat, project.address.lng],
          zoom: onClickZoomLevel
        }
      },
      viewing: project
    });
  }

  featureOnClick(project, mapbox) {
    // When a feature (the actual marker on the map) is clicked, a pop
    // of the project description should show up, and the map should
    // recenter / zoom to where that feature is located

    // This takes care of the popover

    // This takes care of recentering the map
    this.setState({
      map: {
        viewport: {
          center: mapbox.feature.geometry.coordinates,
          zoom: onClickZoomLevel
        }
      },
      viewing: project
    });
  }

  render() {
    return (
      <div className="row">
        {/* The map filter section */}
        <div className="col-sm-4">
          <h1 className="display-4 mb-4">Civic Engagement Projects</h1>
          <Form.Group>
            <Form.Control
              id="feature-filter"
              type="text"
              placeholder="Search to filter"
              name="filter"
              onChange={this.onFilterChange}
              value={this.state.filter}
            />
          </Form.Group>

          {/* If the projects are loading, display it to the user */}
          {this.state.isLoading && <p className="text-muted">Loading...</p>}

          {/* If there is an error loading the projects, display it to the user */}
          {this.state.error && (
            <p className="text-danger">{this.state.error}</p>
          )}

          {/* If the projects are loaded, display them to the user in a list */}
          {this.state.projects && (
            <ListGroup
              className="mt-3"
              style={{
                maxHeight: "500px",
                marginBottom: "10px",
                overflow: "scroll"
              }}
            >
              {this.state.projects.map((project, i) => (
                <ListGroup.Item key={i} className="project-list">
                  <h3>{project.name}</h3>
                  <p className="font-weight-bold">
                    Managed by {project.owner.first} - {project.owner.email}
                  </p>
                  <p
                    className="text-muted"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipses",
                      maxHeight: "4.5em"
                    }}
                  >
                    {project.description}
                  </p>
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
            zoom={this.state.map.viewport.zoom}
            fitBounds={this.state.map.viewport.fitBounds}
            flyToOptions={{
              speed: 0.8
            }}
          >
            {/* Create symbol layer to store project pins */}
            <Layer
              type="symbol"
              id="marker"
              layout={{
                "icon-image": "castle-15"
              }}
            >
              {/* for each project, generate a feature */}
              {this.state.projects &&
                this.state.projects.map((project, i) => (
                  <Feature
                    key={i}
                    coordinates={[project.address.lat, project.address.lng]}
                    onClick={this.featureOnClick.bind(
                      this,
                      this.state.projects[i]
                    )}
                  />
                ))}
            </Layer>

            {/* Adding city boundries */}
            {/* Need to fnid regional GeoJSON data and create GeoJSONLayer with filled polygons ...? */}
            {/* <Layer
              type="fill"
              id="regions-of-interest"
            >
            </Layer> */}

            {this.state.viewing && (
              // Allow for use of Mapbox-GL-js functionality not covered by react-mapbox-gl package
              // Use popup with close button
              <MapContext.Consumer>
                {map => {
                  var popup = new mapboxgl.Popup({ className: "popup" }) //{ closeOnClick: false }
                    .setLngLat([
                      this.state.viewing.address.lat,
                      this.state.viewing.address.lng
                    ])
                    .setHTML(
                      `<div style="${popupStyles}">
                              <p class="lead">${this.state.viewing.name}</p>
                              <p
                                class="text-muted"
                                style="
                                  overflow: hidden;
                                  text-overflow: ellipsis;
                                  max-height: 3.5rem
                                "
                              >
                                ${this.state.viewing.description}
                              </p>
                              <p>
                                <a href='#/projects/${this.state.viewing._id}' type="button" class="btn btn-info btn-sm btn-block">
                                  See more
                                </a>
                              </p>
                            </div>`
                    )
                    .addTo(map);
                }}
              </MapContext.Consumer>
            )}
          </MapView>
        </div>
      </div>
    );
  }
}

export default Map;
