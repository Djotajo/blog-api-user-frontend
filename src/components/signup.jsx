import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessages, setErrorMessages] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
      confirmPassword,
    };

    try {
      if (password !== confirmPassword) {
        setErrorMessages(["Passwords do not match"]);
        return;
      }
      const apiEndpoint = `http://localhost:3000/signup`;

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const err = await response.json();
        if (err.errors && Array.isArray(err.errors)) {
          setErrorMessages(err.errors.map((e) => e.msg));
        } else {
          setErrorMessages([err.message || "Failed to create account"]);
        }
        setSuccessMessage("");
        return;
      }

      const newUser = await response.json();
      console.log("Profile created successfully:", newUser);

      setSuccessMessage("✅ Account created successfully! Redirecting...");
      setErrorMessages("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Error creating profile:", error);
      setErrorMessages(error.message || "Something went wrong");
      setSuccessMessage("");
    }
  };

  return (
    <div className="login-fullscreen">
      <form onSubmit={handleSubmit} className="new-member-form">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <ul className="password-requirements">
          <li>8 characters minimum</li>
          <li>1 lowercase letter</li>
          <li>1 uppercase letter</li>
          <li>1 number</li>
          <li>1 symbol</li>
        </ul>

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm password"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="submit">Submit</button>

        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        {errorMessages.length > 0 && (
          <ul className="signup-errors">
            {errorMessages.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        )}
      </form>
      <a href="./login">Already have an account? Sign in here</a>
    </div>
  );
}

export default SignUp;
