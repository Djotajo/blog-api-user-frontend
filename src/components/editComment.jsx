import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function EditComment({ commentObject }, key) {
  const [comment, setComment] = useState(commentObject.text);
  const [isEditing, setIsEditing] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const { currentUser, loadingInitial } = useAuth(); // Also get loadingInitial to handle async state

  const { postId } = useParams();

  const commentId = commentObject.id;

  const navigate = useNavigate();

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
      id: commentId,
      text: comment,
      userId: currentUser.id,
      parentId: postId,
    };

    try {
      // provjeriti api endpoint
      const apiEndpoint = `http://localhost:3000/posts/${postId}/comments/${commentId}`;

      const response = await fetch(apiEndpoint, {
        // provjeriti metodu
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Tell the API we're sending JSON
        },
        body: JSON.stringify(commentData), // Convert your data to JSON string
      });

      if (!response.ok) {
        throw new Error("Failed to edit comment");
      }

      // 4. Get the response from the API (e.g., the new comment object)
      const editedComment = await response.json();
      console.log("Comment edited successfully:", editedComment);
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
      {/* {!isEditing && (
        <button onClick={() => setIsEditing(true)} className="edit-btn">
          Edit
        </button>
      )}
      {isEditing && ( */}
      <form onSubmit={handleSubmit} className="edit-comment-form">
        {/* <fieldset> */}
        {/* <legend>Edit comment</legend> */}

        {/* <div className="form-group"> */}
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
        {/* </div> */}
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
        {/* </fieldset> */}
      </form>
      {/* )} */}
    </>
  );
}

export default EditComment;
