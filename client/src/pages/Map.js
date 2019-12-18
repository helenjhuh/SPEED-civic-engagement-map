import React, { Component } from "react";
import ReactMapboxGl, {
  Layer,
  Feature,
  Popup,
  Image,
  MapContext
} from "react-mapbox-gl";
import mapboxgl from "mapbox-gl";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import "../styles/app.css";
// import turf from "@turf/bbox";

/**
 * @desc Transforms an array of strings into an array of objects
 * where in each object contains the string and the number of
 * occurances
 * @param [String] arr
 * @returns [{ city: String, count: Number }]
 **/
function count(arr) {
  const output = [];
  arr.forEach(city => {
    const count = arr.filter(c => c === city).length;
    // check that the city doesn't exist already
    const exists = output.filter(c => c.city === city).length > 0;
    if (!exists) {
      output.push({ city, count });
    }
  });
  return output;
}

/**
 * @desc Returns a random item from an array
 * @param [any] arr
 * @returns any
 **/
function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

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
  borderRadius: "8px 8px 8px 8px",
  width: "25em"
};

// Import bbox to enable map zooming to common areas
var bbox = require("@turf/bbox");
const commonAreaData = require("../CommonAreas.json");

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
    this.filterOnClick = this.filterOnClick.bind(this);
    this.getProjects = this.getProjects.bind(this);
    this.resetOnClick = this.resetOnClick.bind(this);
    this.closePopups = this.closePopups.bind(this);
  }

  componentDidMount() {
    this.getProjects();
  }

  getProjects() {
    console.log(this.state);
    this.setState({ isLoading: true });
    fetch("/api/projects")
      .then(res => res.json())
      .then(results => {
        this.setState({ projects: results.data.projects });
        this.getCities(results.data.projects);
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  getCities(projects) {
    const cities = projects.map(project => project.address.city);
    const cityFilters = count(cities);
    // sort the city filters (desc)
    const sorted = cityFilters.sort((a, b) => (a.count < b.count ? 1 : -1));
    this.setState({ cityFilters: sorted });
  }

  onFilterChange(e) {
    var { name, value } = e.target;
    value = value.toLowerCase();
    const { projects } = this.state;
    const listItems = document.getElementsByClassName("project-list");

    this.setState({
      [name]: value
    });

    var typeHas = [];
    var issueHas = [];

    projects.forEach((project, i) => {
      project.type.forEach(t =>
        t.toLowerCase().includes(value) ? (typeHas[i] = true) : null
      );
      project.issue.forEach(issue =>
        issue.toLowerCase().includes(value) ? (issueHas[i] = true) : null
      );
    });

    projects.forEach((project, i) => {
      // compare value to project.name
      project.name.toLowerCase().includes(value) ||
      project.description.toLowerCase().includes(value) ||
      // project.type.toLowerCase().includes(value) ||
      typeHas[i] ||
      issueHas[i] ||
      project.owner.first.toLowerCase().includes(value) ||
      project.owner.last.toLowerCase().includes(value)
        ? (listItems[i].style.display = "block")
        : (listItems[i].style.display = "none");
      // compare value to project.description
      // compare value to project.category
      // get element with key = i , set show or hide
    });

    // When the filter text is changed, it should filter the list of projects containing
    // only text with whatever the text string is. We will need to figure out what fields
    // on the project itself should allow filtering against.
  }

  onViewportChange() {
    console.log("Changing map view....");
  }

  projectBtnOnClick(project) {
    this.closePopups();
    this.setState({
      map: {
        viewport: {
          center: [project.address.lat, project.address.lng],
          zoom: onClickZoomLevel,
          fitBounds: undefined
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

  /**
   * @desc Filters the projects list to include only projects
   * containing the clicked city
   * @param { city: String, count: Number } filter
   */
  filterOnClick(filter) {
    // First we need to get a fresh list of projects

    //first search for a common area bound
    const bound = commonAreaData.features
      .map(
        feature =>
          filter.city.toUpperCase().trim() ==
            feature.properties.name.toUpperCase().trim() && bbox(feature)
      )
      .filter(value => Object.keys(value).length !== 0);

    //If filter.city is in commonArea, change fitBounds
    bound.length != 0 &&
      this.setState({
        isLoading: true,
        map: {
          viewport: {
            center: defaultCenter,
            zoom: defaultZoomLevel,
            fitBounds: bound[0]
          }
        }
      });

    //If filter.city not in commonAreas, request mapbox geocoding and change fitBounds
    const payload = `${filter.city}`;
    bound.length == 0 &&
      fetch(`/api/mapbox/geocode/${payload}`)
        .then(res => res.json())
        .then(res => {
          const { results } = res.data;
          if (!results) {
            console.log("geocoding error");
          }
          const { features } = results;
          this.setState({
            isLoading: true,
            map: {
              viewport: {
                center: defaultCenter,
                zoom: defaultZoomLevel,
                fitBounds: features[0].bbox
              }
            }
          });
        });

    fetch("/api/projects")
      .then(res => res.json())
      .then(results => {
        this.setState({
          projects: results.data.projects.filter(
            project => project.address.city === filter.city
          )
        });
        this.getCities(results.data.projects);
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  /**
   * @desc Resets the projects list to it's original state
   */
  resetOnClick() {
    this.getProjects();
    this.closePopups();

    //reset viewport
    this.setState({
      map: {
        viewport: {
          center: defaultCenter,
          zoom: defaultZoomLevel,
          fitBounds: [
            [-75.23866342773506, 40.007369864883685],
            [-75.46113657226667, 39.79666815595115]
          ]
        }
      },
      viewing: null
    });
  }

  closePopups() {
    //Close any existing popups
    const popups = document.getElementsByClassName("popup");
    const l = popups.length;
    for (let i = 0; i < l; i++) {
      console.log(popups[i]);
      popups[i].remove();
    }
  }

  render() {
    return (
      <div className="row">
        {/* The map filter section */}
        <div className="col-sm-4">
          <h1 className="display-4 mb-4">Civic Engagement Projects</h1>
          {/* For the cities in the projects, create a badge with a number representing how many projects occur in city */}
          {this.state.cityFilters && (
            <div className="my-3">
              {this.state.cityFilters.map((filter, i) => (
                <Button
                  variant="outline-dark"
                  key={filter + i}
                  className="mr-1"
                  size="sm"
                  style={{ margin: ".25em" }}
                  onClick={() => this.filterOnClick(filter)}
                >
                  {filter.city} <Badge variant="light">{filter.count}</Badge>
                </Button>
              ))}
              <Button
                variant="warning"
                className="mr-1"
                size="sm"
                onClick={() => this.resetOnClick()}
              >
                Reset
              </Button>
            </div>
          )}
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
                // Project Type  (s)
                <ListGroup.Item key={i} className="project-list">
                  {project.type.length == 1 && (
                    <span
                      className="font-weight-bold"
                      style={{
                        color: "rgb(162, 42, 42)"
                      }}
                    >
                      {project.type[0]}
                    </span>
                  )}
                  {project.type.length > 1 && (
                    <div
                      className="font-weight-bold"
                      style={{
                        color: "rgb(162, 42, 42)"
                      }}
                    >
                      {project.type.map(type => (
                        <span>{type} ; </span>
                      ))}
                    </div>
                  )}
                  {/* Project Title  */}
                  <h3
                    style={{
                      marginTop: "1rem",
                      marginRight: "1rem"
                      // marginBottom: "1rem"
                    }}
                  >
                    {project.name}
                  </h3>

                  {/* Project Description */}
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

                  {/* Issue Area (s) */}
                  {project.issue && project.issue.length === 1 && (
                    <span className="text-primary">#{project.issue[0]}</span>
                  )}
                  {project.issue && project.issue.length > 1 && (
                    <div className="text-primary">
                      {project.issue.map(issue => (
                        <span>#{issue} </span>
                      ))}
                    </div>
                  )}

                  {/* TODO: Weird spacing of elements in list group */}
                  <div>
                    <Button onClick={() => this.projectBtnOnClick(project)}>
                      Click me
                    </Button>
                  </div>
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
            // ref={(ref) => this.map = ref}
          >
            {/* Create symbol layer to store project pins */}
            <MapContext.Consumer>
              {map => {
                const marker = require("../map-marker-2-32.png");
                map.loadImage(marker, (error, image) => {
                  if (error) throw error;
                  map.addImage("custom-marker", image);
                });
              }}
            </MapContext.Consumer>
            <Layer
              type="symbol"
              id="marker"
              layout={{
                "icon-image": "custom-marker"
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

            {/* Adding city boundries -- TODO: find way programmatic way to query city boundaries */}
            {/* </Layer> */}
            <MapContext.Consumer>
              {map => {
                commonAreaData.features.map(feature =>
                  map
                    .addLayer({
                      id: feature.properties.name,
                      type: "fill",
                      source: {
                        type: "geojson",
                        data: feature
                      },
                      layout: {},
                      paint: {
                        "fill-color": "#088",
                        "fill-opacity": 0.15
                      }
                    })
                    .addLayer({
                      id: `${feature.properties.name}Fill`,
                      type: "line",
                      source: {
                        type: "geojson",
                        data: feature
                      },
                      layout: {},
                      paint: {
                        "line-color": "rgba(0, 0, 0, 1)",
                        "line-width": 2
                      }
                    })
                );
              }}
            </MapContext.Consumer>

            {this.state.viewing && (
              // Allow for use of Mapbox-GL-js functionality not covered by react-mapbox-gl package
              // Use popup with close button
              <MapContext.Consumer>
                {map => {
                  // map.fitBounds(boundSwarthmore);
                  console.log(`render, viewing && ${this.state.viewing.name}`);
                  var popup = new mapboxgl.Popup({
                    className: "popup",
                    closeOnClick: true
                  }) //{ closeOnClick: false }
                    .setLngLat([
                      this.state.viewing.address.lat,
                      this.state.viewing.address.lng
                    ])
                    .setHTML(
                      `<div 
                        style="
                          background: white;
                          border-radius: 8px 8px 8px 8px;
                          width: inherit
                        "
                        > 
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
                                <a href='#/projects/${this.state.viewing._id}' type="button" class="btn btn-warning btn-sm btn-block">
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
