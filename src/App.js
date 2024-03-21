import React from "react";
import "./App.css";


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Dashboard from "./Data Peminjaman/Data Peminjaman";
import Dashboard from "./page/admin/dashboard";
import Login from "./login/login";
import InputBarang from "./Data Peminjaman/Tambahbarang";
import DataPengguna from "./page/admin/datapengguna";
import DataJurusan from "./page/admin/datajurusan";
import DataRuangan from "./page/admin/dataruangan";
import DataBarang from "./page/admin/databarang";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/datapengguna" element={<DataPengguna />} />
          <Route path="/datajurusan" element={<DataJurusan />} />
          <Route path="/dataruangan" element={<DataRuangan/>} />
          <Route path="/databarang" element={<DataBarang/>} />
          <Route path="/Inputbarang" element={<InputBarang />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
