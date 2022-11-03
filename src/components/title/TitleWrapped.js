import React from "react";

import PropTypes from "prop-types";

const TitleWrapped = ({ title, desc, level = 1 }) => {
  let HeadingTitle = null;

  switch (level) {
    case 1:
      HeadingTitle = <h1 className="text-4xl font-semibold"> {title}</h1>;
      break;
    case 2:
      HeadingTitle = <h2 className="text-3xl font-semibold"> {title}</h2>;
      break;
    case 3:
      HeadingTitle = <h3 className="text-2xl font-semibold"> {title}</h3>;
      break;
    case 4:
      HeadingTitle = <h4 className="text-xl font-semibold"> {title}</h4>;
      break;
    case 5:
      HeadingTitle = <h5 className="text-xl font-semibold"> {title}</h5>;
      break;

    default:
      break;
  }

  return (
    <>
      {HeadingTitle}
      <p>{desc}</p>
    </>
  );
};
TitleWrapped.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string,
  level: PropTypes.number.isRequired,
};
export default TitleWrapped;
