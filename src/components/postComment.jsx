import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useApiUrl } from "../context/ApiUrlContext";

function PostComment() {
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt_token");
  const apiUrl = useApiUrl();

  const { postId } = useParams();

  const { currentUser, loadingInitial } = useAuth();

  if (loadingInitial) {
    return <p>Loading user information...</p>;
  }

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
      const apiEndpoint = `${apiUrl}/posts/${postId}/comments`;

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        const errorData = await response.json();

        throw new Error(errorData.message || "Failed to add comment");
      }

      setComment("");
      navigate(0);
    } catch (error) {
      console.error("Error submitting comment:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="full-post-comment-form">
        <fieldset>
          <legend>Add a comment</legend>
          <div className="form-group">
            <textarea
              id="comment"
              name="comment"
              onChange={(e) => setComment(e.target.value)}
              required
              value={comment}
              aria-label="Comment"
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
