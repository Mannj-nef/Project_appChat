import React from "react";
import PropTypes from "prop-types";

const LoadingSpiner = ({ size = "25px", className, ...props }) => {
  const classLoading = `animate-spin w-[25px] h-[25px] text-white rounded-full border-y-4 border-x-4 border-y-transparent mx-auto ${className}`;
  return (
    <div className={classLoading} size={size} {...props}>
      <div className=""></div>
    </div>
  );
};

LoadingSpiner.propTypes = {
  size: PropTypes.string,
  rounder: PropTypes.number,
  className: PropTypes.string,
};

export default LoadingSpiner;
