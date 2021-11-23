import axios from "axios";

const myApi = axios.create({
  baseURL: "https://nc-echo-chamber.herokuapp.com/api",
});

export const getPopularArticles = () => {
  return myApi.get("/articles?sort_by=votes&order=desc").then((res) => {
    return res.data.articles
  })
}
