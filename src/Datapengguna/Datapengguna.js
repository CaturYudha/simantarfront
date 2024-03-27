import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form, Table, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faEdit, faTrashAlt, faSearch, faPlus, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
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
        nama_user: '',
        no_hp: '',
        ttd: '',
        role: '' // Menambahkan state untuk menyimpan nilai role
    });
    const [users, setUsers] = useState([]);
    const [selectedRole, setSelectedRole] = useState(''); // State untuk menyimpan nilai role yang dipilih
    
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [namaUserError, setNamaUserError] = useState(false);
    const [noHpError, setNoHpError] = useState(false);
    const [ttdError, setTtdError] = useState(false);
    const [roleError, setRoleError] = useState(false);

    const validateForm = () => {
        let isValid = true;
    
        // Validasi input username
        if (!userData.username) {
            setUsernameError(true);
            isValid = false;
        } else {
            setUsernameError(false);
        }
    
        // Validasi input password
        if (!userData.password) {
            setPasswordError(true);
            setPasswordErrorMessage("Password wajib diisi!");
            isValid = false;
        } else if (userData.password.length < 6 || userData.password.length > 6) {
            setPasswordError(true);
            setPasswordErrorMessage("Password harus terdiri dari 6 karakter!");
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage("");
        }
    
        // Validasi input nama user
        if (!userData.nama_user) {
            setNamaUserError(true);
            isValid = false;
        } else {
            setNamaUserError(false);
        }
    
        // Validasi input no HP
        if (!userData.no_hp) {
            setNoHpError(true);
            isValid = false;
        } else {
            setNoHpError(false);
        }
    
        // Validasi input role
        if (!selectedRole) {
            setRoleError(true);
            isValid = false;
        } else {
            setRoleError(false);
        }
    
        return isValid;
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/users');
            const usersWithImageUrl = response.data.map(user => {
                return {
                    ...user,
                    ttd_url: `http://localhost:8000${user.ttd}` // Sesuaikan dengan URL gambar TTD yang sesuai
                };
            });
            setUsers(usersWithImageUrl);
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

    const showModal = (userData) => {
        console.log(userData); // Cek nilai userData sebelum menampilkan modal
        setUserData(userData);
        setSelectedRole(userData.role); // Menetapkan selectedRole saat modal ditampilkan
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

    const AddDataUser = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        // Jika ada gambar yang diunggah, lakukan validasi gambar
        if (userData.ttd instanceof File) {
            // Validasi format file gambar
            const allowedExtensions = /(\.png)$/i;
            if (!allowedExtensions.exec(userData.ttd.name)) {
                alert('Format gambar harus PNG!');
                return;
            }

            // Validasi ukuran file gambar
            if (userData.ttd.size > 2 * 1024 * 1024) {
                alert('Ukuran gambar tidak boleh lebih dari 2 MB!');
                return;
            }
        }
        try {
            const formData = new FormData();
            formData.append('username', userData.username);
            formData.append('password', userData.password);
            formData.append('nama_user', userData.nama_user);
            formData.append('no_hp', userData.no_hp);
            formData.append('ttd', userData.ttd);
            formData.append('role', selectedRole); // Menggunakan selectedRole yang dipilih
            await axios.post('http://localhost:8000/api/users', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setShowAdd(false);
            fetchData();
            window.location.reload();
            alert("Data berhasil ditambahkan");
        } catch (error) {
            alert("Data gagal ditambahkan");
            if (error.response && error.response.data && error.response.data.message) {
                console.log(error)
                // Set pesan kesalahan dari server
            } else {
                console.error('Error adding user:', error);
            }
        }
    };

    const DeleteDataUser = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/users/${userData.id}`);
            setShowDelete(false);
            fetchData();
            window.location.reload();
            alert("Data berhasil dihapus");
        } catch (error) {
            console.error('Error deleting user:', error);
            alert("Data gagal dihapus");
        }
    };

    const UpdateDataUser = async (e) => {
        e.preventDefault();
        console.log('Profile yang akan dikirim:', userData);
        if (!validateForm()) {
            return;
        }
        // Jika ada gambar yang diunggah, lakukan validasi gambar
        if (userData.ttd instanceof File) {
            // Validasi format file gambar
            const allowedExtensions = /(\.png)$/i;
            if (!allowedExtensions.exec(userData.ttd.name)) {
                alert('Format gambar harus PNG!');
                return;
            }

            // Validasi ukuran file gambar
            if (userData.ttd.size > 2 * 1024 * 1024) {
                alert('Ukuran gambar tidak boleh lebih dari 2 MB!');
                return;
            }
        }
        try {
            const missingFields = [];
            if (!userData.username) missingFields.push('Username');
            if (!userData.nama_user) missingFields.push('Nama User');
            if (!userData.no_hp) missingFields.push('No HP');
            if (!selectedRole) missingFields.push('Role');
    
            if (missingFields.length > 0) {
                throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}.`);
            }
    
            // Lanjutkan dengan mengirimkan permintaan PUT jika semua bidang yang diperlukan telah diisi
            const formData = new FormData();
            formData.append('username', userData.username);
            formData.append('nama_user', userData.nama_user);
            formData.append('no_hp', userData.no_hp);
           
            formData.append('role', selectedRole);

            // Jika pengguna memasukkan password baru, tambahkan password baru ke FormData
            if (userData.password) {
                formData.append('password', userData.password);
            }

            // Jika pengguna tidak memasukkan password baru, abaikan bidang password

            // Periksa apakah pengguna memilih file gambar TTD baru
            if (userData.ttd instanceof File) {
                formData.append('ttd', userData.ttd);
            }
    
            await axios.post(`http://localhost:8000/api/users/update/${userData.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setShow(false);
            fetchData();
            window.location.reload();
            alert("Update data berhasil");
        } catch (error) {
            console.error('Error updating user:', error);
            alert("Update data gagal");
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
                <div className='datapengguna' >
                    <div className='body-flex'>
                        <div className='flex mx-6 d-flex justify-content-center'>
                            <div className='col-11 p-6'>
                                <h2 className='mb-3'style={{ backgroundColor: '#436850', padding: '15px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', color: 'white' }}>Data Pengguna</h2>
                                {/* Modal DELETE */}
                                <Modal show={showDelete} onHide={closeModalDelete} centered>
                                    
                                    <Modal.Body className="text-center" style={{ borderBottom: 'none' }}>
                                        <FontAwesomeIcon icon={faExclamationTriangle} className="text-danger mb-3" style={{ fontSize: '6em' }} />
                                        <h4>Apakah anda yakin?</h4>
                                        <p>Data yang sudah dihapus mungkin tidak bisa dikembalikan lagi!</p>
                                        <Button variant="primary" onClick={closeModalDelete}>Batal</Button>
                                        &nbsp;
                                        &nbsp;
                                        <Button variant="danger" onClick={DeleteDataUser}>Hapus</Button>
                                    </Modal.Body>
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
                                                    onChange={(e) => {
                                                        setUserData({ ...userData, username: e.target.value });
                                                        setUsernameError(false);
                                                    }}
                                                    value={userData.username}
                                                />
                                                {usernameError && <p style={{ color: 'red' }}>Username wajib diisi!</p>}
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Masukkan password baru"
                                                    onChange={(e) => {
                                                        setUserData({ ...userData, password: e.target.value });
                                                        setPasswordError(false);
                                                    }}
                                                    value={userData.password}
                                                />
                                                {passwordError && <p style={{ color: 'red' }}>{passwordErrorMessage}</p>}
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputNama">
                                                <Form.Label>Nama User</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    onChange={(e) => {
                                                        setUserData({ ...userData, nama_user: e.target.value });
                                                        setNamaUserError(false);
                                                    }}
                                                    value={userData.nama_user}
                                                />
                                                {namaUserError && <p style={{ color: 'red' }}>Nama user wajib diisi!</p>}
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputNohp">
                                                <Form.Label>No HP</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    onChange={(e) => {
                                                        setUserData({ ...userData, no_hp: e.target.value });
                                                        setNoHpError(false);
                                                    }}
                                                    value={userData.no_hp}
                                                />
                                                {noHpError && <p style={{ color: 'red' }}>Nomor HP wajib diisi!</p>}
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputTtd">
                                                <Form.Label>TTD</Form.Label>
                                                <Form.Control
                                                    type="file"
                                                    onChange={(e) => setUserData({...userData, ttd: e.target.files[0]})}
                                                />
                                                {userData.ttd_url && <img src={userData.ttd_url} alt="TTD" style={{ width: '50px', height: '50px' }} />}
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
                                                        <Dropdown.Item onClick={() => setSelectedRole('admin')}>Admin</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => setSelectedRole('sarpras')}>Sarpras</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => setSelectedRole('ketua_program')}>Ketua Program Keahlian</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => setSelectedRole('kepsek')}>Kepala Sekolah</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => setSelectedRole('guru')}>Guru</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => setSelectedRole('siswa')}>Siswa</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
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
                                        <Form onSubmit={AddDataUser}>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputUsername">
                                                <Form.Label>Username</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    autoFocus
                                                    onChange={(e) => {
                                                        setUserData({ ...userData, username: e.target.value });
                                                        setUsernameError(false);
                                                    }}
                                                    value={userData.username}
                                                />
                                                {usernameError && <p style={{ color: 'red' }}>Username wajib diisi!</p>}
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    onChange={(e) => {
                                                        setUserData({ ...userData, password: e.target.value });
                                                        setPasswordError(false);
                                                    }}
                                                    value={userData.password}
                                                />
                                                {passwordError && <p style={{ color: 'red' }}>{passwordErrorMessage}</p>}
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputNama">
                                                <Form.Label>Nama User</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    onChange={(e) => {
                                                        setUserData({ ...userData, nama_user: e.target.value });
                                                        setNamaUserError(false);
                                                    }}
                                                    value={userData.nama_user}
                                                />
                                                {namaUserError && <p style={{ color: 'red' }}>Nama user wajib diisi!</p>}
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputNohp">
                                                <Form.Label>No HP</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    onChange={(e) => {
                                                        setUserData({ ...userData, no_hp: e.target.value });
                                                        setNoHpError(false);
                                                    }}
                                                    value={userData.no_hp}
                                                />
                                                {noHpError && <p style={{ color: 'red' }}>Nomor HP wajib diisi!</p>}
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
                                                        <Dropdown.Item onClick={() => {setSelectedRole('admin');setRoleError(false);setUserData({...userData, role: 'admin'});}}>Admin</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => {setSelectedRole('sarpras');setRoleError(false);setUserData({...userData, role: 'sarpras'});}}>Sarpras</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => {setSelectedRole('ketua_program');setRoleError(false);setUserData({...userData, role: 'ketua_program'});}}>Ketua Program Keahlian</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => {setSelectedRole('kepsek');setRoleError(false);setUserData({...userData, role: 'kepsek'});}}>Kepala Sekolah</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => {setSelectedRole('guru');setRoleError(false);setUserData({...userData, role: 'guru'});}}>Guru</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => {setSelectedRole('siswa');setRoleError(false);setUserData({...userData, role: 'siswa'});}}>Siswa</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                {roleError && <p style={{ color: 'red' }}>Role wajib dipilih!</p>}
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
                                            {/* <th>Password</th> */}
                                            <th>Nama User</th>
                                            <th>No HP</th>
                                            <th>TTD</th>
                                            <th>Role</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user, index) => (
                                            <tr key={user.id}>
                                                <td>{index + 1}</td>
                                                <td>{user.id}</td>
                                                <td>{user.username}</td>
                                                {/* <td>{user.password}</td> */}
                                                <td>{user.nama_user}</td>
                                                <td>{user.no_hp}</td>
                                                <td><img src={user.ttd_url} alt="TTD" style={{ width: '50px', height: '50px' }} /></td>
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
