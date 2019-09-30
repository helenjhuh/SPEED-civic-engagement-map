import React from "react";
import { FPVideo, FeaturedProject } from "../components";
import faker from "faker";

const Home = props => {
  return (
    <>
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
      <FeaturedProject
        title={faker.random.words(5)}
        description={faker.hacker.phrase()}
        imageURL={`https://loremflickr.com/640/480?random=${Math.round(
          Math.random() * 10
        )}`}
        projectURL="#"
      />
      <FeaturedProject
        title={faker.random.words(5)}
        description={faker.hacker.phrase()}
        imageURL={`https://loremflickr.com/640/480?random=${Math.round(
          Math.random() * 10
        )}`}
        projectURL="#"
        flip={true}
      />
      <FeaturedProject
        title={faker.random.words(5)}
        description={faker.hacker.phrase()}
        imageURL={`https://loremflickr.com/640/480?random=${Math.round(
          Math.random() * 10
        )}`}
        projectURL="#"
      />
      <FeaturedProject
        title={faker.random.words(5)}
        description={faker.hacker.phrase()}
        imageURL={`https://loremflickr.com/640/480?random=${Math.round(
          Math.random() * 10
        )}`}
        projectURL="#"
        flip={true}
      />
    </>
  );
};

export default Home;
