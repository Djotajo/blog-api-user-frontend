import { useState } from "react";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";

import GetPosts from "./components/getPosts";

import { AuthProvider, useAuth } from "./context/AuthContext";
import GetPost from "./components/getPost";
import LogIn from "./components/login";
import SignUp from "./components/signup";
import Home from "./components/home";

function AuthStatus() {
  const { currentUser, logout, loadingInitial } = useAuth();

  if (loadingInitial) {
    return null; // Or <span>Loading session...</span>;
  }

  if (currentUser && currentUser.isAuthenticated) {
    return (
      <li className="nav-item">
        <p style={{ margin: 0, color: "white", display: "inline-block" }}>
          Welcome, <strong>{currentUser.username}</strong>!{" "}
        </p>
        <button
          onClick={logout}
          style={{
            marginLeft: "10px",
            padding: "5px 10px",
            cursor: "pointer",
            background: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Logout
        </button>
      </li>
    );
  } else {
    return <Link to="/login">Log In</Link>;
  }
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <nav>
          <h1>Random Blog Websites</h1>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/posts">All Articles</Link>
            </li>

            <AuthStatus />
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<GetPosts />} />

          <Route path="/posts/:postId" element={<GetPost />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>

        <footer>
          <p>Made by Djotajo</p>
        </footer>
      </Router>
    </AuthProvider>
  );
}

export default App;
