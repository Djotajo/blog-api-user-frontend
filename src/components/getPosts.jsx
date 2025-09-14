import { useEffect, useState } from "react";
import FormatPostDate from "./formatPostDate.jsx";
import { Link } from "react-router-dom";

function GetPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPostData() {
      const response = await fetch(`http://localhost:3000/posts/`);
      const responseJson = await response.json();
      // setAuthorData(responseJson);
      setPosts(responseJson);
    }

    fetchPostData();
  }, []);

  return (
    <>
      <div className="posts">
        <h1>Posts</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="posts-list-item">
              {" "}
              <article className="post">
                <h3>
                  <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </h3>{" "}
                <p className="post-text">{post.text}</p>
                <div className="post-footer">
                  {" "}
                  <span>
                    {/* {authorData.username}  */}
                    on {FormatPostDate(post.createdAt)}
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
