import React from "react";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";

const InputControl = ({
  type,
  name,
  error,
  control,
  children,
  className = "",
  placeholder = "",
  ...props
}) => {
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });

  return (
    <div className="relative ">
      <input
        className={`p-3 border bg-slate-200 focus:bg-white transition-all focus:border-blue-500 outline-none rounded-lg w-full ${className}`}
        type={type || "text"}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {children ? (
        <span className="absolute py-2 px-3 right-5 top-1/2 -translate-y-1/2 bg-blue-700 text-white rounded-xl cursor-pointer">
          {children}
        </span>
      ) : null}

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
  children: PropTypes.any,
};

export default InputControl;
