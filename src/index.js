import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import axios from "axios";

//axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.interceptors.request.use(
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

//handle response

axios.interceptors.response.use(
  (response) => {
    console.log(response);
    //We can edit response before
    return response;
  },
  (error) => {
    console.log("Global Error" + error);
    return Promise.reject(error);
  }
);
ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
