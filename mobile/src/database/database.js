import axios from "axios";

const configDB = axios.create({
  baseURL: "http://192.168.1.8:8000",
});

export default configDB;
