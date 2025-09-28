import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useApiUrl } from "../context/ApiUrlContext";

function EditComment({ commentObject }, key) {
  const [comment, setComment] = useState(commentObject.text);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { currentUser, loadingInitial } = useAuth();
  const { postId } = useParams();
  const commentId = commentObject.id;
  const token = localStorage.getItem("jwt_token");
  const apiUrl = useApiUrl();

  const navigate = useNavigate();

  if (loadingInitial) {
    return <p>Loading user information...</p>;
  }

  if (!currentUser || !currentUser.isAuthenticated) {
    return <p>You are not logged in.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentData = {
      id: commentId,
      text: comment,
      userId: currentUser.id,
      parentId: postId,
    };

    try {
      const apiEndpoint = `${apiUrl}/posts/${postId}/comments/${commentId}`;

      const response = await fetch(apiEndpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        throw new Error("Failed to edit comment");
      }

      setIsEditing(false);
      setComment("");
      navigate(0);
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  if (!isEditing) {
    return (
      <button className="edit-btn" onClick={() => setIsEditing(true)}>
        Edit
      </button>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="edit-comment-form">
        <label htmlFor="comment">Edit Comment: </label>
        <textarea
          id="comment"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          autoFocus
          aria-required="true"
          rows="4"
        ></textarea>
        <div className="edit-comment-buttons">
          <button type="submit" className="submit-btn">
            Submit
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="cancel-btn"
            type="button"
          >
            Cancel
          </button>
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </>
  );
}

export default EditComment;
