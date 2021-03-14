import axios from "axios";

const api = axios.create({
  baseURL: "https://moveit-dms.vercel.app/", // "http://localhost:3000",
});

export default api;
