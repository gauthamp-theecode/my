import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getLoginUsers();
  }, []);

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const clearErrorMessage = () => {
    setTimeout(() => {
      setErrorMessage('');
    }, 3000); // Clears the error message after 3s
  }

  const generateOTP = () => {
    // Generate and log OTP logic here
    const otp = Math.floor(100000 + Math.random() * 9000);
    return otp;
  }

  const handleForgotPassword = () => {
    // Handle forgot password logic here
    if (!email) {
      setErrorMessage('Enter email to generate OTP');
      clearErrorMessage();
      return;
    }
    setErrorMessage('Please check the console for OTP');
    console.log("Forgot Password - OTP generated for the emailID:", generateOTP());
  };

  async function getLoginUsers() {
    try {
      let resp = await fetch(
        "https://645e23db12e0a87ac0e89064.mockapi.io/users",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      let data = await resp.json();
      setResult(data);
      // console.log(data);
    } catch (error) {
      console.error("Error retrieving login users:", error);
    }
  }

  async function login() {
    if (email && password) {
      let flag = false;
      console.warn(email, password);
      let item = { email: email, password: password };
      for (let i = 0; i < result?.length; i++) {
        if (email === result[i]?.email && password === result[i]?.password) {
          flag = true;
          break;
        }
      }
      console.warn("result", result);
      if (flag === true) {
        navigate("/home");
      } else {
        console.warn("invalid credentials");
        setErrorMessage("Invalid login credentials");
        return;
      }

      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    } else {
      setErrorMessage("Enter login credentials");
      clearErrorMessage();
    }
  }

  return (
    <div>
      <h1>
        <center>Login Page</center>
      </h1>
      <div className="col-sm-6 offset-sm-3">
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="col-sm-6 offset-sm-3">
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="col-sm-6 offset-sm-3">
        <button onClick={login} className="login">
          Login
        </button>
      </div>
      <div className="col-sm-6 offset-sm-3">
        <button onClick={handleRegisterClick} className="login">
          New register
        </button>
      </div>
      <div className="fp-enclose">
        <button onClick={handleForgotPassword} className='login fp'>Forgot Password</button>

      </div>
      {errorMessage && (
        <div className="col-sm-6 offset-sm-3">
          <p className="error-message">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

export default Login;
