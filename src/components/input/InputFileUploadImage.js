import React from "react";

const InputFileUploadImage = (props) => {
  const { valueImage, handlSelectImage, className, classImage } = props;
  return (
    <>
      <label htmlFor="file-image" className="cursor-pointer h-full w-full">
        <div>
          <img
            className={classImage ? classImage : "w-6 h-6 rounded-lg"}
            src={valueImage || "/img-upload.png"}
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
