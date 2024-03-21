import React, { useState, useEffect} from 'react';
// import "./Dashboard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTools, faBox, faExclamationTriangle, faUsers, faChartBar, faThLarge, faReceipt, faClipboardCheck, faClipboardQuestion, faCheckCircle, faClipboardList, faSearch} from '@fortawesome/free-solid-svg-icons'; // Import ikon yang diperlukan
import avatar from "../assets/images.png";
import "./Dashboard.css";
import Slidebar from '../component/Slidebar';

function Dasboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
          <div className="welcome">
            <h3>Hallo Admin</h3> 
            <p>Selamat Datang Kembali di SiMantar</p>
          </div>
          <div class="cardBox">
          <div class="box">
            <div>
                <div class="numbers">32</div>
                <div class="cardName">Total Pengguna</div>
              </div>

              <div class="iconBx">
              <FontAwesomeIcon icon={faUsers} /> 
              </div>
            </div>

            <div class="box">
              <div>
                <div class="numbers">5</div>
                <div class="cardName">Total Program Keahlian</div>
              </div>

              <div class="iconBx">
              <FontAwesomeIcon icon={faChartBar} /> 
              </div>
            </div>

            <div class="box">
              <div>
                <div class="numbers">15</div>
                <div class="cardName">Total Ruangan</div>
              </div>

              <div class="iconBx">
              <FontAwesomeIcon icon={faThLarge} /> 
              </div>
            </div>

            <div class="box">
              <div>
                <div class="numbers">1,504</div>
                <div class="cardName">Total Barang</div>
              </div>

              <div class="iconBx">
              <FontAwesomeIcon icon={faBox} /> 
              </div>
            </div>

            <div class="box">
              <div>
                <div class="numbers">80</div>
                <div class="cardName">Barang Kondisi baik</div>
              </div>

              <div class="iconBx">
              <FontAwesomeIcon icon={faCheckCircle} /> 
              </div>
            </div>

            <div class="box">
              <div>
                <div class="numbers">284</div>
                <div class="cardName">Barang Kondisi Rusak</div>
              </div>

              <div class="iconBx">
              <FontAwesomeIcon icon={faExclamationTriangle} /> 
              </div>
            </div>

            <div class="box">
              <div>
                <div class="numbers">742</div>
                <div class="cardName">Transaksi Peminjaman</div>
              </div>

              <div class="iconBx">
              <FontAwesomeIcon icon={faClipboardList} /> 
              </div>
            </div>

            <div class="box">
              <div>
                <div class="numbers">42</div>
                <div class="cardName">Peminjaman Belum Dikembalikan</div>
              </div>

              <div class="iconBx">
              <FontAwesomeIcon icon={faClipboardQuestion} /> 
              </div>
            </div>
            
            <div class="box">
              <div>
                <div class="numbers">842</div>
                <div class="cardName">Peminjaman Dikembalikan</div>
              </div>

              <div class="iconBx">
              <FontAwesomeIcon icon={faClipboardCheck} /> 
              </div>
            </div>
          </div>
          {/* <div class="details">
            <div class="recentOrders">
              <div class="cardHeader">
                <h2>Recent Orders</h2>
                <a href="#" class="btn">
                  View All
                </a>
              </div>

              <table>
                <thead>
                  <tr>
                    <td>Kode Barang </td>
                    <td>Nama Barang</td>
                    <td>Merek Barang</td>
                    <td>Kategori</td>
                    <td>Tanggal Pembelian</td>
                    <td>Harga</td>
                    <td>
                      Letak barang
                    </td>
                    <td>Jumlah</td>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>deni bagus</td>
                    <td>1</td>
                    <td>12-30-23</td>
                    <td> 88393</td>
                    <td>rungan 1</td>
                    <td>
                      <span class="status delivered">Delivered</span>
                    </td>
                  </tr>

                  <tr>
                    <td>Dell Laptop</td>
                    <td>$110</td>
                    <td>Due</td>
                    <td>
                      <span class="status pending">Pending</span>
                    </td>
                  </tr>

                  <tr>
                    <td>Apple Watch</td>
                    <td>$1200</td>
                    <td>Paid</td>
                    <td>
                      <span class="status return">Return</span>
                    </td>
                  </tr>

                  <tr>
                    <td>Addidas Shoes</td>
                    <td>$620</td>
                    <td>Due</td>
                    <td>
                      <span class="status inProgress">In Progress</span>
                    </td>
                  </tr>

                  <tr>
                    <td>Star Refrigerator</td>
                    <td>$1200</td>
                    <td>Paid</td>
                    <td>
                      <span class="status delivered">Delivered</span>
                    </td>
                  </tr>

                  <tr>
                    <td>Dell Laptop</td>
                    <td>$110</td>
                    <td>Due</td>
                    <td>
                      <span class="status pending">Pending</span>
                    </td>
                  </tr>

                  <tr>
                    <td>Apple Watch</td>
                    <td>$1200</td>
                    <td>Paid</td>
                    <td>
                      <span class="status return">Return</span>
                    </td>
                  </tr>

                  <tr>
                    <td>Addidas Shoes</td>
                    <td>$620</td>
                    <td>Due</td>
                    <td>
                      <span class="status inProgress">In Progress</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="recentCustomers">
              <div class="cardHeader">
                <h2>Aktivitas peminjaman</h2>
              </div>

              <table>
                <tr>
                  <td width="60px">
                    <div class="imgBx">
                      <img src="assets/imgs/customer02.jpg" alt="" />
                    </div>
                  </td>
                  <td>
                    <h4>
                      David <br /> <span>kunci</span>
                    </h4>
                  </td>
                </tr>

                <tr>
                  <td width="60px">
                    <div class="imgBx">
                      <img src="assets/imgs/customer01.jpg" alt="" />
                    </div>
                  </td>
                  <td>
                    <h4>
                      Amit <br /> <span>kunci</span>
                    </h4>
                  </td>
                </tr>

                <tr>
                  <td width="60px">
                    <div class="imgBx">
                      <img src="assets/imgs/customer02.jpg" alt="" />
                    </div>
                  </td>
                  <td>
                    <h4>
                      David <br /> <span>kunci</span>
                    </h4>
                  </td>
                </tr>

                <tr>
                  <td width="60px">
                    <div class="imgBx">
                      <img src="assets/imgs/customer01.jpg" alt="" />
                    </div>
                  </td>
                  <td>
                    <h4>
                      Amit <br /> <span>obeng</span>
                    </h4>
                  </td>
                </tr>

                <tr>
                  <td width="60px">
                    <div class="imgBx">
                      <img src="assets/imgs/customer02.jpg" alt="" />
                    </div>
                  </td>
                  <td>
                    <h4>
                      David <br /> <span>kunci inggris</span>
                    </h4>
                  </td>
                </tr>

                <tr>
                  <td width="60px">
                    <div class="imgBx">
                      <img src="assets/imgs/customer01.jpg" alt="" />
                    </div>
                  </td>
                  <td>
                    <h4>
                      Amit <br /> <span>obeng</span>
                    </h4>
                  </td>
                </tr>

                <tr>
                  <td width="60px">
                    <div class="imgBx">
                      {" "}
                      <img src="assets/imgs/customer01.jpg" alt="" />
                    </div>
                  </td>
                  <td>
                    <h4>
                      David <br /> <span>kunci</span>
                    </h4>
                  </td>
                </tr>

                <tr>
                  <td width="60px">
                    <div class="imgBx">
                      <img src="assets/imgs/customer02.jpg" alt="" />
                    </div>
                  </td>
                  <td>
                    <h4>
                      Amit <br /> <span>India</span>
                    </h4>
                  </td>
                </tr>
              </table>
            </div>
          </div> */}
        </div>
        
      
    </div>
  );
}
export default Dasboard;
