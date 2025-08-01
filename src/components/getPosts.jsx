import { useEffect, useState } from "react";
import FormatPostDate from "./formatPostDate.jsx";
import { Link } from "react-router-dom";

function GetPosts() {
  const [authorData, setAuthorData] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPostData() {
      const response = await fetch(`http://localhost:3000/posts/`);
      const responseJson = await response.json();
      console.log(response);
      console.log(responseJson);
      setAuthorData(responseJson);
      setPosts(responseJson.Post);
    }

    fetchPostData();
  }, []);

  return (
    <>
      <div className="hero">
        <div className="hero-left">Text</div>
        <div className="hero-right">Image</div>
      </div>

      <div className="posts">
        <h1>Posts</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="posts-list-item">
              {" "}
              <article className="post">
                <h2>
                  <Link to={`/${post.id}`}>{post.title}</Link>
                </h2>{" "}
                <p className="post-text">{post.text}</p>
                <div className="post-footer">
                  {" "}
                  <span>
                    {authorData.username} on {FormatPostDate(post.createdAt)}
                  </span>
                  <span className="post-comment">
                    <i className="material-icons">comment</i>{" "}
                    {post.Comment.length}
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default GetPosts;
