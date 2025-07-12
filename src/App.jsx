import { useState } from "react";
import "./App.css";
import GetPosts from "./components/getPosts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetPost from "./components/getPost";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetPosts />} />
        {/* This route will capture the post.id */}
        <Route path="/:postId" element={<GetPost />} />
        {/* You can add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
