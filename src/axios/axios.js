import axios from "axios";

const url = "http://localhost:8080";

const uploadFile = axios.create({
  baseURL: url + "/files/uploadFiles",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const downloadFile = axios.create({
  baseURL: url + "/files/download",
  responseType: "blob",
  headers: {
    "Content-Type": "multipart/form-data",
  },
  onDownloadProgress: (progressEvent) => {
    let progress = Math.round(
      (progressEvent.loaded / progressEvent.total) * 100
    );
    console.log(`Download progress: ${progress}%`);
  },
});

const recieveFilesNames = axios.create({
  baseURL: url + "/files/recieveFileNames",
});

const getSingleFile = axios.create({
  baseURL: url + "/files/downloadSingleFile",
  responseType: "blob",
  headers: {
    "Content-Type": "multipart/form-data",
  },
  onDownloadProgress: (progressEvent) => {
    let progress = Math.round(
      (progressEvent.loaded / progressEvent.total) * 100
    );
    console.log(`Download progress: ${progress}%`);
  },
});

export { uploadFile, downloadFile, recieveFilesNames, getSingleFile };
