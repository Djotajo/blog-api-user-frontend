import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function EditComment(commentObject) {
  const [comment, setComment] = useState(commentObject.text);
  const [errorMessage, setErrorMessage] = useState("");

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
    };

    try {
      // provjeriti api endpoint
      const apiEndpoint = `http://localhost:3000/posts/${postId}`;

      const response = await fetch(apiEndpoint, {
        // provjeriti metodu
        method: "POST",
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

      setComment("");
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="comment-form">
        <fieldset>
          <div>
            <label htmlFor="comment">Comment: </label>
            <textarea
              id="comment"
              name="comment"
              onChange={(e) => setComment(e.target.value)}
              required
              autoFocus
              aria-required="true"
            ></textarea>
          </div>
          <button type="submit">Submit</button>
          <button>Cancel</button>
          {/* onClick={handleCancelSubmit} */}
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </fieldset>
      </form>
    </>
  );
}

export default EditComment;
