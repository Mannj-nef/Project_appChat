import React from "react";

const Form = ({ children, handle, ...props }) => {
  return (
    <form autoComplete="off" onSubmit={handle} {...props}>
      {children}
    </form>
  );
};

export default Form;
