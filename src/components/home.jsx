import { useAuth } from "../context/AuthContext";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./login";
// import GetStats from "./getStats";
// import GetLastPost from "./getLastPost";
import GetLatestPost from "./getLatestPosts";

function Home() {
  const { currentUser, loadingInitial } = useAuth();

  return (
    // <div className="home-div">
    <>
      {/* {!currentUser && <Login />}
      {currentUser &&
        currentUser.isAuthenticated &&
        currentUser.role === "author" && ( */}

      <div className="hero">
        <div className="hero-left"></div>
        <div className="hero-right">
          <h2>Just another random blog for TOP</h2>
        </div>
      </div>
      <div className="dashboard">
        {/* <Link to="/dashboard/posts" className="dashboard-item">
          <img src="/public/see-posts.png" alt="View all posts" />
        </Link>
        <Link to={`/dashboard/drafts`} className="dashboard-item">
          <img src="/public/see-drafts.png" alt="View all drafts" />
        </Link>
        <Link to="/dashboard/newPost" className="dashboard-item">
          <img src="/public/add-post.png" alt="View all posts" />
        </Link> */}
        <GetLatestPost />

        {/* <Link to="/posts" className="dashboard-item">
              <img src="/public/see-posts.png" alt="View all posts" />
            </Link>
            <Link to="/posts" className="dashboard-item">
              <img src="/public/see-posts.png" alt="View all posts" />
            </Link> */}
        {/* <GetStats /> */}
      </div>
      {/* )} */}
    </>
    // </div>
  );
}

export default Home;
