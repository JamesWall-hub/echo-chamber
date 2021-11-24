import axios from "axios";

const myApi = axios.create({
  baseURL: "https://nc-echo-chamber.herokuapp.com/api",
});

export const getPopularArticles = () => {
  return myApi.get("/articles?sort_by=votes&order=desc").then((res) => {
    return res.data.articles
  })
}

export const getAllArticles = (req) => {
  const params = {...req}
  return myApi.get("/articles", {params}).then((res) => {
    return res.data.articles
  })
}

export const getAllTopics = () => {
  return myApi.get("/topics").then((res) => {
    return res.data.topics
  })
}

export const getArticleById = (id) => {
  return myApi.get(`/articles/${id}`).then((res) => {
    return res.data.article
  })
}

export const getCommentsByArticle = (id, req) => {
  const params = {...req}
  return myApi.get(`/articles/${id}/comments`, {params}).then((res) => {
    return res.data.comments
  })
}