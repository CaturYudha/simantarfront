import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faEdit, faTrashAlt, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import avatar from "../assets/images.png";
import Slidebar from '../component/Slidebar';

const Dataruangan = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [show, setShow] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [ruanganData, setRuanganData] = useState({
        id: '',
        koderuangan: '',
        namaruangan: '',
        deskripsi: ''
    });
    const [ruangan, setRuangan] = useState([
        { id: 1, koderuangan: 'KR001', namaruangan: 'Laboratorium Komputer', deskripsi: 'Deskripsi ruangan Laboratorium Komputer' },
        { id: 2, koderuangan: 'KR002', namaruangan: 'Ruang Kuliah A101', deskripsi: 'Deskripsi ruangan Ruang Kuliah A101' },
        { id: 3, koderuangan: 'KR003', namaruangan: 'Perpustakaan', deskripsi: 'Deskripsi ruangan Perpustakaan' },
    ]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeModal = () => {
        setShow(false);
    };

    const showModal = (ruanganData) => {
        setRuanganData(ruanganData);
        setShow(true);
    };

    const closeModalDelete = () => {
        setShowDelete(false);
    };

    const showModalDelete = (ruanganData) => {
        setRuanganData(ruanganData);
        setShowDelete(true);
    };

    const closeModalAdd = () => {
        setShowAdd(false);
    };

    const showModalAdd = () => {
        setShowAdd(true);
    };

    const AddDataRuangan = (e) => {
        e.preventDefault();
        const newRuangan = {
            id: ruangan.length + 1,
            koderuangan: ruanganData.koderuangan,
            namaruangan: ruanganData.namaruangan,
            deskripsi: ruanganData.deskripsi
        };
        setRuangan([...ruangan, newRuangan]);
        setShowAdd(false);
    };

    const DeleteDataRuangan = () => {
        const updatedRuanganList = ruangan.filter(item => item.id !== ruanganData.id);
        setRuangan(updatedRuanganList);
        setShowDelete(false);
    };

    const UpdateDataRuangan = (e) => {
        e.preventDefault();
        const updatedRuanganList = ruangan.map(item => {
            if (item.id === ruanganData.id) {
                return {
                    ...item,
                    koderuangan: ruanganData.koderuangan,
                    namaruangan: ruanganData.namaruangan,
                    deskripsi: ruanganData.deskripsi
                };
            }
            return item;
        });
        setRuangan(updatedRuanganList);
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
                                <h2 className='mb-3' style={{ backgroundColor: '#436850', padding: '15px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', color: 'white' }}>Data Ruangan</h2>
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
                                                        <p className="col-4 card-text">Kode Ruangan</p>
                                                        <p className="col-6 card-text">: {ruanganData.koderuangan}</p>
                                                    </div>
                                                    <div className="row">
                                                        <p className="col-4 card-text">Nama Ruangan</p>
                                                        <p className="col-6 card-text">: {ruanganData.namaruangan}</p>
                                                    </div>
                                                    <div className="row">
                                                        <p className="col-4 card-text">Deskripsi</p>
                                                        <p className="col-6 card-text">: {ruanganData.deskripsi}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button type='submit' color="primary" className="px-4" onClick={DeleteDataRuangan}>Hapus Data</Button>
                                        <Button variant="danger" onClick={closeModalDelete}>Batal</Button>
                                    </Modal.Footer>
                                </Modal>

                                <Modal show={show} onHide={closeModal}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Form Update Data</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form onSubmit={UpdateDataRuangan}>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputKodeRuangan">
                                                <Form.Label>Kode Ruangan</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    autoFocus
                                                    onChange={(e) => setRuanganData({...ruanganData, koderuangan: e.target.value})}
                                                    value={ruanganData.koderuangan}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputNamaRuangan">
                                                <Form.Label>Nama Ruangan</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    onChange={(e) => setRuanganData({...ruanganData, namaruangan: e.target.value})}
                                                    value={ruanganData.namaruangan}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputDeskripsi">
                                                <Form.Label>Deskripsi</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    onChange={(e) => setRuanganData({...ruanganData, deskripsi: e.target.value})}
                                                    value={ruanganData.deskripsi}
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
                                        <Form onSubmit={AddDataRuangan}>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputKodeRuangan">
                                                <Form.Label>Kode Ruangan</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    autoFocus
                                                    onChange={(e) => setRuanganData({...ruanganData, koderuangan: e.target.value})}
                                                    value={ruanganData.koderuangan}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputNamaRuangan">
                                                <Form.Label>Nama Ruangan</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    onChange={(e) => setRuanganData({...ruanganData, namaruangan: e.target.value})}
                                                    value={ruanganData.namaruangan}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputDeskripsi">
                                                <Form.Label>Deskripsi</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    onChange={(e) => setRuanganData({...ruanganData, deskripsi: e.target.value})}
                                                    value={ruanganData.deskripsi}
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
                                            <th>Kode Ruangan</th>
                                            <th>Nama Ruangan</th>
                                            <th>Deskripsi</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ruangan.map((ruangan, index) => (
                                            <tr key={ruangan.id}>
                                                <td>{index + 1}</td>
                                                <td>{ruangan.koderuangan}</td>
                                                <td>{ruangan.namaruangan}</td>
                                                <td>{ruangan.deskripsi}</td>
                                                <td>
                                                    <Button variant="primary" onClick={() => showModal(ruangan)}>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Button>
                                                    &nbsp;
                                                    <Button variant="danger" onClick={() => showModalDelete(ruangan)}>
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

export default Dataruangan;
