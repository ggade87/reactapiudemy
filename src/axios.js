import axios from "axios";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

instance.defaults.headers.common["Authorization"] = "AUTH TOKEN";
instance.defaults.headers.post["Content-Type"] = "application/json";

instance.interceptors.request.use(
  (request) => {
    console.log(request);
    //We can edit request before we send add header
    return request;
  },
  (error) => {
    console.log("Global Error" + error);
    return Promise.reject(error);
  }
);
export default instance;
