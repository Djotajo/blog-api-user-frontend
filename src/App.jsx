import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

import { useState } from "react";

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
    return null;
  }

  if (currentUser && currentUser.isAuthenticated) {
    return (
      <>
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
      </>
    );
  } else {
    return <Link to="/login">Log In</Link>;
  }
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { currentUser, loadingInitial } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  if (loadingInitial) return null;

  return (
    <>
      <ScrollToTop />
      <nav>
        <h1>Random Blog Website</h1>
        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/posts" onClick={() => setIsOpen(false)}>
              All Articles
            </Link>
          </li>
          <li className="nav-item" onClick={() => setIsOpen(false)}>
            <AuthStatus />
          </li>
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
    </>
  );
}

export default App;
