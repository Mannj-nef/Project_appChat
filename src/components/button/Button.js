import React from "react";

import LoadingSpiner from "../loading";

import PropTypes from "prop-types";

/**
 * @requires
 *  @param {string} type type of button is button | submit
 * @returns
 */

const Button = ({
  type = "submit",
  className = "",
  height,
  children,
  handle = () => {},
  ...props
}) => {
  const { isLoading, ...rest } = props;
  const child = isLoading ? <LoadingSpiner></LoadingSpiner> : children;
  return (
    <button
      className={`bg-purple-600 text-white relative rounded-lg w-full p-3 mt-10 font-medium h-12 ${className} `}
      style={{
        height,
      }}
      type={type}
      {...rest}
      onClick={handle}
    >
      {child}
    </button>
  );
};
Button.propTypes = {
  // isLoading: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.string,
};
export default Button;
