import axios from "axios";
const instance = axios.create({
    // baseURL: "https://tripund-backend-dot-project-101-396902.el.r.appspot.com/api",
    baseURL: "http://localhost:5000/api",
    headers: {'Access-Control-Allow-Origin': '*'}
  });
  export default instance;