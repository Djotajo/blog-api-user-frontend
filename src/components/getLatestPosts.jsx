import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FormatPostDate from "./formatPostDate.jsx";

function GetLatestPost() {
  const [posts, setPosts] = useState([]);

  const publishedPosts = posts.filter((post) => post.published);
  const lastPost = [...publishedPosts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const stickyPosts = posts.filter((post) => post.sticky);

  useEffect(() => {
    async function fetchPostData() {
      const url = `http://localhost:3000/posts`;
      const response = await fetch(url);
      const responseJson = await response.json();
      setPosts(responseJson);
    }
    fetchPostData();
  }, []);

  return (
    <>
      {lastPost ? (
        <div className="latest-posts-container">
          <div className="latest-posts-header">
            <h2>Latest Articles</h2>
          </div>
          <div className="latest-posts-content">
            {lastPost.map((post) => (
              <li key={post.id} className="posts-list-item">
                {" "}
                <article className="post">
                  <h2>
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                  </h2>{" "}
                  <p className="post-text">{post.text}</p>
                  <div className="post-footer">
                    {" "}
                    <span>
                      {post.author.username} on {FormatPostDate(post.createdAt)}
                    </span>
                    <hr />
                    <span className="post-comment">
                      <i className="material-icons">comment</i>{" "}
                      {post.Comment.length}
                    </span>
                  </div>
                </article>
              </li>
            ))}{" "}
          </div>
        </div>
      ) : (
        <p>No published posts yet.</p>
      )}
      <div>
        {stickyPosts && (
          <div className="latest-posts-container">
            <div className="latest-posts-header">
              <h2>Top Articles</h2>
            </div>
            <div className="latest-posts-content">
              {stickyPosts.map((post) => (
                <li key={post.id} className="posts-list-item">
                  {" "}
                  <article className="post">
                    <h2>
                      <Link to={`/posts/${post.id}`}>{post.title}</Link>
                    </h2>{" "}
                    <p className="post-text">{post.text}</p>
                    <div className="post-footer">
                      {" "}
                      <span>
                        {post.author.username} on{" "}
                        {FormatPostDate(post.createdAt)}
                      </span>
                      <hr />
                      <span className="post-comment">
                        <i className="material-icons">comment</i>{" "}
                        {post.Comment.length}
                      </span>
                    </div>
                  </article>
                </li>
              ))}{" "}
            </div>
            <p>{stickyPosts.title}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default GetLatestPost;
