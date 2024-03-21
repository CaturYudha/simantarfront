import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faEdit, faTrashAlt, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import avatar from "../assets/images.png";
import Slidebar from '../component/Slidebar';

const Datajurusan = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [show, setShow] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [jurusanData, setJurusanData] = useState({
        id: '',
        kodejurusan: '',
        namajurusan: '',
        deskripsi: ''
    });
    const [jurusan, setJurusan] = useState([
        { id: 1, kodejurusan: 'KJ001',  namajurusan: 'Teknik Informatika', deskripsi: 'Deskripsi jurusan Teknik Informatika' },
        { id: 2, kodejurusan: 'KJ002',  namajurusan: 'Sistem Informasi', deskripsi: 'Deskripsi jurusan Sistem Informasi' },
        { id: 3, kodejurusan: 'KJ003',  namajurusan: 'Teknik Elektro', deskripsi: 'Deskripsi jurusan Teknik Elektro' },
    ]);

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

    const AddDataJurusan = (e) => {
        e.preventDefault();
        const newJurusan = {
            id: jurusan.length + 1,
            kodejurusan: jurusanData.kodejurusan,
            namajurusan: jurusanData.namajurusan,
            deskripsi: jurusanData.deskripsi
        };
        setJurusan([...jurusan, newJurusan]);
        setShowAdd(false);
    };

    const DeleteDataJurusan = () => {
        const updatedJurusanList = jurusan.filter(item => item.id !== jurusanData.id);
        setJurusan(updatedJurusanList);
        setShowDelete(false);
    };

    const UpdateDataJurusan = (e) => {
        e.preventDefault();
        const updatedJurusanList = jurusan.map(item => {
            if (item.id === jurusanData.id) {
                return {
                    ...item,
                    kodejurusan: jurusanData.kodejurusan,
                    namajurusan: jurusanData.namajurusan,
                    deskripsi: jurusanData.deskripsi
                };
            }
            return item;
        });
        setJurusan(updatedJurusanList);
        setShow(false);
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
                                <Modal show={showDelete} onHide={closeModalDelete}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Apakah Anda yakin menghapus data ini?</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className="col-sm-12">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">Detail Data</h5>
                                                    <div className="row">
                                                        <p className="col-4 card-text">Kode Jurusan</p>
                                                        <p className="col-6 card-text">: {jurusanData.kodejurusan}</p>
                                                    </div>
                                                    <div className="row">
                                                        <p className="col-4 card-text">Nama Jurusan</p>
                                                        <p className="col-6 card-text">: {jurusanData.namajurusan}</p>
                                                    </div>
                                                    <div className="row">
                                                        <p className="col-4 card-text">Deskripsi</p>
                                                        <p className="col-6 card-text">: {jurusanData.deskripsi}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button type='submit' color="primary" className="px-4" onClick={DeleteDataJurusan}>Hapus Data</Button>
                                        <Button variant="danger" onClick={closeModalDelete}>Batal</Button>
                                    </Modal.Footer>
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
                                                    onChange={(e) => setJurusanData({...jurusanData, kodejurusan: e.target.value})}
                                                    value={jurusanData.kodejurusan}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputNamaJurusan">
                                                <Form.Label>Nama Jurusan</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    onChange={(e) => setJurusanData({...jurusanData, namajurusan: e.target.value})}
                                                    value={jurusanData.namajurusan}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputDeskripsi">
                                                <Form.Label>Deskripsi</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    onChange={(e) => setJurusanData({...jurusanData, deskripsi: e.target.value})}
                                                    value={jurusanData.deskripsi}
                                                />
                                            </Form.Group>
                                            <Button type='submit' color="primary" className="px-4">Update</Button>
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
                                                    onChange={(e) => setJurusanData({...jurusanData, kodejurusan: e.target.value})}
                                                    value={jurusanData.kodejurusan}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputNamaJurusan">
                                                <Form.Label>Nama Jurusan</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    onChange={(e) => setJurusanData({...jurusanData, namajurusan: e.target.value})}
                                                    value={jurusanData.namajurusan}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputDeskripsi">
                                                <Form.Label>Deskripsi</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    onChange={(e) => setJurusanData({...jurusanData, deskripsi: e.target.value})}
                                                    value={jurusanData.deskripsi}
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
                                                <td>{jurusan.kodejurusan}</td>
                                                <td>{jurusan.namajurusan}</td>
                                                <td>{jurusan.deskripsi}</td>
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
