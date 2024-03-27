import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faEdit, faTrashAlt, faSearch, faPlus, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import avatar from "../assets/images.png";
import Slidebar from '../component/Slidebar';

const Datajurusan = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [show, setShow] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [jurusanData, setJurusanData] = useState({
        id: '',
        kode_jurusan: '',
        nama_jurusan: '',
        deskripsi_jurusan: ''    
    });

    const [kodejurusanError, setKodeJurusanError] = useState(false);
    const [namajurusanError, setNamaJurusanError] = useState(false);
    const [duplicateKodeJurusanError, setDuplicateKodeJurusanError] = useState(false);
    const [jurusan, setJurusan] = useState([
        // { id: 1, kodejurusan: 'KJ001',  namajurusan: 'Teknik Informatika', deskripsi: 'Deskripsi jurusan Teknik Informatika' },
        // { id: 2, kodejurusan: 'KJ002',  namajurusan: 'Sistem Informasi', deskripsi: 'Deskripsi jurusan Sistem Informasi' },
        // { id: 3, kodejurusan: 'KJ003',  namajurusan: 'Teknik Elektro', deskripsi: 'Deskripsi jurusan Teknik Elektro' },
    ]);

    const validateForm = () => {
        let isValid = true;
    
        // Validasi input 
        if (!jurusanData.kode_jurusan) {
            setKodeJurusanError(true);
            isValid = false;
        } else {
            setKodeJurusanError(false);
        }
        
        // Check for duplicate kode jurusan
        if (jurusan.some(item => item.kode_jurusan === jurusanData.kode_jurusan)) {
            setDuplicateKodeJurusanError(true);
            isValid = false;
        } else {
            setDuplicateKodeJurusanError(false);
        }

        return isValid;
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/jurusans');
            setJurusan(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeModal = () => {
        setShow(false);
    };

    const showModal = (jurusanData) => {
        setJurusanData(jurusanData);
        setShow(true);
    };

    const closeModalDelete = () => {
        setShowDelete(false);
    };

    const showModalDelete = (jurusanData) => {
        setJurusanData(jurusanData);
        setShowDelete(true);
    };

    const closeModalAdd = () => {
        setShowAdd(false);
    };

    const showModalAdd = () => {
        setShowAdd(true);
    };

    const AddDataJurusan = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            const formData = new FormData();
            formData.append('kode_jurusan', jurusanData.kode_jurusan);
            formData.append('nama_jurusan', jurusanData.nama_jurusan);
            formData.append('deskripsi_jurusan', jurusanData.deskripsi_jurusan);

            const response = await axios.post('http://localhost:8000/api/jurusans', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data); // Output respons dari server

            // Atur pesan sukses atau perbarui data yang ditampilkan ke pengguna
            fetchData(); // Ambil data terbaru setelah berhasil menambahkan
            window.location.reload();
        } catch (error) {
            console.error('Error adding data:', error);
            // Tambahkan logika untuk menampilkan pesan kesalahan di sini
        }
    };

    const DeleteDataJurusan = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/jurusans/${jurusanData.id}`);
            setShowDelete(false);
            fetchData();
            window.location.reload();
            alert("Data berhasil dihapus");
        } catch (error) {
            console.error('Error deleting user:', error);
            alert("Data gagal dihapus");
        }
    };

    const UpdateDataJurusan = async (e) => {
        e.preventDefault();
        console.log('Data yang akan dikirim:', jurusanData);
        // Validasi input nama 
        if (!jurusanData.nama_jurusan) {
            setNamaJurusanError(true);
            return; // Keluar dari fungsi jika validasi gagal
        } else {
            setNamaJurusanError(false);
        }
    
        
        try {
            const response = await axios.put(`http://localhost:8000/api/jurusans/update/${jurusanData.id}`, jurusanData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        
            console.log(response.data); // Output respons dari server
            fetchData(); // Ambil data terbaru setelah berhasil mengupdate
            setShow(false);
            window.location.reload();
        } catch (error) {
            console.error('Error updating data:', error);
            // Menangani kesalahan dan menampilkan pesan kesalahan kepada pengguna
            if (error.response) {
                console.log(error.response.data); // Pesan kesalahan dari server
                // Tambahkan logika untuk menampilkan pesan kesalahan kepada pengguna
            } else if (error.request) {
                console.log(error.request); // Kesalahan koneksi jaringan
                // Tambahkan logika untuk menampilkan pesan kesalahan kepada pengguna
            } else {
                console.log('Error', error.message); // Kesalahan lainnya
                // Tambahkan logika untuk menampilkan pesan kesalahan kepada pengguna
            }
        }
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
                                <h2 className='mb-3'style={{ backgroundColor: '#436850', padding: '15px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', color: 'white' }}>Data Program Keahlian</h2>
                                {/* Modal DELETE */}
                                <Modal show={showDelete} onHide={closeModalDelete} centered>
                                    
                                    <Modal.Body className="text-center" style={{ borderBottom: 'none' }}>
                                        <FontAwesomeIcon icon={faExclamationTriangle} className="text-danger mb-3" style={{ fontSize: '6em' }} />
                                        <h4>Apakah anda yakin?</h4>
                                        <p>Data yang sudah dihapus mungkin tidak bisa dikembalikan lagi!</p>
                                        <Button variant="primary" onClick={closeModalDelete}>Batal</Button>
                                        &nbsp;
                                        &nbsp;
                                        <Button variant="danger" onClick={DeleteDataJurusan}>Hapus</Button>
                                    </Modal.Body>
                                </Modal>

                                <Modal show={show} onHide={closeModal}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Form Update Data</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form onSubmit={UpdateDataJurusan}>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputKodeJurusan">
                                                <Form.Label>Kode Jurusan</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    autoFocus
                                                    readOnly
                                                    value={jurusanData.kode_jurusan}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputNamaJurusan">
                                                <Form.Label>Nama Jurusan</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    onChange={(e) => {
                                                        setJurusanData({...jurusanData, nama_jurusan: e.target.value});
                                                        setNamaJurusanError(false);
                                                    }}
                                                    value={jurusanData.nama_jurusan}
                                                />
                                                {namajurusanError && <p style={{ color: 'red' }}>Nama Jurusan wajib diisi!</p>}
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputDeskripsi">
                                                <Form.Label>Deskripsi</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    onChange={(e) => setJurusanData({...jurusanData, deskripsi_jurusan: e.target.value})}
                                                    value={jurusanData.deskripsi_jurusan}
                                                />
                                            </Form.Group>
                                            <Button type='submit' color="primary" className="px-4">Simpan</Button>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={closeModal}>Close</Button>
                                    </Modal.Footer>
                                </Modal>

                                {/* Modal ADD */}
                                <Modal show={showAdd} onHide={closeModalAdd}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Tambah Data</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form onSubmit={AddDataJurusan}>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputKodeJurusan">
                                                <Form.Label>Kode Jurusan</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    autoFocus
                                                    onChange={(e) => {
                                                        setJurusanData({...jurusanData, kode_jurusan: e.target.value}); 
                                                        setKodeJurusanError(false);
                                                        setDuplicateKodeJurusanError(false);
                                                    }}
                                                    value={jurusanData.kode_jurusan}
                                                />
                                                {kodejurusanError && <p style={{ color: 'red' }}>Kode Jurusan wajib diisi!</p>}
                                                {duplicateKodeJurusanError && <p style={{ color: 'red' }}>Kode Jurusan sudah ada!</p>}
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputNamaJurusan">
                                                <Form.Label>Nama Jurusan</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    onChange={(e) => {
                                                        setJurusanData({...jurusanData, nama_jurusan: e.target.value});
                                                        setNamaJurusanError(false);
                                                    }}
                                                    value={jurusanData.nama_jurusan}
                                                />
                                                {namajurusanError && <p style={{ color: 'red' }}>Nama Jurusan wajib diisi!</p>}
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputDeskripsi">
                                                <Form.Label>Deskripsi</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    onChange={(e) => setJurusanData({...jurusanData, deskripsi_jurusan: e.target.value})}
                                                    value={jurusanData.deskripsi_jurusan}
                                                />
                                            </Form.Group>
                                            <Button type='submit' color="primary" className="px-4">Tambah</Button>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={closeModalAdd}>Close</Button>
                                    </Modal.Footer>
                                </Modal>

                                <Button className='mt-3 mb-3' variant="success" onClick={showModalAdd}>
                                    <FontAwesomeIcon icon={faPlus} /> Tambah Data
                                </Button>
                                <Table striped bordered hover responsive className="font-ubuntu" style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                                    <thead style={{ backgroundColor: '#436850', color: 'white' }}>
                                        <tr>
                                            <th>No</th>
                                            <th>ID Jurusan</th>
                                            <th>Kode Jurusan</th>
                                            <th>Nama Jurusan</th>
                                            <th>Deskripsi</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {jurusan.map((jurusan, index) => (
                                            <tr key={jurusan.id}>
                                                <td>{index + 1}</td>
                                                <td>{jurusan.id}</td>
                                                <td>{jurusan.kode_jurusan}</td>
                                                <td>{jurusan.nama_jurusan}</td>
                                                <td>{jurusan.deskripsi_jurusan}</td>
                                                <td>
                                                    <Button variant="primary" onClick={() => showModal(jurusan)}>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Button>
                                                    &nbsp;
                                                    <Button variant="danger" onClick={() => showModalDelete(jurusan)}>
                                                        <FontAwesomeIcon icon={faTrashAlt} />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Datajurusan;
