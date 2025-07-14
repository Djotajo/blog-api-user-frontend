import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormatPostDate from "./formatPostDate";
import PostComment from "./postComment";

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
    <>
      <div className="post">
        <h1>{post.title}</h1>
        <p>{post.text}</p>
        <p>
          {authorData.username} on {FormatPostDate(post.createdAt)}
        </p>
        <p>Comments: {post.Comment.length}</p>
      </div>
      <PostComment />
      <section id="comments-section" aria-labelledby="comments-heading">
        <h2 id="comments-heading">Comments</h2>
        {post.Comment.map((comment, index) => (
          <article key={comment.id || index} className="comment">
            <header>
              {/* Assuming comment object has author and timestamp */}
              <cite className="comment-author">
                {comment.commentByAuthor
                  ? comment.commentByAuthor.username
                  : "greska"}
                {/* comment.commentByUser.username} */}
              </cite>
              <time dateTime={comment.createdAt} className="comment-date">
                {/* Format date for display here */}
                {new Date(comment.createdAt).toLocaleDateString()}
              </time>
            </header>
            <p className="comment-content">{comment.text}</p>
            {/* Optionally, you might have nested comments (replies) here,
          which could also be <article> elements, possibly within an <ol> or <ul> if structured. */}
          </article>
        ))}
      </section>
    </>
  );
}

export default GetPost;
