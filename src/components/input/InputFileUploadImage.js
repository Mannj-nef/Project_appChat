import React from "react";
import { useState } from "react";

const InputFileUploadImage = ({
  valueImage,
  handlSelectImage,
  className,
  ...props
}) => {
  return (
    <>
      <label htmlFor="file-image" className="cursor-pointer h-full w-full">
        <div>
          <img
            className="w-6 h-6 rounded-lg"
            src="/img-upload.png"
            alt="img-upload-file"
          />
        </div>
      </label>
      <input
        type="file"
        name=""
        id="file-image"
        onChange={(e) => handlSelectImage(e)}
        className={` hidden-input ${className}`}
      />
    </>
  );
};

export default InputFileUploadImage;
