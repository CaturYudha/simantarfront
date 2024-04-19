import React, { useState } from "react";
import axios from "axios"; // Import Axios
import "./peminjaman.css"; // Import file CSS terpisah

const FormPeminjaman = () => {
  const [barangPopupOpen, setBarangPopupOpen] = useState(false);
  const [barangDipinjam, setBarangDipinjam] = useState([]);
  const [namaPeminjam, setNamaPeminjam] = useState("");
  const [waktuPeminjaman, setWaktuPeminjaman] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [daftarPeminjaman, setDaftarPeminjaman] = useState([]);

  const daftarBarang = ["Barang 1", "Barang 2", "Barang 3"];

  const toggleBarangPopup = () => {
    setBarangPopupOpen(!barangPopupOpen);
  };

  const tambahBarangDipinjam = (namaBarang) => {
    if (barangDipinjam.length < 2) {
      setBarangDipinjam([...barangDipinjam, namaBarang]);
    } else {
      alert("Maksimal 2 barang yang dapat dipinjam.");
    }
  };

  const handleSubmit = () => {
    if (!namaPeminjam || !waktuPeminjaman || !deskripsi || !jumlah || barangDipinjam.length === 0) {
      alert("Mohon lengkapi semua field sebelum mengajukan peminjaman.");
      return;
    }

    const peminjaman = {
      namaPeminjam,
      barangDipinjam,
      waktuPeminjaman,
      deskripsi,
      jumlah,
    };

    axios.post("http://127.0.0.1:8000/api/peminjamans", peminjaman)
      .then(response => {
        console.log("Peminjaman berhasil ditambahkan:", response.data);
        // Lakukan sesuatu setelah berhasil ditambahkan, misalnya reset form
        setDaftarPeminjaman([...daftarPeminjaman, peminjaman]); // Tambahkan peminjaman ke daftar peminjaman setelah berhasil ditambahkan
        setNamaPeminjam("");
        setBarangDipinjam([]);
        setWaktuPeminjaman("");
        setDeskripsi("");
        setJumlah("");
      })
      .catch(error => {
        console.error("Gagal menambahkan peminjaman:", error);
        alert("Gagal menambahkan peminjaman. Silakan coba lagi.");
      });
  };

  return (
    <div className="form-container">
      <h2>Form Peminjaman</h2>
      <form>
        <div className="form-group">
          <label htmlFor="namaPeminjam">Nama Peminjam</label>
          <input
            type="text"
            id="namaPeminjam"
            value={namaPeminjam}
            onChange={(e) => setNamaPeminjam(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Barang yang Dipinjam</label>
          <input type="text" value={barangDipinjam.join(", ")} readOnly />
          <button type="button" onClick={toggleBarangPopup}>
            Pilih Barang
          </button>
          {barangPopupOpen && (
            <div className="popup">
              <p>Daftar Barang:</p>
              <ul>
                {daftarBarang.map((barang, index) => (
                  <li key={index} onClick={() => tambahBarangDipinjam(barang)}>
                    {barang}
                  </li>
                ))}
              </ul>
              <button onClick={toggleBarangPopup}>Tutup</button>
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="waktuPeminjaman">Date/Waktu Peminjaman</label>
          <input
            type="datetime-local"
            id="waktuPeminjaman"
            value={waktuPeminjaman}
            onChange={(e) => setWaktuPeminjaman(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="jumlah">Jumlah</label>
          <input
            type="number"
            id="jumlah"
            value={jumlah}
            onChange={(e) => setJumlah(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Deskripsi</label>
          <textarea
            value={deskripsi}
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            onChange={(e) => setDeskripsi(e.target.value)}
          ></textarea>
        </div>

        <button type="button" onClick={handleSubmit}>
          Tambah Peminjaman
        </button>
      </form>
      <div>
        <h3>Daftar Peminjaman</h3>
        <table>
          <thead>
            <tr>
              <th>Nama Peminjam</th>
              <th>Barang Dipinjam</th>
              <th>Waktu Peminjaman</th>
              <th>Jumlah</th>
              <th>Deskripsi</th>
            </tr>
          </thead>
          <tbody>
            {daftarPeminjaman.map((peminjaman, index) => (
              <tr key={index}>
                <td>{peminjaman.namaPeminjam}</td>
                <td>{peminjaman.barangDipinjam.join(", ")}</td>
                <td>{peminjaman.waktuPeminjaman}</td>
                <td>{peminjaman.jumlah}</td>
                <td>{peminjaman.deskripsi}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {daftarPeminjaman.length > 0 && (
          <button
            type="button"
            onClick={() => alert("Semua peminjaman diajukan!")}
          >
            Ajukan Semua Peminjaman
          </button>
        )}
      </div>
    </div>
  );
};

export default FormPeminjaman;
