import React from "react";
import PropTypes from "prop-types";

const LoadingSpiner = ({ size = "25px", ...props }) => {
  const classLoading = `animate-spin w-[25px] h-[25px] text-white rounded-full border-y-4 border-x-4 border-y-transparent mx-auto`;
  return (
    <div className={classLoading} size={size} {...props}>
      <div className=""></div>
    </div>
  );
};

LoadingSpiner.propTypes = {
  size: PropTypes.string,
  rounder: PropTypes.number,
};

export default LoadingSpiner;
