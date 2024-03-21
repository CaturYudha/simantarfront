import React, { useState } from 'react';
import "./Tambahbarang.css";
import { Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faEdit, faTrashAlt, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import avatar from "../assets/images.png";
import Slidebar from '../component/Slidebar';

function InputBarang() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
};
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
    <div>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <Slidebar />
      </div>
            <div className={`main ${isSidebarOpen ? 'shifted' : ''}`}>
                <div class="topbar">
                    <div class="toggle" onClick={toggleSidebar} >
                        <FontAwesomeIcon icon={faBars} /> 
                    </div>
                    <div class="search">
                        <label>
                            <input type="text" placeholder="Search here" />
                            <FontAwesomeIcon className="icon" icon={faSearch} /> 
                        </label>
                    </div>
                    <div class="user">
                        <img src={avatar} alt="" />
                    </div>
                </div>
          <div className="co-input">
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

            <button className="butn" onClick={submitData}>
              Submit
            </button>
            {/* <Button className="btn" variant="primary" onClick={submitData}>Submit</Button> */}
          </div>
          </div>
    </div>
  );
}

export default InputBarang;
