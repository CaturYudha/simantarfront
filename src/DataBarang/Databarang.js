import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faEye, faEdit, faTrashAlt, faSearch, faPlus, faInfo } from '@fortawesome/free-solid-svg-icons';
import avatar from "../assets/images.png";
import Slidebar from '../component/Slidebar';
import { Link } from "react-router-dom";
import { Pagination } from 'react-bootstrap';

const Databarang = () => {
    const [barang, setBarang] = useState([
        { id: 1, kodebarang: 'KB001', namabarang: 'Laptop', merekbarang: 'Asus', jenisbarang: 'Elektronik', tglpembelian: '2023-01-01', hargabarang: '7000000', letakbarang: 'Laboratorium Komputer', jumlahbarang: '5', deskripsi: 'Deskripsi barang Laptop', statusketersediaan: 'Tersedia', kondisibarang: 'Baik' },
        { id: 2, kodebarang: 'KB002', namabarang: 'Meja', merekbarang: 'IKEA', jenisbarang: 'Furniture', tglpembelian: '2022-12-15', hargabarang: '1000000', letakbarang: 'Ruang Kuliah A101', jumlahbarang: '10', deskripsi: 'Deskripsi barang Meja', statusketersediaan: 'Terpakai', kondisibarang: 'Baik' },
        { id: 3, kodebarang: 'KB003', namabarang: 'Proyektor', merekbarang: 'Epson', jenisbarang: 'Elektronik', tglpembelian: '2023-02-20', hargabarang: '5000000', letakbarang: 'Ruang Kuliah A101', jumlahbarang: '2', deskripsi: 'Deskripsi barang Proyektor', statusketersediaan: 'Tersedia', kondisibarang: 'Baik' },
        { id: 4, kodebarang: 'KB001', namabarang: 'Laptop', merekbarang: 'Asus', jenisbarang: 'Elektronik', tglpembelian: '2023-01-01', hargabarang: '7000000', letakbarang: 'Laboratorium Komputer', jumlahbarang: '5', deskripsi: 'Deskripsi barang Laptop', statusketersediaan: 'Tersedia', kondisibarang: 'Baik' },
        { id: 5, kodebarang: 'KB002', namabarang: 'Meja', merekbarang: 'IKEA', jenisbarang: 'Furniture', tglpembelian: '2022-12-15', hargabarang: '1000000', letakbarang: 'Ruang Kuliah A101', jumlahbarang: '10', deskripsi: 'Deskripsi barang Meja', statusketersediaan: 'Terpakai', kondisibarang: 'Baik' },
        { id: 6, kodebarang: 'KB003', namabarang: 'Proyektor', merekbarang: 'Epson', jenisbarang: 'Elektronik', tglpembelian: '2023-02-20', hargabarang: '5000000', letakbarang: 'Ruang Kuliah A101', jumlahbarang: '2', deskripsi: 'Deskripsi barang Proyektor', statusketersediaan: 'Tersedia', kondisibarang: 'Baik' },
        { id: 7, kodebarang: 'KB001', namabarang: 'Laptop', merekbarang: 'Asus', jenisbarang: 'Elektronik', tglpembelian: '2023-01-01', hargabarang: '7000000', letakbarang: 'Laboratorium Komputer', jumlahbarang: '5', deskripsi: 'Deskripsi barang Laptop', statusketersediaan: 'Tersedia', kondisibarang: 'Baik' },
        { id: 8, kodebarang: 'KB002', namabarang: 'Meja', merekbarang: 'IKEA', jenisbarang: 'Furniture', tglpembelian: '2022-12-15', hargabarang: '1000000', letakbarang: 'Ruang Kuliah A101', jumlahbarang: '10', deskripsi: 'Deskripsi barang Meja', statusketersediaan: 'Terpakai', kondisibarang: 'Baik' },
        { id: 9, kodebarang: 'KB003', namabarang: 'Proyektor', merekbarang: 'Epson', jenisbarang: 'Elektronik', tglpembelian: '2023-02-20', hargabarang: '5000000', letakbarang: 'Ruang Kuliah A101', jumlahbarang: '2', deskripsi: 'Deskripsi barang Proyektor', statusketersediaan: 'Tersedia', kondisibarang: 'Baik' },
    ]);


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
        kodebarang: '',
        namabarang: '',
        merekbarang: '',
        jenisbarang: '',
        tglpembelian: '',
        hargabarang: '',
        letakbarang: '',
        jumlahbarang: '',
        deskripsi: '',
        statusketersediaan: '',
        kondisibarang: ''
    });
    

    const [ruanganOptions, setRuanganOptions] = useState([
        { id: 1, nama: 'Ruangan A' },
        { id: 2, nama: 'Ruangan B' },
        // Tambahkan data ruangan lainnya sesuai kebutuhan
    ]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeModal = () => {
        setShow(false);
    };

    const showModal = (databarang) => {
        setDatabarang(databarang);
        setShow(true);
    };

    const closeModalDelete = () => {
        setShowDelete(false);
    };

    const showModalDelete = (databarang) => {
        setDatabarang(databarang);
        setShowDelete(true);
    };

    const UpdateStatus = (id, status) => {
        const updatedBarangList = barang.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    statusketersediaan: status
                };
            }
            return item;
        });
        setBarang(updatedBarangList);
    };

    const UpdateKondisi = (id, kondisi) => {
        const updatedBarangList = barang.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    kondisibarang: kondisi
                };
            }
            return item;
        });
        setBarang(updatedBarangList);
    };
    const handleEditData = () => {
        const updatedBarangList = barang.map(item => {
            if (item.id === databarang.id) {
                return {
                    ...item,
                    kodebarang: databarang.kodebarang,
                    namabarang: databarang.namabarang,
                    merekbarang: databarang.merekbarang,
                    jenisbarang: databarang.jenisbarang,
                    tglpembelian: databarang.tglpembelian,
                    hargabarang: databarang.hargabarang,
                    letakbarang: databarang.letakbarang,
                    jumlahbarang: databarang.jumlahbarang,
                    deskripsi: databarang.deskripsi,
                    statusketersediaan: databarang.statusketersediaan,
                    kondisibarang: databarang.kondisibarang
                };
            }
            return item;
        });
        setBarang(updatedBarangList);
        setShow(false);
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

// Fungsi untuk menghapus data barang setelah konfirmasi
const handleDeleteData = () => {
    // Logika penghapusan data di sini, misalnya:
    const updatedUser = barang.filter(item => item.id !== deleteddatabarang.id);
    setBarang(updatedUser);
    closeConfirmationModal(); // Tutup modal setelah penghapusan
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
                    value={databarang.kodebarang}
                    readOnly
                />
            </Form.Group>
            <Form.Group controlId="namabarang">
                <Form.Label>Nama Barang</Form.Label>
                <Form.Control
                    type="text"
                    value={databarang.namabarang}
                    onChange={(e) => setDatabarang({ ...databarang, namabarang: e.target.value })}
                />
            </Form.Group>
            <Form.Group controlId="merekbarang">
                <Form.Label>Merek Barang</Form.Label>
                <Form.Control
                    type="text"
                    value={databarang.merekbarang}
                    onChange={(e) => setDatabarang({ ...databarang, merekbarang: e.target.value })}
                />
            </Form.Group>
            <Form.Group controlId="jenisbarang">
                <Form.Label>Jenis Barang</Form.Label>
                <Form.Select
                    value={databarang.jenisbarang}
                    onChange={(e) => setDatabarang({ ...databarang, jenisbarang: e.target.value })}
                >
                    <option value="Elektronik">Elektronik</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Lainnya">Lainnya</option>
                </Form.Select>
            </Form.Group>
            {/* Tanggal Pembelian */}
            <Form.Group controlId="tglpembelian">
                <Form.Label>Tanggal Pembelian</Form.Label>
                <Form.Control
                    type="date"
                    value={databarang.tglpembelian}
                    onChange={(e) => setDatabarang({ ...databarang, tglpembelian: e.target.value })}
                />
            </Form.Group>

            {/* Harga Barang */}
            <Form.Group controlId="hargabarang">
                <Form.Label>Harga Barang</Form.Label>
                <Form.Control
                    type="number"
                    value={databarang.hargabarang}
                    onChange={(e) => setDatabarang({ ...databarang, hargabarang: e.target.value })}
                />
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
                        <option key={ruangan.id} value={ruangan.nama}>{ruangan.nama}</option>
                    ))}
                </Form.Select>
            </Form.Group>


            {/* Jumlah Barang */}
            <Form.Group controlId="jumlahbarang">
                <Form.Label>Jumlah Barang</Form.Label>
                <Form.Control
                    type="number"
                    value={databarang.jumlahbarang}
                    onChange={(e) => setDatabarang({ ...databarang, jumlahbarang: e.target.value })}
                />
            </Form.Group>

            {/* Deskripsi */}
            <Form.Group controlId="deskripsi">
                <Form.Label>Deskripsi</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={databarang.deskripsi}
                    onChange={(e) => setDatabarang({ ...databarang, deskripsi: e.target.value })}
                />
            </Form.Group>
        </Form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>Batal</Button>
        <Button variant="primary" onClick={handleEditData}>Simpan</Button>
    </Modal.Footer>
</Modal>

<Modal show={showConfirmationModal} onHide={closeConfirmationModal}>
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
</Modal>

                                <Table striped bordered hover responsive className="font-ubuntu" style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                                    <thead style={{ backgroundColor: '#436850', color: 'white' }}>
                                        <tr>
                                            <th>No</th>
                                            <th>Kode Barang</th>
                                            <th>Nama Barang</th>
                                            <th>Merek Barang</th>
                                            <th>Jenis Barang</th>
                                            <th>Tanggal Pembelian</th>
                                            <th>Harga</th>
                                            <th>Letak Barang</th>
                                            <th>Jumlah Barang</th>
                                            <th>Deskripsi</th>
                                            <th>Status Ketersedianan</th>
                                            <th>Kondisi Barang</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {currentData.map((barang, index) => (
                                            <tr key={barang.id}>
                                                <td>{indexOfFirstData + index + 1}</td>
                                                <td>{barang.kodebarang}</td>
                                                <td>{barang.namabarang}</td>
                                                <td>{barang.merekbarang}</td>
                                                <td>{barang.jenisbarang}</td>
                                                <td>{barang.tglpembelian}</td>
                                                <td>{barang.hargabarang}</td>
                                                <td>{barang.letakbarang}</td>
                                                <td>{barang.jumlahbarang}</td>
                                                <td>{barang.deskripsi}</td>
                                                <td>{barang.statusketersediaan}</td>
                                                <td>{barang.kondisibarang}</td>
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
                                                    &nbsp;
                                                    {barang.statusketersediaan === 'Tersedia' ? (
                                                        <Button variant="warning" onClick={() => UpdateStatus(barang.id, 'Terpakai')}>
                                                            Terpakai
                                                        </Button>
                                                    ) : (
                                                        <Button variant="success" onClick={() => UpdateStatus(barang.id, 'Tersedia')}>
                                                            Tersedia
                                                        </Button>
                                                    )}
                                                    &nbsp;
                                                    {barang.kondisibarang === 'Baik' ? (
                                                        <Button variant="danger" onClick={() => UpdateKondisi(barang.id, 'Rusak')}>
                                                            Rusak
                                                        </Button>
                                                    ) : (
                                                        <Button variant="success" onClick={() => UpdateKondisi(barang.id, 'Baik')}>
                                                            Baik
                                                        </Button>
                                                    )}
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
