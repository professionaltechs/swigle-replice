import React, { useCallback, useEffect, useState } from "react";

// STYLES
import "../styles/upload.css";

// IMAGES
import laptop from "../images/laptop.jpg";

// ICONS
import { MdOutlineDelete } from "react-icons/md";
import { GoFileDirectory } from "react-icons/go";
import { CiLink, CiMail } from "react-icons/ci";

// AXIOS
import { uploadFile, downloadFile } from "../axios/axios";

import { toast } from "react-toastify";
import LinearProgress from "@mui/material/LinearProgress";

const Upload = () => {
  // STATES
  const [send, setSend] = useState(false);
  const [recieve, setRecieve] = useState(false);
  const [files, setFiles] = useState([]);
  const [code, setCode] = useState(0);
  const [downloadCode, setDownloadCode] = useState(0);
  const [codeExpired, setCodeExpired] = useState(0);
  const [codeStartTime, setCodeStartTime] = useState(0);
  const [codeDuration, setCodeDuration] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const [progress, setProgress] = useState(0);
  const [uploadingStatus, setUploadingStatus] = useState(false);
  const [downloadProgess, setDownloadProgress] = useState(0);

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
    setCode(0);
    const allFiles = [...files, ...uploadedFile];
    setFiles(allFiles);
  };

  const removeUploadedFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  // API FUNCTIONS
  const sendFile = async () => {
    setUploadingStatus(true);
    const data = new FormData();
    files.forEach((file, i) => {
      data.append(`files`, file);
    });
    const response = await uploadFile.post("/", data, {
      onUploadProgress: (progressEvent) => {
        const progress = (progressEvent.loaded / progressEvent.total) * 99;
        setProgress(progress);
      },
      onDownloadProgress: (progressEvent) => {
        const progress = 50 + (progressEvent.loaded / progressEvent.total) * 1;
        setProgress(progress);
      },
    });
    if (response?.data?.success) {
      setCodeStartTime(Date.now() / 1000);
      setCodeDuration(300); // COUNTDOWN IN SECONDS
      const startTime = Date.now() / 1000;
      const duration = 300;
      setCodeExpired(300);
      const id = setInterval(function () {
        countDown(startTime, duration);
      }, 1000);
      setIntervalId(id);
      setCode(response?.data?.file?.code);
      setFiles([]);
      setUploadingStatus(false);
      setProgress(0);
      return toast.success("File uploaded successfully!");
    }
    toast.error("Error occured. Please try again!");
    setUploadingStatus(false);
    setProgress(0);
  };

  const recieveFile = async () => {
    const response = await downloadFile.get(`/${downloadCode}`, {
      onDownloadProgress: (progressEvent) => {
        let progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        setDownloadProgress(progress);
      },
    });
    if (
      response.headers["content-type"] === "application/json; charset=utf-8"
    ) {
      return toast.error("Invalid Code");
    }
    const href = URL.createObjectURL(new Blob([response?.data]));
    const link = document.createElement("a");
    link.href = href;
    link.setAttribute("download", "file.zip");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  // STATE FUNCTIONS
  const countDown = (startTime, duration) => {
    const curentTime = Date.now() / 1000;
    const elapsedTime = Math.floor(curentTime - startTime);
    setCodeExpired((prev) => duration - elapsedTime);
  };

  const adjustCountDown = () => {
    const curentTime = Date.now() / 1000;
    const elapsedTime = Math.floor(curentTime - codeStartTime);
    setCodeExpired((prev) => codeDuration - elapsedTime);
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", adjustCountDown);
  }, []);

  useEffect(() => {
    if (codeExpired === 0) {
      setCode(0);
      setCodeExpired(0);
      clearInterval(intervalId);
    }
  }, [codeExpired, intervalId]);

  useEffect(() => {
    if (downloadProgess == 100) {
      setDownloadProgress(0);
    }
  }, [downloadProgess]);

  return (
    <>
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
                <div className={`uploadedFiles ${code ? "fileCode" : ""}`}>
                  {code ? (
                    <>
                      <h5>Code</h5>
                      <h1>{code}</h1>
                      <p>
                        Expires in{" "}
                        <span style={{ color: "#E74C3C" }}>
                          {parseInt(codeExpired / 60)}m
                        </span>{" "}
                        <span style={{ color: "#E74C3C" }}>
                          {codeExpired % 60}s
                        </span>
                      </p>
                    </>
                  ) : (
                    <>
                      <div
                        className="uploadedFilesInner"
                        style={{ flexGrow: "1" }}
                      >
                        {[...files]?.map((file, index) => {
                          return (
                            <div className="uploadedFilesList" key={index}>
                              <div className="uploadedFileDetails">
                                {file.name}
                              </div>
                              <div
                                style={{
                                  textAlign: "center",
                                  color: "#E74C3C",
                                }}
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
                    </>
                  )}
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
                    onChange={(e) => handleUploadedFiles(e.target.files)}
                    style={{ display: "none" }}
                  />
                  <button
                    onClick={sendFile}
                    className="btn btn-success uploadFileButton"
                    disabled={code}
                  >
                    Send
                  </button>
                </div>
                <LinearProgress
                  variant="determinate"
                  className={`progressBar ${
                    uploadingStatus ? "progressBarActive" : ""
                  }`}
                  value={progress}
                />
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
                    onChange={(e) => setDownloadCode(e.target.value)}
                  />
                  <div className="uploadFileButtonContainer">
                    <button
                      className="btn btn-success uploadFileButton"
                      onClick={recieveFile}
                    >
                      Download
                    </button>
                  </div>
                  <LinearProgress
                    variant="determinate"
                    className={`progressBar ${
                      downloadProgess !== 0 ? "progressBarActive" : ""
                    }`}
                    value={downloadProgess}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="uploadSectionContentMobile">
          <div className="uploadSectionContentInner">
            <h3 className="uploadSectionContentInnerHeading">Files</h3>
            <hr />
            <div className={`uploadedFiles ${code ? "fileCode" : ""}`}>
              {code ? (
                <>
                  <h5>Code</h5>
                  <h1>{code}</h1>
                  <p>
                    Expires in{" "}
                    <span style={{ color: "#E74C3C" }}>
                      {parseInt(codeExpired / 60)}m
                    </span>{" "}
                    <span style={{ color: "#E74C3C" }}>
                      {codeExpired % 60}s
                    </span>
                  </p>
                </>
              ) : (
                <>
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
                </>
              )}
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
                onChange={(e) => handleUploadedFiles(e.target.files)}
              />
              <button
                className="btn btn-success uploadFileButton"
                onClick={sendFile}
                disabled={code}
              >
                Send
              </button>
            </div>
          </div>
          <div className="uploadSectionContentInner">
            <div style={{ marginTop: "auto", marginBottom: "auto" }}>
              <h3 className="uploadSectionContentInnerHeading">Recieve</h3>
              <hr />
              <input
                type="text"
                placeholder="Input key"
                className="inputKey"
                onChange={(e) => setDownloadCode(e.target.value)}
              />
              <div className="uploadFileButtonContainer">
                <button
                  className="btn btn-success uploadFileButton"
                  onClick={recieveFile}
                >
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
