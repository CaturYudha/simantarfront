import React from "react";
import "./Tambahbarang.css";

function InputBarang() {
  const submitData = () => {
    const nama = document.getElementById("nama").value;
    const kategori = document.getElementById("kategori").value;
    const jumlah = document.getElementById("jumlah").value;

    console.log("Nama Barang:", nama);
    console.log("Kategori:", kategori);
    console.log("Jumlah:", jumlah);

    // Di sini Anda dapat menambahkan logika untuk menyimpan data ke database atau melakukan tindakan lainnya sesuai kebutuhan
  };

  return (
    <div className="container">
      <h2>Input Data Barang</h2>
      <br />
      <div className="input-group">
        <label htmlFor="kodebarang">Kode Barang</label>
        <input type="int" id="kodebarang" placeholder="Masukkan kode barang" />
      </div>

      <div className="input-group">
        <label htmlFor="nama">Nama Barang</label>
        <input type="text" id="nama" placeholder="Masukkan nama barang" />
      </div>

      <div className="input-group">
        <label htmlFor="merkbarang">Merek Barang</label>
        <input
          type="merekbarang"
          id="merekbarang"
          placeholder="Masukkan merek barang"
        />
      </div>

      <div className="input-group">
        <label htmlFor="kategori">Kategori</label>
        <select id="kategori">
          <option value="elektronik">Elektronik</option>
          <option value="pakaian">Pakaian</option>
          <option value="makanan">Makanan</option>
          <option value="lainnya">Lainnya</option>
        </select>
      </div>

      <div className="input-group">
        <label htmlFor="tglpembelian">Tanggal pembelian</label>
        <input type="date" id="tglpembelian" placeholder="" />
      </div>

      <div className="input-group">
        <label htmlfor="harga">Harga</label>
        <input type="number" id="harga" placeholder="masukkan harga barang" />
      </div>

      <div className="input-group">
        <label htmlFor="ruangan">Letak Barang</label>
        <select id="ruangan">
          <option value="ruangan1">Ruangan 1</option>
          <option value="ruangan2">Ruangan 2</option>
          <option value="ruangan3">Ruangan 3</option>
          <option value="ruangan4">Lainnya</option>
        </select>
      </div>

      <div className="input-group">
        <label htmlFor="jumlah">Jumlah</label>
        <input type="number" id="jumlah" placeholder="Masukkan jumlah barang" />
      </div>

      <button className="btn" onClick={submitData}>
        Submit
      </button>
    </div>
  );
}

export default InputBarang;
