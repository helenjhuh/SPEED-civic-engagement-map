import React, { useState, useEffect } from "react";
import { FPVideo, FeaturedProject } from "../components";
import { Link } from "react-router-dom";
import useAPI from "../hooks/useAPI";

const Home = props => {
  const url = "/api/projects";
  const { loading, error, data } = useAPI(url);

  if (!data.projects) {
    data.projects = [];
  }

  return (
    <div>
      <FPVideo url="https://www.youtube.com/embed/_4B6e8mFqUI?controls=0" />
      <h2
        className="display-3 text-center"
        style={{
          borderBottom: "1px dashed black",
          maxWidth: "700px",
          margin: "0 auto",
          paddingTop: "0.5em",
          paddingBottom: "0.5em",
          marginBottom: "1em"
        }}
      >
        Featured Projects
      </h2>

      {/* If there is an error loading the projects, display it to the user */}
      {error && <p className="text-danger">{error}</p>}

      {loading && <p className="text-muted">Loading...</p>}

      {data && data.projects.length === 0 && (
        <div>
          <p className="text-lead text-center">
            It doesn't look like there are any projects created yet!
          </p>
          <p className="text-center">
            <Link to="/signup">Sign up</Link> to be the first!
          </p>
        </div>
      )}

      {data &&
        data.projects.map(
          ({ isFeatured, name, description, _id }) =>
            isFeatured && (
              <FeaturedProject
                title={name}
                description={description}
                imageURL={`https://loremflickr.com/640/480?random=${Math.round(
                  Math.random() * 10
                )}`}
                projectURL={`/projects/${_id}`}
              />
            )
        )}
    </div>
  );
};

export default Home;
