import { useEffect, useState } from "react";

function GetPost(postId) {
  //   const [authorData, setAuthorData] = useState(null);
  const [post, setPost] = useState(null);

  useEffect((postId) => {
    async function fetchPostData() {
      const response = await fetch(`http://localhost:3000/posts/${postId}`);
      const responseJson = await response.json();
      console.log(response);
      console.log(responseJson);
      //   setAuthorData(responseJson);
      setPost(responseJson);
    }

    fetchPostData();
  }, []);

  return (
    <div className="post">
      <h1>{post.title}</h1>
      <p>{post.text}</p>
      <p>{/* {authorData.username} on {FormatPostDate(post.createdAt)} */}</p>
      <p>Comments: {post.Comment.length}</p>
    </div>
  );
}

export default GetPost;
