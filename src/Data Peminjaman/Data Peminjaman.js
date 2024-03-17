import "./Data Peminjaman";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/smk ijo.jpg";
import "./Data Peminjaman.css";

function Dasboard() {
  return (
    <container>
      <div class="container">
        <div class="navigation">
          <ul>
            <li>
              <a href="#">
                <span className="">
                  <div className="logo1">
                    <img src={logo} alt="Logo"/>
                  </div>
                </span>
                <span className="title">Brand Name</span>
              </a>
            </li>

            <li>
              <a href="#">
                <span class="icon">
                  <FontAwesomeIcon icon={faHome} />
                </span>
                <span class="title">Dashboard</span>
              </a>
            </li>

            <li>
              <a href="#">
                <span class="icon">
                  <ion-icon name="people-outline"></ion-icon>
                </span>
                <span class="title">Customers</span>
              </a>
            </li>

            <li>
              <a href="#">
                <span class="icon">
                  <ion-icon name="chatbubble-outline"></ion-icon>
                </span>
                <span class="title">Messages</span>
              </a>
            </li>

            <li>
              <a href="#">
                <span class="icon">
                  <ion-icon name="help-outline"></ion-icon>
                </span>
                <span class="title">Help</span>
              </a>
            </li>

            <li>
              <a href="#">
                <span class="icon">
                  <ion-icon name="settings-outline"></ion-icon>
                </span>
                <span class="title">Settings</span>
              </a>
            </li>
            
            <li>
              <a href="#">
                <span class="icon">
                  <ion-icon name="lock-closed-outline"></ion-icon>
                </span>
                <span class="title">Password</span>
              </a>
            </li>
            
            <li>
              <a href="#">
                <span class="icon">
                  <ion-icon name="log-out-outline"></ion-icon>
                </span>
                <span class="title">Sign Out</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="main">
          <div class="topbar">
            <div class="toggle">
              <ion-icon name="menu-outline"></ion-icon>
            </div>

            <div class="search">
              <label>
                <input type="text" placeholder="Search here" />
                <ion-icon name="search-outline"></ion-icon>
              </label>
            </div>

            <div class="user">
              <img src="assets/imgs/customer01.jpg" alt="" />
            </div>
          </div>
          <div class="cardBox">
            <div class="card">
              <div>
                <div class="numbers">1,504</div>
                <div class="cardName">Total Barang</div>
              </div>

              <div class="iconBx">
                <ion-icon name="eye-outline"></ion-icon>
              </div>
            </div>

            <div class="card">
              <div>
                <div class="numbers">80</div>
                <div class="cardName">Kondisi baik</div>
              </div>

              <div class="iconBx">
                <ion-icon name="cart-outline"></ion-icon>
              </div>
            </div>

            <div class="card">
              <div>
                <div class="numbers">284</div>
                <div class="cardName">Kondisi Rusak Ringan </div>
              </div>

              <div class="iconBx">
                <ion-icon name="chatbubbles-outline"></ion-icon>
              </div>
            </div>

            <div class="card">
              <div>
                <div class="numbers">7,842</div>
                <div class="cardName">Kondisi Rusak Berat</div>
              </div>

              <div class="iconBx">
                <ion-icon name="cash-outline"></ion-icon>
              </div>
            </div>
          </div>
          <div class="details">
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
          </div>
        </div>
      </div>
    </container>
  );
}
export default Dasboard;
