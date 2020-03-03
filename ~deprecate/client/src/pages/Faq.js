import React from "react";
import FAQ from "../components/oneFaq";

const Faq = props => {
  return (
    <div className="container">
      <h1 className="display-4 mb-4">FAQ page</h1>
      <FAQ question="What's up?" answer="I'm good"></FAQ>
      <FAQ
        question="Where is Home Page?"
        answer="Right here"
        optionalURL="/"
      ></FAQ>
      <FAQ
        question="Here is a long question"
        answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis bibendum nunc. Donec molestie quam imperdiet, pellentesque risus at, tempor enim. Quisque libero augue, auctor sed mauris non, ultrices sollicitudin diam. Phasellus tincidunt dictum ex, eget tempus ante scelerisque vitae. Vestibulum blandit condimentum justo vestibulum condimentum. Nulla gravida nulla lacus, vel porttitor enim laoreet quis. Aliquam magna leo, tincidunt ac fringilla venenatis, luctus sodales lectus. Proin dui justo, tincidunt sed est at, fringilla dignissim urna. Aliquam neque velit, faucibus ut egestas vitae, mollis et diam. Curabitur maximus blandit dictum. Pellentesque efficitur dapibus tortor nec sollicitudin. Sed sit amet auctor metus. Nam aliquam nisl eget finibus consectetur."
      ></FAQ>
    </div>
  );
};

export default Faq;
