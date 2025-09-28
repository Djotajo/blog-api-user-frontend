import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import FormatPostDate from "./formatPostDate";
import PostComment from "./postComment";
import EditComment from "./editComment";
import DeleteComment from "./deleteComment";
import { useAuth } from "../context/AuthContext";
import { useApiUrl } from "../context/ApiUrlContext";

function GetPost() {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const { currentUser, loadingInitial } = useAuth();
  const apiUrl = useApiUrl();

  useEffect(() => {
    async function fetchPostData() {
      const response = await fetch(`${apiUrl}/posts/${postId}`);
      const responseJson = await response.json();
      setPost(responseJson);
    }

    fetchPostData();
  }, []);

  const paragraphs = useMemo(() => {
    return post?.text ? post.text.split("\n\n") : [];
  }, [post?.text]);

  if (!post) {
    return <div className="post">Loading or Post not found...</div>;
  }

  return (
    <>
      <div className="full-post">
        <section className="full-post-content">
          <h1>{post.title}</h1>
          <div>
            {paragraphs.map((p, index) => (
              <p key={index}>{p}</p>
            ))}
          </div>
          <p>
            {post.author.username} on {FormatPostDate(post.createdAt)}
          </p>

          <p>Comments: {post.Comment.length}</p>
        </section>

        <section className="full-post-comment-form">
          <PostComment />
        </section>
        <section
          className="full-post-comments-section"
          aria-labelledby="full-post-comments-heading"
        >
          <h2 id="full-post-comments-heading">Comments</h2>
          {post.Comment.map((comment, index) => (
            <article key={comment.id || index} className="full-post-comment">
              <header>
                <cite className="full-post-comment-author">
                  {comment.commentByAuthor
                    ? comment.commentByAuthor.username
                    : comment.commentByUser.username}{" "}
                </cite>
                on{" "}
                <time
                  dateTime={comment.createdAt}
                  className="full-post-comment-date"
                >
                  {new Date(comment.createdAt).toLocaleDateString()}
                </time>
              </header>
              <p className="full-post-comment-content">{comment.text}</p>
              {comment.commentByUser ? (
                currentUser && comment.commentByUser.id === currentUser.id ? (
                  <div className="comment-actions">
                    <EditComment commentObject={comment} />
                    <DeleteComment commentObject={comment} />
                  </div>
                ) : (
                  ``
                )
              ) : currentUser &&
                comment.commentByAuthor.id === currentUser.id ? (
                <EditComment commentObject={comment} />
              ) : (
                ""
              )}
            </article>
          ))}
        </section>
      </div>
    </>
  );
}

export default GetPost;
