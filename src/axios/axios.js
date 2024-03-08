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
  responseType: 'blob',
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export { uploadFile, downloadFile };
