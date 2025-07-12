import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormatPostDate from "./formatPostDate";

function GetPost() {
  const [authorData, setAuthorData] = useState(null);
  const [post, setPost] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    async function fetchPostData() {
      const response = await fetch(`http://localhost:3000/posts/${postId}`);
      const responseJson = await response.json();
      console.log(response);
      console.log(responseJson);
      setAuthorData(responseJson.author);
      setPost(responseJson);
    }

    fetchPostData();
  }, [postId]);

  if (!post) {
    // You could differentiate between initial loading and not found here if needed
    // For simplicity, we'll just show a generic message.
    return <div className="post">Loading or Post not found...</div>;
  }

  return (
    <div className="post">
      <h1>{post.title}</h1>
      <p>{post.text}</p>
      <p>
        {authorData.username} on {FormatPostDate(post.createdAt)}
      </p>
      <p>Comments: {post.Comment.length}</p>
    </div>
  );
}

export default GetPost;
