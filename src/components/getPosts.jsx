import { useEffect, useState } from "react";

function formatPostDate(dateString) {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "short", // e.g., "Jul"
    day: "numeric", // e.g., "2"
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

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
    <div className="posts">
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {" "}
            <div className="post">
              <h2>{post.title}</h2>
              <p>{post.text}</p>
              <p>
                {authorData.username} on {formatPostDate(post.createdAt)}
              </p>
              <p>Comments: {post.Comment.length}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GetPosts;
