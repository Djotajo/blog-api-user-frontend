import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormatPostDate from "./formatPostDate";

function SignUp() {
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
      <form method="POST" action="/signup" className="new-member-form">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="First name"
          required
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Last name"
          required
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
        />

        <label htmlFor="password">Password </label>
        <span>
          (at least 8 characters including 1 lowercase letter, 1 uppercase
          letter, 1 number, and 1 symbol)
        </span>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          required
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm password"
          required
        />

        <label htmlFor="isAdmin">
          is Admin?
          <input
            type="checkbox"
            name="isAdmin"
            id="isAdmin"
            placeholder=""
            required
          />
        </label>

        <button type="submit">Submit</button>
      </form>
      <a href="./login">Already have an account? Sign in here</a>
    </>
  );
}

export default SignUp;
