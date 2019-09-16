import React from "react";
import { FPVideo, FeaturedProject } from "../components";

const Home = props => {
  return (
    <>
      <FPVideo url="https://www.youtube.com/embed/_4B6e8mFqUI?controls=0" />
      <FeaturedProject title="This awesome project" description="lorem ipsum" imageURL="some image url" />
      <FeaturedProject title="This 2 project" description="lorem ipsum" imageURL="some image url" />
      <FeaturedProject title="This 3 project" description="lorem ipsum" imageURL="some image url" />
      <FeaturedProject title="This 4 project" description="lorem ipsum" imageURL="some image url" />
    </>
  );
};

export default Home;
