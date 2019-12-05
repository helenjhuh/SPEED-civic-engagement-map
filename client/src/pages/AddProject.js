import React, { Component } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";

const projectTypes = [
  { value: "Engaged Teaching", label: "Engaged Teaching", name: "type" },
  { value: "Engaged Research", label: "Engaged Research", name: "type" },
  { value: "Engaged Projects", label: "Engaged Projects", name: "type" },
  { value: "Other", label: "Other" }
];
const projectIssues = [
  {
    value: "Arts, Media, and Culture",
    label: "Arts, Media, and Culture",
    name: "issue"
  },
  {
    value: "Economic Development",
    label: "Economic Development",
    name: "issue"
  },
  {
    value: "Education and Access",
    label: "Education and Access",
    name: "issue"
  },
  {
    value: "Environment and Sustainability",
    label: "Environment and Sustainability",
    name: "issue"
  },
  {
    value: "Ethics and Human Rights",
    label: "Ethics and Human Rights",
    name: "issue"
  },
  {
    value: "Identities and Inequality",
    label: "Identities and Inequality",
    name: "issue"
  },
  { value: "Public Health", label: "Public Health", name: "issue" },
  {
    value: "Politics and Public Policy",
    label: "Politics and Public Policy",
    name: "issue"
  },
  {
    value: "Refugees and Immigration",
    label: "Refugees and Immigration",
    name: "issue"
  },
  { value: "Science and Society", label: "Science and Society", name: "issue" }
];

const projectGrants = [
  {
    value: "Chester Community Fellowship",
    label: "Chester Community Fellowship",
    name: "langGrants"
  },
  {
    value: "Lang Opportunity Scholarship",
    label: "Lang Opportunity Scholarship",
    name: "langGrants"
  },
  {
    value: "Project Pericles Fund",
    label: "Project Pericles Fund",
    name: "langGrants"
  },
  {
    value: "Summer Grants ( projects, internships, research )",
    label: "Summer Grants ( projects, internships, research )",
    name: "langGrants"
  },
  { value: "Faculty Award", label: "Faculty Award", name: "langGrants" }
];

const mapStateToProps = state => ({
  loggedInAs: state.auth.loggedInAs
});

class AddProject extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      type: [],
      issue: [],
      langGrants: [],
      communityPartners: [],
      funders: [],
      beneficiaries: 0,
      website: "",
      owner: "",
      street1: "",
      street2: "",
      city: "",
      region: "",
      zip: "",
      country: "",
      lat: "",
      lng: "",
      error: "",
      addedProjects: ""
    };
    this.onFormChange = this.onFormChange.bind(this);
    this.onFormSelectChange = this.onFormSelectChange.bind(this);
    this.addProject = this.addProject.bind(this);
    this.geocode = this.geocode.bind(this);
  }

  componentDidMount() {
    this.setState({ owner: this.props.loggedInAs._id });
  }

  geocode() {
    // construct the geocode payload from the address form
    const { street1, city, region, country, street2 } = this.state;
    const payload = `${street1} ${street2} ${city} ${region} ${country}`;

    fetch(`/api/mapbox/geocode/${payload}`)
      .then(res => res.json())
      .then(res => {
        const { results } = res.data;
        if (!results) {
          this.setState({
            error:
              "Uh oh... it looks like there was a problem geocoding your provided address! Please refresh the page and try again."
          });
          return;
        }
        const { features } = results;
        const lat = features[0].center[0];
        const lng = features[0].center[1];

        this.setState({ lat, lng });
      });
  }

  onFormChange(e) {
    console.log(e.target);
    const { name, value } = e.target;

    // if the address fields are being changed, geocode the address
    if (
      name === "street1" ||
      name === "street2" ||
      name === "city" ||
      name === "region" ||
      name === "zip" ||
      name === "country"
    ) {
      this.geocode();
    }

    this.setState({
      [name]: value
    });
  }

  onFormSelectChange(array, actionMeta) {
    console.log(actionMeta);
    const valueArray = [];
    array.forEach(item => {
      valueArray.push(item.value);
    });

    this.setState({
      [actionMeta.name]: valueArray
    });

    console.log(this.state);
  }

  addProject(e) {
    // construct the payload
    const {
      name,
      description,
      type,
      issue,
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
      lat,
      lng,
      country
    } = this.state;
    const payload = {
      name,
      description,
      type,
      issue,
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
      lat,
      lng,
      country,
      owner: this.props.loggedInAs._id
    };

    console.log(payload);
    // Make the request

    this.setState({ isLoading: true });

    fetch("/api/projects/add-with-address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(results => this.setState({ addedProject: results }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    return (
      <div className="container">
        <h1 className="display-4 mb-4">Add a Project</h1>

        {/* if there's an error, display it to the user */}
        {this.state.error && <p className="error">{this.state.error}</p>}

        {/* if the user project has been added, display it to the user for now */}
        {this.state.addedProject && (
          <p>
            Your project is saved but may not be viewable to the public until a
            moderator approves it. You can view your project on your My Projects
            page.
          </p>
        )}

        <Form>
          <Form.Group controlId="formProjectName">
            <Form.Label>Project name</Form.Label>
            <Form.Control
              type="text"
              placeholder="My awesome project"
              name="name"
              onChange={this.onFormChange}
            />
          </Form.Group>
          <Form.Group controlId="formProjectDescription">
            <Form.Label>Project description</Form.Label>
            <Form.Control
              as="textarea"
              rows="5"
              type="text"
              placeholder="Tell us about your project"
              name="description"
              onChange={this.onFormChange}
            />
          </Form.Group>

          {/* <Form.Group controlId="formProjectType">
            <Form.Label>Project Type</Form.Label>
            <Form.Control as="select" name="type" onChange={this.onFormChange}>
              {projectTypes.map((type, i) => (
                <option key={i}>{type}</option>
              ))}
            </Form.Control>
          </Form.Group> */}
          <Form.Group id="formProjectTypes">
            <Form.Label>Project Type (select all that apply)</Form.Label>
            <Select
              isMulti
              name="type"
              options={projectTypes}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={this.onFormSelectChange}
            />
          </Form.Group>

          <Form.Group id="formProjectIssues">
            <Form.Label>Project Issue (select all that apply)</Form.Label>
            <Select
              isMulti
              name="issue"
              options={projectIssues}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={this.onFormSelectChange}
            />
          </Form.Group>

          <Form.Group id="formProjectGrants">
            <Form.Label>
              Lang Center Grants and Awards (select all that apply)
            </Form.Label>
            <Select
              isMulti
              name="langGrants"
              options={projectGrants}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={this.onFormSelectChange}
            />
          </Form.Group>

          {/* Community Partners  */}
          <Form.Group id="formCommunityPartners">
            <Form.Label>
              Community Partners (create as many as needed)
            </Form.Label>
            <CreatableSelect
              isMulti
              name="communityPartners"
              onChange={this.onFormSelectChange}
            />
          </Form.Group>

          {/* Funders */}
          <Form.Group id="formFunders">
            <Form.Label>Funders (create as many as needed)</Form.Label>
            <CreatableSelect
              isMulti
              name="funders"
              onChange={this.onFormSelectChange}
            />
          </Form.Group>

          {/* Number of Beneficiaries  */}
          <Form.Group id="formBeneficiaries">
            <Form.Label>
              Beneficiaries (please enter approximate number)
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="50"
              name="beneficiaries"
              onChange={this.onFormChange}
            />
          </Form.Group>

          <Form.Group controlId="formProjectWebsite">
            <Form.Label>Project website</Form.Label>
            <Form.Control
              type="text"
              placeholder="If your project has a website please include the URL here"
              name="website"
              onChange={this.onFormChange}
            />
          </Form.Group>
          <Form.Group controlId="formAddressStreet1">
            <Form.Label>Street 1</Form.Label>
            <Form.Control
              type="text"
              placeholder="123 Main St"
              name="street1"
              onChange={this.onFormChange}
            />
          </Form.Group>
          <Form.Group controlId="formAddressStreet2">
            <Form.Label>Street 2</Form.Label>
            <Form.Control
              type="text"
              placeholder="Unit 900"
              name="street2"
              onChange={this.onFormChange}
            />
          </Form.Group>
          <Form.Group controlId="formAddressCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="New York City"
              name="city"
              onChange={this.onFormChange}
            />
          </Form.Group>
          <Form.Group controlId="formAddressRegion">
            <Form.Label>Region</Form.Label>
            <Form.Control
              type="text"
              placeholder="New York"
              name="region"
              onChange={this.onFormChange}
            />
          </Form.Group>
          <Form.Group controlId="formAddressZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              type="number"
              placeholder="10021"
              name="zip"
              onChange={this.onFormChange}
            />
          </Form.Group>
          <Form.Group controlId="formAddressCountry">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="United States"
              name="country"
              onChange={this.onFormChange}
            />
          </Form.Group>
          <Button variant="primary" onClick={this.addProject}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(AddProject);
