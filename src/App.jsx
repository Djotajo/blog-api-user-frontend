import { useState } from "react";
import "./App.css";
import GetPosts from "./components/getPosts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetPost from "./components/getPost";
import LogIn from "./components/login";
import SignUp from "./components/signup";

function App() {
  return (
    <>
      <nav>
        <h1>Random Blog Website</h1>
        <ul className="nav-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/items">Posts</a>
          </li>
          <li>
            <a href="/categories">About</a>
          </li>
          <li>
            <a href="/login">Log In</a>
          </li>
        </ul>
      </nav>
      <Router>
        <Routes>
          <Route path="/" element={<GetPosts />} />
          {/* This route will capture the post.id */}
          <Route path="/:postId" element={<GetPost />} />
          {/* You can add more routes as needed */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </Router>
      <footer>
        <p>Made by Djotajo</p>
      </footer>
    </>
  );
}

export default App;
