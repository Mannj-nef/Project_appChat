import React, { useState } from "react";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";

const InputTogglePassword = ({
  iconShow,
  iconHide,
  error,
  placeholder = "",
  control,
  ...props
}) => {
  const { field } = useController({
    name: "password",
    control,
    defaultValue: "",
  });

  const ClassIcon =
    "input-icon absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer ";

  const [isShow, setIsShow] = useState(false);
  return (
    <div className="relative">
      <input
        id="password"
        className="p-3 border bg-slate-200 focus:bg-white transition-all focus:border-blue-500 outline-none rounded-lg w-full "
        type={isShow ? "text" : "password"}
        placeholder={placeholder}
        {...props}
        {...field}
      />
      {isShow ? (
        <span className={ClassIcon} onClick={() => setIsShow(false)}>
          {iconShow}
        </span>
      ) : (
        <span className={ClassIcon} onClick={() => setIsShow(true)}>
          {iconHide}
        </span>
      )}
      {error && <p className="absolute top-[105%] text-red-500">{error}</p>}
    </div>
  );
};

InputTogglePassword.propTypes = {
  error: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  control: PropTypes.any,
  iconShow: PropTypes.node,
  iconHide: PropTypes.node,
};

export default InputTogglePassword;
