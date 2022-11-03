import React from "react";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";

const InputControl = ({
  type,
  name,
  error,
  control,
  placeholder = "",
  ...props
}) => {
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });

  return (
    <div className="relative">
      <input
        className="p-3 border bg-slate-200 focus:bg-white transition-all focus:border-blue-500 outline-none rounded-lg w-full mt-5"
        type={type || "text"}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {error && <p className="absolute top-[105%] text-red-500">{error}</p>}
    </div>
  );
};

InputControl.propTypes = {
  error: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  control: PropTypes.any,
};

export default InputControl;
