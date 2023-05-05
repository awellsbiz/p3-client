import { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Register(props) {
  // state for the controlled form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
 

  const navigate = useNavigate();

  // submit event handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // post fortm data to the backend
      const reqBody = {
        name,
        email,
        password,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/users/register`,
        reqBody
      );

      // save the token in localstorage
      const { token } = response.data;
      localStorage.setItem("jwt", token);

      // decode the token
      const decoded = jwt_decode(token);

      // set the user in App's state to be the decoded token
      setCurrentUser(decoded);
    } catch (err) {
      console.warn(err);
      if (err.response) {
        setMsg(err.response.data.msg);
      }
    }
  };

  // conditionally render a navigate component
  if (currentUser) {
    navigate("/profile");
  }
  return (
    <div className="register-container">
      <h1 className="register-title">Register for your account today!</h1>

      <p>{msg}</p>

      <form className="register-inputs" onSubmit={handleSubmit}>
        <label htmlFor="name" className="label-name-register">
          Name:
        </label>
        <input
          type="text"
          id="name"
          placeholder="your username..."
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <label htmlFor="email" className="label-email-register">
          Email:
        </label>
        <input
          type="email"
          id="email"
          placeholder="your email..."
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label htmlFor="password" className="label-password-register">
          Password:
        </label>
        <input
          type="password"
          id="password"
          placeholder="password..."
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        
        <button type="submit" className="btn-register">
          Register
        </button>
      </form>
    </div>
  );
}
