import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import avatar from "../assets/images.png";
import Slidebar from '../component/Slidebar';
import "./pengaturan.css";

function Pengaturan() {
  const [akun, setAkun] = useState({
    username: "pengguna123",
    email: "pengguna123@example.com",
    password: "password123",
    newPassword: "",
    confirmPassword: "",
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAkun({ ...akun, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (akun.newPassword !== akun.confirmPassword) {
      alert("Password baru dan konfirmasi password tidak cocok");
      return;
    }
    console.log("Data akun yang akan disimpan:", akun);
    setAkun({
      ...akun,
      newPassword: "",
      confirmPassword: "",
    });
    alert("Perubahan berhasil disimpan");
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <Slidebar />
      <div className={`main ${isSidebarOpen ? 'shifted' : ''}`}>
        <div className="topbar">
          <div className="toggle" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </div>
          <div className="search">
            <label>
              <input type="text" placeholder="Search here" />
              <FontAwesomeIcon className="icon" icon={faSearch} />
            </label>
          </div>
          <div className="user">
            <img src={avatar} alt="" />
          </div>
        </div>
        <div>
          <h2>Pengaturan Akun</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={akun.username}
                onChange={handleChange}
                disabled
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={akun.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Password Lama:</label>
              <input
                type="password"
                name="password"
                value={akun.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Password Baru:</label>
              <input
                type="password"
                name="newPassword"
                value={akun.newPassword}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Konfirmasi Password Baru:</label>
              <input
                type="password"
                name="confirmPassword"
                value={akun.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Simpan Perubahan</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Pengaturan;
