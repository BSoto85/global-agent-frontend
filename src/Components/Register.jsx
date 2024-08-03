import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../helpers/firebase";
import { register } from "../helpers/register";
import "../CSS/Register.css";
// import SignInWithGoogle from "./SignInWithGoogle";

function Register() {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    dob: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.id]: e.target.value });
  };

  const handleClearState = () => {
    setNewUser({
      email: "",
      first_name: "",
      last_name: "",
      dob: "",
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = newUser;
      // createUser in firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // you need the JWT token to authenticate protected routes on the backend
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);

      const { uid, photoURL } = auth.currentUser;

      if (uid) {
        //register first
        const retrievedUser = await register({...newUser, photo: photoURL, uid});
        // no sign in the new user with signInWithEmailAndPassword
        if (retrievedUser.uid) {
          await signInWithEmailAndPassword(auth, email, password);

          handleClearState();
          toast.success("User Registered Successfully!!", {
            position: "top-center",
          });
          navigate("/");
        } else {
          // toast.error("User Not Found", {
          //   position: "top-center",
          // });
          navigate("/login");
        }
      }
    } catch (error) {
      console.log(error.message);

      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };
  return (
    <div className="form-container">
      <h3 className="form-title">Sign Up</h3>
      <p>
        Already registered{" "}
        <Link to="/login" className="register-link">
          Login
        </Link>
      </p>
      <form onSubmit={handleRegister}>
        <div className="input-container">
          <label htmlFor="first_name" className="label-header">
            First Name:{" "}
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="First name"
              value={newUser.first_name}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="last_name" className="label-header">
            Last Name:{" "}
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Last name"
              value={newUser.last_name}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="email" className="label-header">
            Email Address:{" "}
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={newUser.email}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="password" className="label-header">
            Password:{" "}
            <input
              type="password"
              placeholder="Enter password"
              id="password"
              name="password"
              value={newUser.password}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="dob" className="label-header">
            Birthday:{" "}
            <input
              type="date"
              id="dob"
              name="dob"
              value={newUser.dob}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" className="submit-play">
            Sign Up
          </button>
        </div>
      </form>
      {/* <SignInWithGoogle setUser={setUser} /> */}
    </div>
  );
}

export default Register;
