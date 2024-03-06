import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

// STYLES
import "../styles/upload.css";

// IMAGES
import laptop from "../images/laptop.jpg";

// ICONS
import { MdOutlineCloudUpload, MdOutlineDelete } from "react-icons/md";
import { GoFileDirectory } from "react-icons/go";
import { BiMessageAltCheck } from "react-icons/bi";
import { CiLink, CiMail } from "react-icons/ci";
import { CiFileOn } from "react-icons/ci";

const Upload = () => {
  // const onDrop = useCallback((acceptedFiles) => {
  // }, []);
  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // STATES
  const [send, setSend] = useState(false);
  const [recieve, setRecieve] = useState(false);
  const [files, setFiles] = useState([]);

  // ANIMATION FUNCTIONS
  const handleSend = (option) => {
    // OPTION 1 = SEND, 0 = RECIEVE
    document.getElementsByClassName(
      "uploadSectionImageSection"
    )[0].style.width = "50%";
    document.getElementsByClassName("uploadSectionContent")[0].style.width =
      "50%";
    if (option) {
      setSend(true);
      setRecieve(false);
    } else {
      setSend(false);
      setRecieve(true);
    }
  };

  useEffect(() => {
    if (send || recieve) {
      document.getElementsByClassName(
        "uploadSectionImageSectionOptionsConteiner"
      )[0].style.height = "40px";
    }
  }, [, send, recieve]);

  // FILE HANDLING
  const handleUploadedFiles = (uploadedFile) => {
    const data = new FormData();
    [...uploadedFile].forEach((file, i) => {
      data.append(`file-${i}`, file, file.name);
    });
    return data;
  };

  const removeUploadedFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  useEffect(() => {
    if (files.length) {
      const uploadedFiles = handleUploadedFiles(files);
    }
  }, [files, files.length]);

  return (
    <>
      {/* <div className="uploadMain">
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
      </div> */}
      <div className="uploadSection container">
        <div className="uploadSectionInner">
          <div className="uploadSectionImageSection">
            <img className="uploadSectionImage" src={laptop} alt="" />

            <div className="uploadSectionImageSectionOptionsConteiner">
              {send ? (
                <div className="uploadSectionImageSectionChangeOption">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleSend(0)}
                  >
                    Recieve
                  </button>
                </div>
              ) : (
                recieve && (
                  <div className="uploadSectionImageSectionChangeOption">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleSend(1)}
                    >
                      Send
                    </button>
                  </div>
                )
              )}
            </div>
          </div>

          {!send && !recieve && (
            <div className="uploadSectionImageSectionOptions">
              <div
                className="uploadSectionImageSectionOptionsSend"
                onClick={() => handleSend(1)}
              >
                <div className="rotatingBorder"></div>
                <h6 className="uploadSectionImageSectionOptionsHeading">
                  Send
                </h6>
              </div>
              <div
                className="uploadSectionImageSectionOptionsRecieve"
                onClick={() => handleSend(0)}
              >
                <div className="rotatingBorder"></div>
                <h6 className="uploadSectionImageSectionOptionsHeading">
                  Recieve
                </h6>
              </div>
            </div>
          )}

          <div className="uploadSectionContent">
            {send && (
              <div className="uploadSectionContentInner">
                <h3 className="uploadSectionContentInnerHeading">Files</h3>
                <hr />
                <div className="uploadedFiles">
                  <div className="uploadedFilesInner" style={{ flexGrow: "1" }}>
                    {[...files]?.map((file, index) => {
                      return (
                        <div className="uploadedFilesList" key={index}>
                          <div className="uploadedFileDetails">{file.name}</div>
                          <div
                            style={{ textAlign: "center", color: "#E74C3C" }}
                          >
                            <MdOutlineDelete
                              style={{ cursor: "pointer" }}
                              onClick={() => removeUploadedFile(index)}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="uploadedFilesType">
                    <hr style={{ marginTop: "0px" }} />
                    <div className="directLinkEmail">
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <GoFileDirectory
                          style={{ marginRight: "5px", fontSize: "18px" }}
                        />
                        Direct
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <CiLink
                          style={{ marginRight: "5px", fontSize: "18px" }}
                        />
                        Link
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <CiMail
                          style={{ marginRight: "5px", fontSize: "18px" }}
                        />
                        E-mail
                      </span>
                    </div>
                  </div>
                </div>
                <div className="uploadFileButtonContainer">
                  <label
                    htmlFor="inpuFile"
                    className="btn btn-primary uploadFileButton"
                  >
                    Upload File
                  </label>
                  <input
                    id="inpuFile"
                    type="file"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                    style={{ display: "none" }}
                  />
                  <button className="btn btn-success uploadFileButton">
                    Send
                  </button>
                </div>
              </div>
            )}
            {recieve && (
              <div
                className="uploadSectionContentInner"
                style={{
                  border: "1px solid #000000",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                  borderRadius: "10px",
                  background: "#171717",
                  color: "white",
                }}
              >
                <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                  <h3 className="uploadSectionContentInnerHeading">Recieve</h3>
                  <input
                    type="text"
                    placeholder="Input key"
                    className="inputKey"
                  />
                  <div className="uploadFileButtonContainer">
                    <button className="btn btn-success uploadFileButton">
                      Download
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="uploadSectionContentMobile">
          <div className="uploadSectionContentInner">
            <h3 className="uploadSectionContentInnerHeading">Files</h3>
            <hr />
            <div className="uploadedFiles">
              <div className="uploadedFilesInner" style={{ flexGrow: "1" }}>
                {[...files]?.map((file, index) => {
                  return (
                    <div className="uploadedFilesList" key={index}>
                      <div className="uploadedFileDetails">{file.name}</div>
                      <div style={{ textAlign: "center", color: "#E74C3C" }}>
                        <MdOutlineDelete
                          style={{ cursor: "pointer" }}
                          onClick={() => removeUploadedFile(index)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="uploadFileButtonContainer">
              <label
                htmlFor="inputFileMobile"
                className="btn btn-primary uploadFileButton"
              >
                Upload File
              </label>
              <input
                id="inputFileMobile"
                type="file"
                multiple
                style={{ display: "none" }}
              />
              <button className="btn btn-success uploadFileButton">Send</button>
            </div>
          </div>
          <div className="uploadSectionContentInner">
            <div style={{ marginTop: "auto", marginBottom: "auto" }}>
              <h3 className="uploadSectionContentInnerHeading">Recieve</h3>
              <hr />
              <input type="text" placeholder="Input key" className="inputKey" />
              <div className="uploadFileButtonContainer">
                <button className="btn btn-success uploadFileButton">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Upload;
