import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormatPostDate from "./formatPostDate";

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username: username,
      password: password,
    };

    try {
      const apiEndpoint = `http://localhost:3000/login`;

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to get user");
      }

      // 4. Get the response from the API (e.g., the new comment object)
      const newComment = await response.json();
      console.log("Comment added successfully:", newComment);

      //   setComment("");
      // Call a function from props to add the new comment to the list
      //   if (onCommentSubmitted) {
      //     onCommentSubmitted(newComment);
      //   }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };
  //   const [authorData, setAuthorData] = useState(null);
  //   const [post, setPost] = useState(null);
  //   const { postId } = useParams();

  //   useEffect(() => {
  //     async function fetchPostData() {
  //       const response = await fetch(`http://localhost:3000/posts/${postId}`);
  //       const responseJson = await response.json();
  //       console.log(response);
  //       console.log(responseJson);
  //       setAuthorData(responseJson.author);
  //       setPost(responseJson);
  //     }

  //     fetchPostData();
  //   }, [postId]);

  //   if (!post) {
  //     return <div className="post">Loading or Post not found...</div>;
  //   }

  return (
    <>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          placeholder="username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
      </form>
      <a href="/signup">No Account? Sign Up</a>
    </>
  );
}

export default LogIn;
