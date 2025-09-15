import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function DeleteComment({ commentObject }) {
  const commentId = commentObject.id;
  const { postId } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiEndpoint = `http://localhost:3000/posts/${postId}/comments/${commentId}`;

      const response = await fetch(apiEndpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }

      const deletedComment = await response.json();
      console.log("Comment delete successfully:", deletedComment);
      navigate(0);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="delete-comment-form">
      <button type="submit" className="delete-btn">
        Delete
      </button>
      {/* onClick={handleCancelSubmit} */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </form>
  );
}

export default DeleteComment;
