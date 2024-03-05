import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

// STYLES
import "../styles/upload.css";

// ICONS
import { MdOutlineCloudUpload } from "react-icons/md";

const Upload = () => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <>
      <div className="uploadMain">
        <div className="uploadContainer">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <div className="uploadInner">
                <div className="rotatingBorder"></div>
                <MdOutlineCloudUpload className="uploadIcon" />
              </div>
            )}
          </div>
        </div>
        <div className="uploadIntro">
          <h4 className="uploadIntroHeading">Enjoy seamless file transfers online, free from worries about performance or costs.</h4>
          <div className="uploadIntroInput">
            <input type="text" placeholder="Enter your E-mail" className="uploadIntroEmail"/>
            <button className="btn btn-primary uploadIntroSingUp">Sign up</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Upload;
