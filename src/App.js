import "./App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Title from "./components/Title"
import Nav from "./components/Nav"
import Home from "./components/Home"
import Articles from "./components/Articles"
import SingleArticle from "./components/SingleArticle"
import CreatePost from "./components/CreatePost"

const App = () => {
  return (
    <BrowserRouter>
    <div className="App">
    <Title />
    <Nav />
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/articles" element={<Articles/>}/>
    <Route path="/articles/:article_id" element={<SingleArticle/>}/>
    <Route path="/create_post" element={<CreatePost/>}/>
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
