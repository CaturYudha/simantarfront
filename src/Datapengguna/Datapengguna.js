import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form, Table, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faEdit, faTrashAlt, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import avatar from "../assets/images.png";
import Slidebar from '../component/Slidebar';

const Datapengguna = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [show, setShow] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [userData, setUserData] = useState({
        id: '',
        username: '',
        password: '',
        nama: '',
        nohp: '',
        ttd: '',
        role: ''
    });
    const [user, setUser] = useState([
        { id: 1, username: 'user1',  password: 'password1', nama: 'namauser1', nohp: '123456789', ttd: 'ttd.png', role: 'admin', Tgl_registrasi: '2022-01-01' },
        { id: 2, username: 'user2',  password: 'password2', nama: 'namauser2', nohp: '123456789', ttd: 'ttd.png', role: 'admin', Tgl_registrasi: '2022-01-02' },
        { id: 3, username: 'user3',  password: 'password3', nama: 'namauser3', nohp: '123456789', ttd: 'ttd.png', role: 'admin', Tgl_registrasi: '2022-01-03' },
    ]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeModal = () => {
        setShow(false);
    };

    const showModal = (userData) => {
        setUserData(userData);
        setShow(true);
    };

    const closeModalDelete = () => {
        setShowDelete(false);
    };

    const showModalDelete = (userData) => {
        setUserData(userData);
        setShowDelete(true);
    };

    const closeModalAdd = () => {
        setShowAdd(false);
    };

    const showModalAdd = () => {
        setShowAdd(true);
    };

    const AddDataUser = (e) => {
        e.preventDefault();
        const newUser = {
            id: user.length + 1,
            username: userData.username,
            password: userData.password,
            nama: userData.nama,
            nohp: userData.nohp,
            ttd: userData.ttd,
            role: userData.role
        };
        setUser([...user, newUser]);
        setShowAdd(false);
    };

    const DeleteDataUser = () => {
        const updatedUserList = user.filter(item => item.id !== userData.id);
        setUser(updatedUserList);
        setShowDelete(false);
    };

    const UpdateDataUser = (e) => {
        e.preventDefault();
        const updatedUserList = user.map(item => {
            if (item.id === userData.id) {
                return {
                    ...item,
                    username: userData.username,
                    password: userData.password,
                    nama: userData.nama,
                    nohp: userData.nohp,
                    ttd: userData.ttd,
                    role: userData.role
                };
            }
            return item;
        });
        setUser(updatedUserList);
        setShow(false);
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
                <div className='datapengguna' >
                    <div className='body-flex'>
                        <div className='flex mx-6 d-flex justify-content-center'>
                            <div className='col-11 p-6'>
                                <h2 className='mb-3'style={{ backgroundColor: '#436850', padding: '15px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', color: 'white' }}>Data Pengguna</h2>
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
                                                        <p className="col-4 card-text">Username</p>
                                                        <p className="col-6 card-text">: {userData.username}</p>
                                                    </div>
                                                    <div className="row">
                                                        <p className="col-4 card-text">Password</p>
                                                        <p className="col-6 card-text">: {userData.password}</p>
                                                    </div>
                                                    <div className="row">
                                                        <p className="col-4 card-text">Nama User</p>
                                                        <p className="col-6 card-text">: {userData.nama}</p>
                                                    </div>
                                                    <div className="row">
                                                        <p className="col-4 card-text">No HP</p>
                                                        <p className="col-6 card-text">: {userData.nohp}</p>
                                                    </div>
                                                    <div className="row">
                                                        <p className="col-4 card-text">TTD</p>
                                                        <p className="col-6 card-text">: {userData.ttd}</p>
                                                    </div>
                                                    <div className="row">
                                                        <p className="col-4 card-text">Role</p>
                                                        <p className="col-6 card-text">: {userData.role}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button type='submit' color="primary" className="px-4" onClick={DeleteDataUser}>Hapus Data</Button>
                                        <Button variant="danger" onClick={closeModalDelete}>Batal</Button>
                                    </Modal.Footer>
                                </Modal>

                                <Modal show={show} onHide={closeModal}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Form Update Data</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form onSubmit={UpdateDataUser}>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputUsername">
                                                <Form.Label>Username</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    autoFocus
                                                    onChange={(e) => setUserData({...userData, username: e.target.value})}
                                                    value={userData.username}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    onChange={(e) => setUserData({...userData, password: e.target.value})}
                                                    value={userData.password}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputNama">
                                                <Form.Label>Nama User</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    onChange={(e) => setUserData({...userData, nama: e.target.value})}
                                                    value={userData.nama}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputNohp">
                                                <Form.Label>No HP</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    onChange={(e) => setUserData({...userData, nohp: e.target.value})}
                                                    value={userData.nohp}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputTtd">
                                                <Form.Label>TTD</Form.Label>
                                                <Form.Control
                                                    type="file"
                                                    onChange={(e) => setUserData({...userData, ttd: e.target.files[0]})}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputRole">
                                                <Form.Label>Role</Form.Label>
                                                <Dropdown style={{ width: '100%' }}>
                                                    <Dropdown.Toggle
                                                        variant="light"
                                                        id="dropdown-basic"
                                                        style={{
                                                            width: '100%',
                                                            borderWidth: '1px',
                                                            borderColor: 'lightgray',
                                                            textAlign: 'left', 
                                                        }}
                                                    >
                                                        {userData.role || "Pilih Role"}
                                                        
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu
                                                        align="end"
                                                        style={{ width: '100%', textAlign: 'left' }}
                                                    >
                                                        <Dropdown.Item onClick={() => setUserData({...userData, role: 'admin'})}>Admin</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => setUserData({...userData, role: 'user'})}>User</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
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
                                        <Form onSubmit={AddDataUser}>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputUsername">
                                                <Form.Label>Username</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    autoFocus
                                                    onChange={(e) => setUserData({...userData, username: e.target.value})}
                                                    value={userData.username}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    onChange={(e) => setUserData({...userData, password: e.target.value})}
                                                    value={userData.password}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputNama">
                                                <Form.Label>Nama User</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    onChange={(e) => setUserData({...userData, nama: e.target.value})}
                                                    value={userData.nama}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputNohp">
                                                <Form.Label>No HP</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    onChange={(e) => setUserData({...userData, nohp: e.target.value})}
                                                    value={userData.nohp}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputTtd">
                                                <Form.Label>TTD</Form.Label>
                                                <Form.Control
                                                    type="file"
                                                    onChange={(e) => setUserData({...userData, ttd: e.target.files[0]})}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputRole">
                                                <Form.Label>Role</Form.Label>
                                                <Dropdown style={{ width: '100%' }}>
                                                    <Dropdown.Toggle
                                                        variant="light"
                                                        id="dropdown-basic"
                                                        style={{
                                                            width: '100%',
                                                            borderWidth: '1px',
                                                            borderColor: 'lightgray',
                                                            textAlign: 'left', 
                                                        }}
                                                    >
                                                        {userData.role || "Pilih Role"}
                                                        
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu
                                                        align="end"
                                                        style={{ width: '100%', textAlign: 'left' }}
                                                    >
                                                        <Dropdown.Item onClick={() => setUserData({...userData, role: 'admin'})}>Admin</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => setUserData({...userData, role: 'user'})}>User</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
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
                                            <th>ID User</th>
                                            <th>Username</th>
                                            <th>Password</th>
                                            <th>Nama User</th>
                                            <th>No HP</th>
                                            <th>TTD</th>
                                            <th>Role</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {user.map((user, index) => (
                                            <tr key={user.id}>
                                                <td>{index + 1}</td>
                                                <td>{user.id}</td>
                                                <td>{user.username}</td>
                                                <td>{user.password}</td>
                                                <td>{user.nama}</td>
                                                <td>{user.nohp}</td>
                                                <td><img src={user.ttd} alt="TTD" style={{ width: '50px', height: '50px' }} /></td>
                                                <td>{user.role}</td>
                                                <td>
                                                    <Button variant="primary" onClick={() => showModal(user)}>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Button>
                                                    &nbsp;
                                                    <Button variant="danger" onClick={() => showModalDelete(user)}>
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

export default Datapengguna;
