import React from "react";
import PropTypes from "prop-types";

/**
 * @requires
 * @param {string} htmlFor label needs 1 htmlFor is id input
 * @returns
 */

const Label = ({ htmlFor = "", children, className = "", ...props }) => {
  return (
    <label
      className={`font-medium block ${className}`}
      htmlFor={htmlFor}
      {...props}
    >
      {children}
    </label>
  );
};

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};

export default Label;
