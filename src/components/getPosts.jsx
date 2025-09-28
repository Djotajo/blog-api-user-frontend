import { useEffect, useState } from "react";
import FormatPostDate from "./formatPostDate.jsx";
import { Link } from "react-router-dom";
import { useApiUrl } from "../context/ApiUrlContext";

function GetPosts() {
  const [posts, setPosts] = useState([]);
  const apiUrl = useApiUrl();

  useEffect(() => {
    async function fetchPostData() {
      const response = await fetch(`${apiUrl}/posts`);

      const responseJson = await response.json();
      setPosts(responseJson);
    }

    fetchPostData();
  }, []);

  return (
    <>
      <div className="posts-container">
        <div className="posts-header">
          <h2>All Articles</h2>
        </div>
        <div className="posts-content">
          <ul>
            {posts.map((post) => (
              <li key={post.id} className="posts-list-item">
                {" "}
                <article className="post">
                  <img
                    src="/og-logo-2bdf3a30.png"
                    alt=""
                    className="post-image"
                  />
                  <div className="post-content">
                    <h3>
                      <Link to={`/posts/${post.id}`}>{post.title}</Link>
                    </h3>{" "}
                    <p className="post-text">{post.text}</p>
                    <div className="post-footer">
                      {" "}
                      <span>
                        {post.author.username} on{" "}
                        {FormatPostDate(post.createdAt)}
                      </span>
                      <span className="post-comment">
                        <i className="material-icons">comment</i>{" "}
                        {post.Comment.length}
                      </span>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default GetPosts;
