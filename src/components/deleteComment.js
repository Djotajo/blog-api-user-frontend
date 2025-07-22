async function deleteComment(commentObject) {
  const commentId = commentObject.id;

  try {
    // provjeriti api endpoint
    const apiEndpoint = `http://localhost:3000/posts/${postId}`;

    const response = await fetch(apiEndpoint, {
      // provjeriti metodu
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", // Tell the API we're sending JSON
      },
      body: JSON.stringify(commentId), // Convert your data to JSON string
    });

    if (!response.ok) {
      throw new Error("Failed to delete comment");
    }

    // 4. Get the response from the API (e.g., the new comment object)
    const editedComment = await response.json();
    console.log("Comment deleted successfully:", editedComment);
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
}

export default deleteComment;
