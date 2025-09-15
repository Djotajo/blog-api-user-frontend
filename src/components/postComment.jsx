import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function PostComment() {
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { postId } = useParams();

  const { currentUser, loadingInitial } = useAuth(); // Also get loadingInitial to handle async state

  // Handle the initial loading state (checking token in localStorage)
  if (loadingInitial) {
    return <p>Loading user information...</p>;
  }

  // Check if there is a logged-in user
  if (!currentUser || !currentUser.isAuthenticated) {
    return <p>You are not logged in.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentData = {
      text: comment,
      userId: currentUser.id,
      parentId: postId,
    };

    try {
      const apiEndpoint = `http://localhost:3000/posts/${postId}/comments`;

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Tell the API we're sending JSON
        },
        body: JSON.stringify(commentData), // Convert your data to JSON string
      });

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      // 4. Get the response from the API (e.g., the new comment object)
      const newComment = await response.json();
      console.log("Comment added successfully:", newComment);

      setComment("");
      navigate(0);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="full-post-comment-form">
        <fieldset>
          <legend>Add a comment</legend>
          <div className="form-group">
            <label htmlFor="comment">Comment: </label>
            <textarea
              id="comment"
              name="comment"
              onChange={(e) => setComment(e.target.value)}
              required
              autoFocus
              value={comment}
              aria-required="true"
              rows="4"
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
          {errorMessage && <p className="error-msg">{errorMessage}</p>}
        </fieldset>
      </form>
    </>
  );
}

export default PostComment;
