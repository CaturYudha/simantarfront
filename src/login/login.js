import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import { Link } from "react-router-dom";

function Login() {
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = loginFormData;

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          username: username,
          password: password,
        }
      );

      console.log(response.data); // Tampilkan respons dari backend (opsional)

      alert("Login berhasil");
      // Redirect atau navigasi ke halaman lain jika diperlukan
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login gagal. Periksa kembali username dan password Anda");
    }
  };

  return (
    <div>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Login Form | Dan Aleko</title>
        <link rel="stylesheet" href="login.css" />
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="bodylogin">
        <div className="wrapper">
          <form onSubmit={handleLoginSubmit}>
            <h1 className="h1login">Login</h1>
            <div className="input-box">
              <input
                type="text" // Ubah tipe input menjadi text untuk username
                name="username" // Ubah name menjadi username
                placeholder="Username" // Ubah placeholder menjadi Username
                value={loginFormData.username}
                onChange={handleLoginChange}
              />
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginFormData.password}
                onChange={handleLoginChange}
              />
            </div>
            <div className="remember-forgot">
              <label>
                <input type="checkbox" />
                Remember Me
              </label>
              <a href="">Forgot Password</a>
            </div>
            <button type="submit" className="btn">
              Login
            </button>
            <div className="Dasboard"></div>
          </form>
        </div>
      </body>
    </div>
  );
}

export default Login;
