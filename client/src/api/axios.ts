import axios from "axios";

const instance = axios.create({
  baseURL: "http://10.0.6.142:8080",
});

export default instance;
