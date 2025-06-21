import { useEffect, useState } from "react";

function GetPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPostData() {
      const response = await fetch(`http://localhost:3000/posts/`);
      const responseJson = await response.json();
      console.log(response);
      console.log(responseJson);
      setPosts(responseJson);
    }

    fetchPostData();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {" "}
            {/* Assuming 'id' is a unique identifier for each post */}
            <h2>{post.title}</h2>
            <p>{post.text}</p>
            {/* Display other post details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GetPosts;
