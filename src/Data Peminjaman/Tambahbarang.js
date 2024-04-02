import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Tambahbarang.css";
import { Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faEdit, faTrashAlt, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import avatar from "../assets/images.png";
import Slidebar from '../component/Slidebar';

function InputBarang() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [ruanganOptions, setRuanganOptions] = useState([]);
  const [errorMessages, setErrorMessages] = useState({});
  const [existingBarangCodes, setExistingBarangCodes] = useState([]);
  
  const [formData, setFormData] = useState({
    ruangan_id:'',
    user_id:'',
    kode_barang: '',
    nama_barang: '',
    spesifikasi: '',
    jenis_barang: '',
    pengadaan: '',
    keadaan_barang: '',
    kuantitas: '',
    keterangan_barang: ''
  });

  console.log("data ini:", formData)
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
};

useEffect(() => {
  // Ambil user_id dari session atau token autentikasi
  const user_id = localStorage.getItem('id');
  console.log("User ID:", user_id);
  setFormData({ ...formData, user_id });
  fetchRuanganOptions();
  fetchExistingBarangCodes();
}, []);

const fetchExistingBarangCodes = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/barangs');
    const barangData = response.data;
    const codes = barangData.map(barang => barang.kode_barang);
    setExistingBarangCodes(codes);
  } catch (error) {
    console.error("Error fetching existing barang codes:", error);
  }
};

  const fetchRuanganOptions = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/ruangans');
      const ruanganData = response.data;
      const options = ruanganData.map(ruangan => ({
        value: ruangan.id,
        label: ruangan.nama_ruangan
      }));
      setRuanganOptions(options);
    } catch (error) {
      console.error("Error fetching ruangan data:", error);
    }
  };

  const validateForm = () => {
    const errors = {};
  
    // Validasi kode barang harus diisi dan harus unik
    if (!formData.kode_barang.trim()) {
      errors.kode_barang = "Kode Barang harus diisi!*";
    } else if (existingBarangCodes.includes(formData.kode_barang)) {
      errors.kode_barang = "Kode Barang sudah digunakan!*";
    }
  
    if (!formData.nama_barang.trim()) {
      errors.nama_barang = "Nama Barang harus diisi!*";
    }

    // Validasi jenis barang harus dipilih
    if (!formData.jenis_barang.trim()) {
      errors.jenis_barang = "Jenis Barang harus dipilih!*";
    }
  
    // Validasi keadaan barang harus dipilih
    if (!formData.keadaan_barang.trim()) {
      errors.keadaan_barang = "Keadaan Barang harus dipilih!*";
    }

    if (!formData.kuantitas.trim()) {
      errors.kuantitas = "Kuantitas Barang harus diisi!*";
    }

    if (!formData.pengadaan.trim()) {
      errors.pengadaan = "Tanggal Pengadaan Barang harus diisi!*";
    }
  
    // Validasi lokasi barang harus dipilih
    if (!formData.ruangan_id) {
      errors.ruangan_id = "Letak Barang harus dipilih!*";
    }
  
    return errors;
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const submitData = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const dataToSend = {
          ...formData,
          ruangan_id: parseInt(formData.ruangan_id),
          user_id: parseInt(formData.user_id)
        };
        console.log("Data yang akan dikirim:", dataToSend);
        await axios.post('http://localhost:8000/api/barangs', dataToSend);
        console.log("Data berhasil disimpan!");
        alert("Data berhasil ditambahkan!");
        window.location.href = "/databarang";
      } catch (error) {
        console.error("Error saat menyimpan data:", error.response ? error.response.data : error.message);
      }
    } else {
      setErrorMessages(errors);
    }
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
              <input type="int" id="kodebarang" name="kode_barang" value={formData.kode_barang} onChange={handleInputChange} placeholder="Masukkan kode barang" />
              {errorMessages.kode_barang && <p style={{ color: 'red' }} className="error-message">{errorMessages.kode_barang}</p>}
            </div>

            <div className="input-group">
              <label htmlFor="nama">Nama Barang</label>
              <input type="text" id="nama" name="nama_barang" value={formData.nama_barang} onChange={handleInputChange} placeholder="Masukkan nama barang" />
              {errorMessages.nama_barang && <p style={{ color: 'red' }} className="error-message">{errorMessages.nama_barang}</p>}
            </div>

            <div className="input-group">
              <label htmlFor="spesifikasi">Spesifikasi</label>
              <input
                type="spesifikasi"
                id="spesifikasi"
                name="spesifikasi" value={formData.spesifikasi} onChange={handleInputChange}
                placeholder=""
              />
            </div>

            <div className="input-group">
              <label htmlFor="jenisbarang">Jenis Barang</label>
              <select id="jenisbarang" name="jenis_barang" value={formData.jenis_barang} onChange={handleInputChange}>
                <option value="">Pilih Jenis Barang</option>
                <option value="barang sekolah">Barang Sekolah</option>
                <option value="barang jurusan">Barang Jurusan</option>
              </select>
              {errorMessages.jenis_barang && <p style={{ color: 'red' }} className="error-message">{errorMessages.jenis_barang}</p>}
            </div>

            <div className="input-group">
              <label htmlFor="pengadaan">Pengadaan</label>
              <input type="date" id="pengadaan" name="pengadaan" value={formData.pengadaan} onChange={handleInputChange} placeholder="" />
              {errorMessages.pengadaan && <p style={{ color: 'red' }} className="error-message">{errorMessages.pengadaan}</p>}
            </div>

            {/* <div className="input-group">
              <label htmlfor="hargabarang">Harga Barang</label>
              <input type="number" id="hargabarang" placeholder="masukkan harga barang" />
            </div> */}

            <div className="input-group">
              <label htmlFor="keadaanbarang">Keadaan Barang</label>
              <select id="keadaanbarang" name="keadaan_barang" value={formData.keadaan_barang} onChange={handleInputChange}>
                <option value="">Pilih Keadaan Barang</option>
                <option value="baik">Baik</option>
                <option value="rusak ringan">Rusak Ringan</option>
                <option value="rusak sedang">Rusak Sedang</option>
                <option value="rusak berat">Rusak Berat</option>
              </select>
              {errorMessages.keadaan_barang && <p style={{ color: 'red' }} className="error-message">{errorMessages.keadaan_barang}</p>}
            </div>

            <div className="input-group">
              <label htmlFor="ruanganId">Letak Barang</label>
              <select id="ruanganId" name="ruangan_id" value={formData.ruangan_id} onChange={handleInputChange}>
              <option value="">Pilih Letak Barang</option>
              {ruanganOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
              </select>
              {errorMessages.ruangan_id && <p style={{ color: 'red' }} className="error-message">{errorMessages.ruangan_id}</p>}
            </div>

            <div className="input-group">
              <label htmlFor="kuantitas">Kuantitas</label>
              <input type="number" id="kuantitas" name="kuantitas" value={formData.kuantitas} onChange={handleInputChange} placeholder="Masukkan jumlah barang" />
              {errorMessages.kuantitas && <p style={{ color: 'red' }} className="error-message">{errorMessages.kuantitas}</p>}
            </div>

            <div className="input-group">
              <label htmlFor="keterangan">Keterangan Barang</label>
              <input type="text" id="keterangan" name="keterangan_barang" value={formData.keterangan_barang} onChange={handleInputChange} placeholder="Masukkan keterangan barang" />
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
