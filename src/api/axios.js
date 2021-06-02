import axios from "axios";

const axiosCoatmasterFlex = axios.create({
  baseURL: "/local-server"
});

export default axiosCoatmasterFlex;
