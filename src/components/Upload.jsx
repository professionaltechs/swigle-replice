import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";

// STYLES
import "../styles/upload.css";

// IMAGES
import laptop from "../images/laptop.jpg";

// ICONS
import { MdOutlineDelete, MdOutlineFileDownload } from "react-icons/md";
import { GoFileDirectory } from "react-icons/go";
import { CiLink, CiMail } from "react-icons/ci";

// AXIOS
import {
  uploadFile,
  downloadFile,
  recieveFilesNames,
  getSingleFile,
  fetchSubscriptionDetails,
} from "../axios/axios";

// OTHERS
import { toast } from "react-toastify";
import LinearProgress from "@mui/material/LinearProgress";

// WEBSOCKET
const ws = new WebSocket("ws://localhost:8081");

const Upload = () => {
  const params = useParams();

  // STATES
  const [send, setSend] = useState(false);
  const [recieve, setRecieve] = useState(false);
  const [files, setFiles] = useState([]);
  const [transferType, setTransferType] = useState(0); // 0 = Direct, 1 = Link, 2 = Email
  const [filesList, setFilesList] = useState([]);

  const [uploadedFilesSize, setUploadedFilesSize] = useState(0);
  const [uploadSizeLimit, setUploadSizeLimit] = useState();

  const [code, setCode] = useState(0);
  const [downloadCode, setDownloadCode] = useState(0);
  const [expiryTime, setExpiryTime] = useState();

  const [link, setLink] = useState("");
  const [paramCode, setParamCode] = useState();
  const [linkReciever, setLinkReceiver] = useState(false);

  const [progress, setProgress] = useState(0);
  const [uploadingStatus, setUploadingStatus] = useState(false);
  const [creatingZipProgress, setCreatingZipProgress] = useState(0);
  const [downloadProgess, setDownloadProgress] = useState(0);
  const [downloadingStatus, setDownloadingStatus] = useState(false);

  // ANIMATION FUNCTIONS DECLARATIONS
  const handleSlideAnimation = () => {
    document.getElementsByClassName(
      "uploadSectionImageSection"
    )[0].style.width = "50%";
    document.getElementsByClassName("uploadSectionContent")[0].style.width =
      "50%";
  };

  const statusAnimation = () => {
    if (document.getElementsByClassName("statusContainerAnimated").length) {
      if (downloadingStatus) {
        const requiredHeight =
          document.getElementsByClassName("statusContainer")[0].offsetHeight;
        document.getElementsByClassName(
          "statusContainerAnimated"
        )[0].style.height = `${requiredHeight}px`;
        return;
      }
      document.getElementsByClassName(
        "statusContainerAnimated"
      )[0].style.height = `0px`;
    }
  };

  const uploadSizeLimitAnimation = () => {
    const animatingELement = document.getElementsByClassName(
      "uploadAlertContainer"
    )[0];
    if (animatingELement) {
      if (uploadedFilesSize > uploadSizeLimit) {
        const requiredHeight = document.getElementsByClassName(
          "uploadAlertContainerInner"
        )[0].offsetHeight;
        console.log(requiredHeight);
        animatingELement.style.marginTop = `8px`;
        animatingELement.style.height = `${requiredHeight}px`;
      } else {
        animatingELement.style.marginTop = `0px`;
        animatingELement.style.height = "0px";
      }
    }
  };

  // ANIMATION FUNCTION CALLING
  useEffect(() => {
    uploadSizeLimitAnimation();
  }, [uploadedFilesSize, uploadSizeLimit, files]);

  // FILE HANDLING
  const handleUploadedFiles = (uploadedFile) => {
    setCode(0);
    const allFiles = [...files, ...uploadedFile];
    setFiles(allFiles);
    // handleFileUpload(allFiles);
  };

  // const handleUploadChunk = async (chunk) => {
  //   const data = new FormData();
  //   data.append("chunk", chunk);
  //   const response = await axios.post("/upload-chunk", data);
  //   // Handle response from backend
  // };

  // const handleFileUpload = async (files) => {
  //   const chunkSize = 1024 * 1024 * 10; // 10MB
  //   const totalFilesSize = files.reduce((total, file) => {
  //     return total + file.size;
  //   }, 0);
  //   const totalFilesSizeInMb = (totalFilesSize / (1024 * 1024)).toFixed(2);
  //   console.log(totalFilesSize);
  //   console.log(totalFilesSizeInMb);
  //   let start = 0;
  //   let end = Math.min(chunkSize, fileSize);

  //   while (start < fileSize) {
  //     const chunk = file.slice(start, end);
  //     await handleUploadChunk(chunk);
  //     start = end;
  //     end = Math.min(start + chunkSize, fileSize);
  //   }
  // };

  const removeUploadedFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  // API FUNCTIONS
  ws.onmessage = (event) => {
    setDownloadingStatus(true);
    const progress = JSON.parse(event.data);
    console.log("Received progress update:", progress);
    const percentage = Math.floor(
      (progress.entries.processed / progress.entries.total) * 100
    );
    setCreatingZipProgress(percentage);
  };

  const sendFile = async () => {
    if (files.length == 0) {
      return toast.error("No files to send");
    }
    setUploadingStatus(true);
    const data = new FormData();
    files.forEach((file, i) => {
      data.append(`files`, file);
    });
    data.append("transferType", transferType);
    const token = localStorage.getItem("token");
    if (token) {
      data.append("token", token);
    }
    const response = await uploadFile.post("/", data, {
      onUploadProgress: (progressEvent) => {
        const progress = (progressEvent.loaded / progressEvent.total) * 99;
        setProgress(progress);
      },
      onDownloadProgress: (progressEvent) => {
        const progress = 50 + (progressEvent.loaded / progressEvent.total) * 1;
        setProgress(progress);
      },
      headers: {
        Authorization: token,
      },
    });
    if (response?.data?.success) {
      setExpiryTime(response?.data?.file?.expiryTime);
      if (response?.data?.file?.code) {
        setCode(response?.data?.file?.code);
      } else if (response?.data?.file?.link) {
        setLink(window.location.href + response?.data?.file?.link);
      }
      setFiles([]);
      setUploadingStatus(false);
      setProgress(0);
      return toast.success("File uploaded successfully!");
    }
    toast.error("Error occured. Please try again later!");
    setUploadingStatus(false);
    setProgress(0);
  };

  const downloadZipFile = async (paramCode) => {
    setDownloadingStatus(true);
    const response = await downloadcFile.get(`/${downloadCode || paramCode}`, {
      onDownloadProgress: (progressEvent) => {
        let progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        console.log(progressEvent);
        setDownloadProgress(progress);
      },
    });
    if (
      response.headers["content-type"] === "application/json; charset=utf-8"
    ) {
      return toast.error("Invalid Code");
    }
    const blob = new Blob([response.data], { type: "application/zip" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.setAttribute("download", "file.zip");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  const getFileNames = async (code) => {
    const response = await recieveFilesNames.get(`/${code}`);
    if (response?.data?.success) {
      setFilesList(response?.data?.filesList);
      console.log(response?.data?.filesList);
    }
  };

  const downloadSingleFile = async (fileName) => {
    const response = await getSingleFile.get(`/${fileName}`, {
      onDownloadProgress: (progressEvent) => {
        let progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        setDownloadProgress(progress);
      },
    });
    const fileType = fileName.split(".").pop();
    const href = URL.createObjectURL(new Blob([response?.data]));
    const link = document.createElement("a");
    link.href = href;
    link.setAttribute("download", `file.${fileType}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  const getSubscriptionDetails = async (userToken) => {
    const response = await fetchSubscriptionDetails.get(
      `/getSpecificSubscriptionDetails`,
      {
        headers: {
          Authorization: userToken,
        },
      }
    );
    const sizeInBytes = response?.data?.subscriptionDetails?.sizePerTransfer;
    const sizeInMegaBytes = sizeInBytes / (1024 * 1024);
    setUploadSizeLimit(sizeInMegaBytes);
  };

  // STATE FUNCTIONS
  const handleSend = (option) => {
    setLinkReceiver(false);
    handleSlideAnimation(); // OPTION 1 = SEND, 0 = RECIEVE
    if (option) {
      setSend(true);
      setRecieve(false);
    } else {
      setSend(false);
      setRecieve(true);
    }
  };

  useEffect(() => {
    if (params?.code) {
      setParamCode(() => params.code);
      setTimeout(() => {
        handleSlideAnimation();
        setLinkReceiver(true);
        getFileNames(params?.code);
      }, 500);
    }
    if (localStorage.getItem("token")) {
      getSubscriptionDetails(localStorage.getItem("token"));
    } else {
      const sizeInBytes = 104857600;
      const sizeInMegaBytes = sizeInBytes / (1024 * 1024);
      setUploadSizeLimit(sizeInMegaBytes);
    }
  }, []);


  useEffect(() => {
    if (downloadProgess == 100) {
      setCreatingZipProgress(0);
      setDownloadProgress(0);
      setDownloadingStatus(false);
    }
  }, [downloadProgess]);

  useEffect(() => {
    if (send || recieve || linkReciever) {
      document.getElementsByClassName(
        "uploadSectionImageSectionOptionsConteiner"
      )[0].style.height = "40px";
    }
  }, [send, recieve, linkReciever]);

  useEffect(() => {
    if (files?.length) {
      const filesSize = files?.reduce((totalSize, file) => {
        return totalSize + file.size;
      }, 0);
      const sizeInMegaBytes = (filesSize / (1024 * 1024)).toFixed(2);
      setUploadedFilesSize(sizeInMegaBytes);
    }
  }, [files]);

  useEffect(() => statusAnimation(), [downloadingStatus]);

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
                (recieve || linkReciever) && (
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

          {!send && !recieve && !paramCode && (
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
            {(send || linkReciever) && (
              <div className="uploadSectionContentInner">
                <h3 className="uploadSectionContentInnerHeading">Files</h3>
                <hr />
                <div
                  className={`uploadedFiles ${code || link ? "fileCode" : ""}`}
                >
                  {code || link ? (
                    <>
                      <h5>Code</h5>
                      {code ? <h1>{code}</h1> : <></>}
                      {link && (
                        <div className="uploadedFilesInner">
                          <p
                            style={{ cursor: "pointer", color: "#B9DBF7" }}
                            onClick={() => {
                              navigator.clipboard.writeText(link);
                              toast.success("Link copied to clipboard!");
                            }}
                          >
                            {link}
                          </p>
                        </div>
                      )}
                      <p>
                        Expires at{" "}
                        <span style={{ color: "#E74C3C" }}>{expiryTime}</span>
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
                        {linkReciever &&
                          (filesList?.length ? (
                            filesList?.map((fileName, index) => {
                              return (
                                <div className="uploadedFilesList" key={index}>
                                  <div className="uploadedFileDetails">
                                    {fileName}
                                  </div>
                                  <div
                                    style={{
                                      textAlign: "right",
                                      color: "#E74C3C",
                                    }}
                                  >
                                    <MdOutlineFileDownload
                                      onClick={() => {
                                        downloadSingleFile(fileName);
                                      }}
                                      className="downloadIcon"
                                      style={{ cursor: "pointer" }}
                                    />
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="uploadedFilesList">
                              No files Found
                            </div>
                          ))}
                      </div>
                      {!linkReciever && (
                        <div className="uploadedFilesType">
                          <hr style={{ marginTop: "0px" }} />
                          <div className="directLinkEmail">
                            <span
                              className={
                                transferType == 0 ? "activeTransferType" : ""
                              }
                              style={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                padding: "5px 15px",
                              }}
                              onClick={() => setTransferType(0)}
                            >
                              {/* <GoFileDirectory
                                style={{ marginRight: "5px", fontSize: "18px" }}
                              /> */}
                              Direct
                            </span>
                            <span
                              className={
                                transferType == 1 ? "activeTransferType" : ""
                              }
                              style={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                padding: "5px 15px",
                              }}
                              onClick={() => setTransferType(1)}
                            >
                              {/* <CiLink
                                style={{ marginRight: "5px", fontSize: "18px" }}
                              /> */}
                              Link
                            </span>
                            <span
                              className={
                                transferType == 2 ? "activeTransferType" : ""
                              }
                              style={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                padding: "5px 15px",
                              }}
                              onClick={() => setTransferType(2)}
                            >
                              {/* <CiMail
                                style={{ marginRight: "5px", fontSize: "18px" }}
                              /> */}
                              E-mail
                            </span>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
                {linkReciever ? (
                  <>
                    <div className="uploadFileButtonContainer">
                      <button
                        className="btn btn-success uploadFileButton"
                        onClick={() => downloadZipFile(paramCode)}
                      >
                        Download Zip
                      </button>
                    </div>

                    <div style={{ marginTop: "10px" }}>
                      <p
                        className={`status opacity0 ${
                          creatingZipProgress > 0 ? "opacity1" : ""
                        }`}
                      >
                        {creatingZipProgress === 100
                          ? "Zip Created"
                          : "Creating Zip"}
                      </p>
                      <LinearProgress
                        variant="determinate"
                        color="info"
                        className={`progressBar ${
                          creatingZipProgress !== 0 ? "progressBarActive" : ""
                        }`}
                        value={creatingZipProgress}
                      />
                    </div>
                    <div style={{ marginTop: "7px" }}>
                      <p
                        className={`status opacity0 
                          ${downloadProgess > 0 ? "opacity1" : ""}
                          `}
                      >
                        {downloadProgess == 100 ? "Downloaded" : "Downloading"}
                      </p>
                      <LinearProgress
                        variant="determinate"
                        className={`progressBar ${
                          downloadProgess !== 0 ? "progressBarActive" : ""
                        }`}
                        value={downloadProgess}
                      />
                    </div>
                  </>
                ) : (
                  <>
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
                        disabled={code || uploadSizeLimit < uploadedFilesSize}
                      >
                        Send
                      </button>
                    </div>
                    <div
                      className="uploadAlertContainer"
                      style={{
                        height: "0px",
                        overflow: "hidden",
                        marginTop: "0px",
                        flexShrink: "0",
                        transition: "all 300ms",
                      }}
                    >
                      <div className="uploadAlertContainerInner">
                        <p
                          style={{
                            fontSize: "12px",
                            color: "#E74C3C",
                            textAlign: "center",
                          }}
                        >
                          Upload File Size limit {uploadSizeLimit}MB exceeded{" "}
                          <br />
                          uploaded Size {uploadedFilesSize}MB
                        </p>
                      </div>
                    </div>
                  </>
                )}
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
                      onClick={downloadZipFile}
                    >
                      Download
                    </button>
                  </div>
                  <div className="statusContainerAnimated">
                    <div className={`statusContainer`}>
                      <div>
                        <p
                          className={`status opacity0 ${
                            creatingZipProgress > 0 ? "opacity1" : ""
                          }`}
                        >
                          {creatingZipProgress === 100
                            ? "Zip Created"
                            : "Creating Zip"}
                        </p>
                        <LinearProgress
                          variant="determinate"
                          color="info"
                          className={`progressBar ${
                            creatingZipProgress !== 0 ? "progressBarActive" : ""
                          }`}
                          value={creatingZipProgress}
                        />
                      </div>
                      <div>
                        <p
                          className={`status opacity0 
                          ${downloadProgess > 0 ? "opacity1" : ""}
                          `}
                        >
                          {downloadProgess == 100
                            ? "Downloaded"
                            : "Downloading"}
                        </p>
                        <LinearProgress
                          variant="determinate"
                          color="success"
                          className={`progressBar ${
                            downloadProgess !== 0 ? "progressBarActive" : ""
                          }`}
                          value={downloadProgess}
                        />
                      </div>
                    </div>
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
            <div className={`uploadedFiles ${code ? "fileCode" : ""}`}>
              {code ? (
                <>
                  <h5>Code</h5>
                  <h1>{code}</h1>
                  <p>
                    Expires at{" "}
                    <span style={{ color: "#E74C3C" }}>{expiryTime}</span>
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
                        className={`specificTransferType
                          ${transferType == 0 ? "activeTransferType" : ""}
                        `}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setTransferType(0);
                        }}
                      >
                        <GoFileDirectory
                          style={{ marginRight: "5px", fontSize: "18px" }}
                        />
                        Direct
                      </span>
                      <span
                        className={
                          transferType == 1 ? "activeTransferType" : ""
                        }
                        style={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setTransferType(1);
                        }}
                      >
                        <CiLink
                          style={{ marginRight: "5px", fontSize: "18px" }}
                        />
                        Link
                      </span>
                      <span
                        className={
                          transferType == 2 ? "activeTransferType" : ""
                        }
                        style={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setTransferType(2);
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
            <div
              className="uploadAlertContainer"
              style={{
                height: "0px",
                overflow: "hidden",
                marginTop: "0px",
                flexShrink: "0",
                transition: "all 300ms",
              }}
            >
              <div className="uploadAlertContainerInner">
                <p
                  style={{
                    fontSize: "12px",
                    color: "#E74C3C",
                    textAlign: "center",
                    marginTop: "5px",
                  }}
                >
                  Upload File Size limit {uploadSizeLimit}MB exceeded <br />
                  uploaded Size {uploadedFilesSize}MB
                </p>
              </div>
            </div>
            <LinearProgress
              variant="determinate"
              className={`progressBar ${
                uploadingStatus ? "progressBarActive" : ""
              }`}
              value={progress}
            />
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
                  onClick={downloadZipFile}
                >
                  Download
                </button>
              </div>
            </div>
            <div className="statusContainerAnimated">
              <div className={`statusContainer`} style={{ paddingTop: "25px" }}>
                <div>
                  <p
                    className={`status opacity0 ${
                      creatingZipProgress > 0 ? "opacity1" : ""
                    }`}
                  >
                    {creatingZipProgress === 100
                      ? "Zip Created"
                      : "Creating Zip"}
                  </p>
                  <LinearProgress
                    variant="determinate"
                    color="info"
                    className={`progressBar ${
                      creatingZipProgress !== 0 ? "progressBarActive" : ""
                    }`}
                    value={creatingZipProgress}
                  />
                </div>
                <div>
                  <p
                    className={`status opacity0 
                          ${downloadProgess > 0 ? "opacity1" : ""}
                          `}
                  >
                    {downloadProgess == 100 ? "Downloaded" : "Downloading"}
                  </p>
                  <LinearProgress
                    variant="determinate"
                    color="success"
                    className={`progressBar ${
                      downloadProgess !== 0 ? "progressBarActive" : ""
                    }`}
                    value={downloadProgess}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Upload;
