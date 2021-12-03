import "./App.css"
import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserContext } from "./contexts/User"
import Title from "./components/Title"
import Nav from "./components/Nav"
import Home from "./components/Home"
import Articles from "./components/Articles"
import SingleArticle from "./components/SingleArticle"
import Users from "./components/Users"
import CreateUser from "./components/CreateUser"
import CreatePost from "./components/CreatePost"
import EditUser from "./components/EditUser"
import PageNotFound from "./components/PageNotFound"

const App = () => {
  const [currUser, setCurrUser] = useState()
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setCurrUser(foundUser);
    }
  }, []);
  return (
    <BrowserRouter>
    <UserContext.Provider value={{currUser, setCurrUser}}>
    <div className="App">
    <Title />
    <Nav />
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/articles" element={<Articles/>}/>
    <Route path="/articles/:article_id" element={<SingleArticle/>}/>
    <Route path="/users" element={<Users/>}/>
    <Route path="/edit_user" element={<EditUser/>}/>
    <Route path="/create_user" element={<CreateUser/>}/>
    <Route path="/create_post" element={<CreatePost/>}/>
    <Route path="*" element={<PageNotFound/>}/>
    </Routes>
    </div>
    </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
