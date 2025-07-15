import { useState } from "react";
import { useParams } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";

function PostComment() {
  //   const commentId = uuidv4();
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { postId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentData = {
      text: comment,
      authorId: "prvi",
      parentId: postId,
      userId: null,
    };

    console.log(commentData);

    try {
      const apiEndpoint = `http://localhost:3000/posts/${postId}`;

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
      // Call a function from props to add the new comment to the list
      //   if (onCommentSubmitted) {
      //     onCommentSubmitted(newComment);
      //   }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };
  //   function handleCancelSubmit(event) {
  //     event.preventDefault();
  //     handleCancel();
  //   }

  //   function addNewItem(event) {
  //     event.preventDefault();

  //     if (skill.trim() !== "") {
  //       setErrorMessage("");
  //       const newItem = {
  //         id: skillId,
  //         skill: skill,
  //       };
  //       handleArrayChange(skillArray, setSkillArray, newItem);
  //       setAddNew(!addNew);
  //     } else {
  //       setErrorMessage("Please fill in all required fields.");
  //     }
  //   }

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
            {/* <input
              type="text"
              id="comment"
              name="comment"

            /> */}
          </div>
          <button type="submit">
            {/* onClick={addNewItem} */}
            Submit
          </button>
          <button>Cancel</button>
          {/* onClick={handleCancelSubmit} */}
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </fieldset>
      </form>
    </>
  );
}

export default PostComment;
