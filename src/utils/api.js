import axios from "axios";

const myApi = axios.create({
  baseURL: "https://nc-echo-chamber.herokuapp.com/api",
});
