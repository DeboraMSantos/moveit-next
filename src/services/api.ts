import axios from "axios";

const api = axios.create({
  baseURL: "https://moveit-dms.vercel.app",
});

export default api;
