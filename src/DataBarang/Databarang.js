import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faEye, faEdit, faTrashAlt, faSearch, faPlus, faInfo, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import avatar from "../assets/images.png";
import Slidebar from '../component/Slidebar';
import { Link } from "react-router-dom";
import { Pagination } from 'react-bootstrap';

const Databarang = () => {
    const [barang, setBarang] = useState([
        // { id: 1, kodebarang: 'KB001', namabarang: 'Laptop', merekbarang: 'Asus', jenisbarang: 'Elektronik', tglpembelian: '2023-01-01', hargabarang: '7000000', letakbarang: 'Laboratorium Komputer', jumlahbarang: '5', deskripsi: 'Deskripsi barang Laptop', statusketersediaan: 'Tersedia', kondisibarang: 'Baik' },
        // { id: 2, kodebarang: 'KB002', namabarang: 'Meja', merekbarang: 'IKEA', jenisbarang: 'Furniture', tglpembelian: '2022-12-15', hargabarang: '1000000', letakbarang: 'Ruang Kuliah A101', jumlahbarang: '10', deskripsi: 'Deskripsi barang Meja', statusketersediaan: 'Terpakai', kondisibarang: 'Baik' },
        // { id: 3, kodebarang: 'KB003', namabarang: 'Proyektor', merekbarang: 'Epson', jenisbarang: 'Elektronik', tglpembelian: '2023-02-20', hargabarang: '5000000', letakbarang: 'Ruang Kuliah A101', jumlahbarang: '2', deskripsi: 'Deskripsi barang Proyektor', statusketersediaan: 'Tersedia', kondisibarang: 'Baik' },
        // { id: 4, kodebarang: 'KB001', namabarang: 'Laptop', merekbarang: 'Asus', jenisbarang: 'Elektronik', tglpembelian: '2023-01-01', hargabarang: '7000000', letakbarang: 'Laboratorium Komputer', jumlahbarang: '5', deskripsi: 'Deskripsi barang Laptop', statusketersediaan: 'Tersedia', kondisibarang: 'Baik' },
        // { id: 5, kodebarang: 'KB002', namabarang: 'Meja', merekbarang: 'IKEA', jenisbarang: 'Furniture', tglpembelian: '2022-12-15', hargabarang: '1000000', letakbarang: 'Ruang Kuliah A101', jumlahbarang: '10', deskripsi: 'Deskripsi barang Meja', statusketersediaan: 'Terpakai', kondisibarang: 'Baik' },
        // { id: 6, kodebarang: 'KB003', namabarang: 'Proyektor', merekbarang: 'Epson', jenisbarang: 'Elektronik', tglpembelian: '2023-02-20', hargabarang: '5000000', letakbarang: 'Ruang Kuliah A101', jumlahbarang: '2', deskripsi: 'Deskripsi barang Proyektor', statusketersediaan: 'Tersedia', kondisibarang: 'Baik' },
        // { id: 7, kodebarang: 'KB001', namabarang: 'Laptop', merekbarang: 'Asus', jenisbarang: 'Elektronik', tglpembelian: '2023-01-01', hargabarang: '7000000', letakbarang: 'Laboratorium Komputer', jumlahbarang: '5', deskripsi: 'Deskripsi barang Laptop', statusketersediaan: 'Tersedia', kondisibarang: 'Baik' },
        // { id: 8, kodebarang: 'KB002', namabarang: 'Meja', merekbarang: 'IKEA', jenisbarang: 'Furniture', tglpembelian: '2022-12-15', hargabarang: '1000000', letakbarang: 'Ruang Kuliah A101', jumlahbarang: '10', deskripsi: 'Deskripsi barang Meja', statusketersediaan: 'Terpakai', kondisibarang: 'Baik' },
        // { id: 9, kodebarang: 'KB003', namabarang: 'Proyektor', merekbarang: 'Epson', jenisbarang: 'Elektronik', tglpembelian: '2023-02-20', hargabarang: '5000000', letakbarang: 'Ruang Kuliah A101', jumlahbarang: '2', deskripsi: 'Deskripsi barang Proyektor', statusketersediaan: 'Tersedia', kondisibarang: 'Baik' },
    ]);
    const [errorMessages, setErrorMessages] = useState({});


    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(5); // Ubah sesuai kebutuhan Anda

    // Hitung indeks data awal dan akhir untuk halaman saat ini
    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;

    // Potong data sesuai dengan indeks data awal dan akhir
    const currentData = barang.slice(indexOfFirstData, indexOfLastData);

    // Hitung jumlah total halaman
    const totalPages = Math.ceil(barang.length / dataPerPage);

    // Fungsi untuk mengubah halaman
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [show, setShow] = useState(false);
    const [databarang, setDatabarang] = useState({
        id: '',
        kode_barang: '',
        nama_barang: '',
        spesifikasi: '',
        jenis_barang: '',
        pengadaan: '',
        letakbarang: '',
        kuantitas: '',
        keterangan_barang: '',
        keadaan_barang: ''
    });
    

    const [ruanganOptions, setRuanganOptions] = useState([
        // { id: 1, nama: 'Ruangan A' },
        // { id: 2, nama: 'Ruangan B' },
        // Tambahkan data ruangan lainnya sesuai kebutuhan
    ]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeModal = () => {
        window.location.reload();
        setShow(false);
    };

    const getRuanganIdByName = (ruanganName) => {
        const ruangan = ruanganOptions.find(ruangan => ruangan.nama_ruangan === ruanganName);
        return ruangan ? ruangan.id : null;
    };

    const showModal = (databarang) => {
        // Mencocokkan ruangan_id dengan data ruangan
        const ruangan = ruanganOptions.find(ruangan => ruangan.id === databarang.ruangan_id);
        
        // Jika data ruangan ditemukan, ambil nama ruangan, jika tidak, beri nilai default
        const letakbarang = ruangan ? ruangan.nama_ruangan : 'Tidak Diketahui';
    
        // Mengatur state data barang dengan letakbarang yang telah ditemukan
        setDatabarang({ ...databarang, letakbarang });
    
        // Menampilkan modal
        setShow(true);
    };

    const closeModalDelete = () => {
        setShowDelete(false);
    };

    const showModalDelete = (databarang) => {
        setDatabarang(databarang);
        setShowDelete(true);
    };

    // const UpdateStatus = (id, status) => {
    //     const updatedBarangList = barang.map(item => {
    //         if (item.id === id) {
    //             return {
    //                 ...item,
    //                 statusketersediaan: status
    //             };
    //         }
    //         return item;
    //     });
    //     setBarang(updatedBarangList);
    // };

    // const UpdateKondisi = (id, kondisi) => {
    //     const updatedBarangList = barang.map(item => {
    //         if (item.id === id) {
    //             return {
    //                 ...item,
    //                 kondisibarang: kondisi
    //             };
    //         }
    //         return item;
    //     });
    //     setBarang(updatedBarangList);
    // };

    useEffect(() => {
        fetchDataBarang();
        fetchDataRuangan();
    }, []);

    const validateForm = () => {
        const errors = {};

        if (!databarang.nama_barang.trim()) {
            errors.nama_barang = "Nama Barang harus diisi!";
        }

        if (!databarang.jenis_barang.trim()) {
            errors.jenis_barang = "Jenis Barang harus dipilih!";
        }

        if (!databarang.keadaan_barang.trim()) {
            errors.keadaan_barang = "Keadaan Barang harus dipilih!";
        }

        if (!databarang.kuantitas.trim()) {
            errors.kuantitas = "Kuantitas Barang harus diisi!";
        }

        if (!databarang.pengadaan.trim()) {
            errors.pengadaan = "Tanggal Pengadaan Barang harus diisi!";
        }

        if (!databarang.letakbarang.trim() || databarang.letakbarang === "") {
            errors.letakbarang = "Letak Barang harus dipilih!";
        }

        setErrorMessages(errors); // Set state errorMessages sesuai dengan pesan kesalahan

        return Object.keys(errors).length === 0; // Mengembalikan true jika tidak ada kesalahan
    };

    const fetchDataBarang = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/barangs');
            setBarang(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchDataRuangan = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/ruangans');
            setRuanganOptions(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleEditData = async () => {
        if (!validateForm()) {
            return; // Jika validasi gagal, hentikan proses pengiriman data
        }

        try {
            const response = await axios.put(`http://localhost:8000/api/barangs/update/${databarang.id}`, databarang);
            console.log(response.data); // Output pesan sukses atau respon lain dari server
            // Perbarui data barang di state setelah berhasil memperbarui data di backend
            setBarang(prevBarang => {
                return prevBarang.map(item => {
                    if (item.id === databarang.id) {
                        return { ...item, ...databarang };
                    }
                    return item;
                });
            });
            setShow(false); // Tutup modal setelah berhasil memperbarui data
        } catch (error) {
            console.error('Error updating data:', error);
            // Tampilkan pesan kesalahan atau lakukan penanganan kesalahan lainnya jika diperlukan
        }
    };

    // State untuk menyimpan data barang yang akan dihapus
const [deleteddatabarang, setDeleteddatabarang] = useState(null);

// State untuk menampilkan atau menyembunyikan modal konfirmasi
const [showConfirmationModal, setShowConfirmationModal] = useState(false);

// Fungsi untuk menampilkan modal konfirmasi
const showConfirmation = (databarang) => {
    setDeleteddatabarang(databarang);
    setShowConfirmationModal(true);
};

// Fungsi untuk menutup modal konfirmasi
const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
};

const handleDeleteData = async () => {
    try {
        // Kirim permintaan DELETE ke backend
        await axios.delete(`http://localhost:8000/api/barangs/${deleteddatabarang.id}`);
        
        // Perbarui state lokal untuk memperbarui tampilan
        const updatedBarangList = barang.filter(item => item.id !== deleteddatabarang.id);
        setBarang(updatedBarangList);
        
        // Tutup modal konfirmasi setelah penghapusan berhasil
        closeConfirmationModal();
    } catch (error) {
        console.error('Error deleting data:', error);
        // Tampilkan pesan kesalahan atau lakukan penanganan kesalahan lainnya jika diperlukan
    }
};


const getRuanganNameById = (ruanganId) => {
    const ruangan = ruanganOptions.find(ruangan => ruangan.id === ruanganId);
    return ruangan ? ruangan.nama_ruangan : 'Tidak Diketahui';
};


    return (
        <div>
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <Slidebar />
            </div>
            <div className={`main ${isSidebarOpen ? 'shifted' : ''}`}>
                <div className="topbar">
                    <div className="toggle" onClick={toggleSidebar} >
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
                <div className='datapengguna' >
                    
                    <div className='body-flex'>
                        <div className='flex mx-6 d-flex justify-content-center'>
                            <div className='col-11 p-6'>
                                <h2 className='mb-3' style={{ backgroundColor: '#436850', padding: '15px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', color: 'white' }}>Data Barang</h2>
                                <Link to="/inputbarang" className='mt-3 mb-3 btn btn-success'>
                                    <FontAwesomeIcon icon={faPlus} /> Tambah Data
                                </Link>
                                {/* Modal form */}
                                <Modal show={show} onHide={closeModal}>
    <Modal.Header closeButton>
        <Modal.Title>Form Edit Data</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>
            <Form.Group controlId="kodebarang">
                <Form.Label>Kode Barang</Form.Label>
                <Form.Control
                    type="text"
                    value={databarang.kode_barang}
                    readOnly
                />
            </Form.Group>
            <Form.Group controlId="namabarang">
                <Form.Label>Nama Barang</Form.Label>
                <Form.Control
                    type="text"
                    value={databarang.nama_barang}
                    onChange={(e) => setDatabarang({ ...databarang, nama_barang: e.target.value })}
                />
                {errorMessages.nama_barang && <p style={{ color: 'red' }} className="error-message">{errorMessages.nama_barang}</p>}
            </Form.Group>
            <Form.Group controlId="merekbarang">
                <Form.Label>Spesifikasi</Form.Label>
                <Form.Control
                    type="text"
                    value={databarang.spesifikasi}
                    onChange={(e) => setDatabarang({ ...databarang, spesifikasi: e.target.value })}
                />
            </Form.Group>
            <Form.Group controlId="jenisbarang">
                <Form.Label>Jenis Barang</Form.Label>
                <Form.Select
                    value={databarang.jenis_barang}
                    onChange={(e) => setDatabarang({ ...databarang, jenis_barang: e.target.value })}
                >
                    <option value="">Pilih Jenis Barang</option>
                    <option value="barang sekolah">Barang Sekolah</option>
                    <option value="barang jurusan">Barang Jurusan</option>
                </Form.Select>
                {errorMessages.jenis_barang && <p style={{ color: 'red' }} className="error-message">{errorMessages.jenis_barang}</p>}
            </Form.Group>
            {/* Tanggal Pembelian */}
            <Form.Group controlId="pengadaan">
                <Form.Label>Pengadaan</Form.Label>
                <Form.Control
                    type="date"
                    value={databarang.pengadaan}
                    onChange={(e) => setDatabarang({ ...databarang, pengadaan: e.target.value })}
                />
                {errorMessages.pengadaan && <p style={{ color: 'red' }} className="error-message">{errorMessages.pengadaan}</p>}
            </Form.Group>

            {/* Harga Barang
            <Form.Group controlId="hargabarang">
                <Form.Label>Harga Barang</Form.Label>
                <Form.Control
                    type="number"
                    value={databarang.harga_barang}
                    onChange={(e) => setDatabarang({ ...databarang, harga_barang: e.target.value })}
                />
            </Form.Group> */}

            <Form.Group controlId="keadaanbarang">
                <Form.Label>Keadaan Barang</Form.Label>
                <Form.Select
                    value={databarang.keadaan_barang}
                    onChange={(e) => setDatabarang({ ...databarang, keadaan_barang: e.target.value })}
                >
                    <option value="">Pilih Keadaan Barang</option>
                    <option value="baik">Baik</option>
                    <option value="rusak ringan">Rusak Ringan</option>
                    <option value="rusak sedang">Rusak Sedang</option>
                    <option value="rusak berat">Rusak Berat</option>
                </Form.Select>
                {errorMessages.keadaan_barang && <p style={{ color: 'red' }} className="error-message">{errorMessages.keadaan_barang}</p>}
            </Form.Group>

            {/* Letak Barang */}
            <Form.Group controlId="letakbarang">
                <Form.Label>Letak Barang</Form.Label>
                <Form.Select
                    value={databarang.letakbarang}
                    onChange={(e) => setDatabarang({ ...databarang, letakbarang: e.target.value })}
                >
                    <option value="">Pilih Letak Barang</option>
                    {ruanganOptions.map((ruangan) => (
                            <option key={ruangan.id} value={ruangan.nama_ruangan}>{ruangan.nama_ruangan}</option>
                        ))}
                </Form.Select>
                {errorMessages.letakbarang && <p style={{ color: 'red' }} className="error-message">{errorMessages.letakbarang}</p>}
            </Form.Group>


            {/* Jumlah Barang */}
            <Form.Group controlId="kuantitas">
                <Form.Label>Kuantitas</Form.Label>
                <Form.Control
                    type="number"
                    value={databarang.kuantitas}
                    onChange={(e) => setDatabarang({ ...databarang, kuantitas: e.target.value })}
                />
                {errorMessages.kuantitas && <p style={{ color: 'red' }} className="error-message">{errorMessages.kuantitas}</p>}
            </Form.Group>

            {/* Deskripsi */}
            <Form.Group controlId="keterangan">
                <Form.Label>Keterangan Barang</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={databarang.keterangan_barang}
                    onChange={(e) => setDatabarang({ ...databarang, keterangan_barang: e.target.value })}
                />
            </Form.Group>
        </Form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>Batal</Button>
        <Button variant="primary" onClick={handleEditData}>Simpan</Button>
    </Modal.Footer>
</Modal>

                                <Modal show={showConfirmationModal} onHide={closeConfirmationModal} centered>
                                    
                                    <Modal.Body className="text-center" style={{ borderBottom: 'none' }}>
                                        <FontAwesomeIcon icon={faExclamationTriangle} className="text-danger mb-3" style={{ fontSize: '6em' }} />
                                        <h4>Apakah anda yakin?</h4>
                                        <p>Data yang sudah dihapus mungkin tidak bisa dikembalikan lagi!</p>
                                        <Button variant="primary" onClick={closeConfirmationModal}>Batal</Button>
                                        &nbsp;
                                        &nbsp;
                                        <Button variant="danger" onClick={handleDeleteData}>Hapus</Button>
                                    </Modal.Body>
                                </Modal>

{/* <Modal show={showConfirmationModal} onHide={closeConfirmationModal}>
    <Modal.Header closeButton>
        <Modal.Title>Konfirmasi Hapus Data</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        Apakah Anda yakin akan menghapus data ini?
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={closeConfirmationModal}>Batal</Button>
        <Button variant="danger" onClick={handleDeleteData}>Ya</Button>
    </Modal.Footer>
</Modal> */}

                                <Table striped bordered hover responsive className="font-ubuntu" style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                                    <thead style={{ backgroundColor: '#436850', color: 'white' }}>
                                        <tr>
                                            <th>No</th>
                                            <th>Kode Barang</th>
                                            <th>Nama Barang</th>
                                            <th>Spesifikasi</th>
                                            <th>Jenis Barang</th>
                                            <th>Pengadaan</th>
                                            {/* <th>Harga</th> */}
                                            <th>Keadaan Barang</th>
                                            <th>Letak Barang</th>
                                            <th>Jumlah Barang</th>
                                            <th>Keterangan</th>
                                            {/* <th>Status Ketersedianan</th> */}
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {currentData.map((barang, index) => (
                                            <tr key={barang.id}>
                                                <td>{indexOfFirstData + index + 1}</td>
                                                <td>{barang.kode_barang}</td>
                                                <td>{barang.nama_barang}</td>
                                                <td>{barang.spesifikasi}</td>
                                                <td>{barang.jenis_barang}</td>
                                                <td>{barang.pengadaan}</td>
                                                {/* <td>{barang.harga_barang}</td> */}
                                                <td>{barang.keadaan_barang}</td>
                                                <td>{getRuanganNameById(barang.ruangan_id)}</td>
                                                <td>{barang.kuantitas}</td>
                                                <td>{barang.keterangan_barang}</td>
                                                {/* <td>{barang.statusketersediaan}</td> */}
                                                <td>
                                                    <Button variant="primary" onClick={() => showModal(barang)}>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Button>
                                                    &nbsp;
                                                    <Button variant="danger" onClick={() => showConfirmation(barang)}>
                                                        <FontAwesomeIcon icon={faTrashAlt} />
                                                    </Button>
                                                    &nbsp;
                                                    <Link to={`/detailbarang/${barang.id}`} className='btn btn-info'>
                                                            <FontAwesomeIcon icon={faEye} />
                                                        </Link>
                                                    {/* &nbsp;
                                                    {barang.statusketersediaan === 'Tersedia' ? (
                                                        <Button variant="warning" onClick={() => UpdateStatus(barang.id, 'Terpakai')}>
                                                            Terpakai
                                                        </Button>
                                                    ) : (
                                                        <Button variant="success" onClick={() => UpdateStatus(barang.id, 'Tersedia')}>
                                                            Tersedia
                                                        </Button>
                                                    )} */}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                {/* Pagination */}
            {/* Pagination */}
            <Pagination>
                <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
                {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
            </Pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Databarang;
