import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUsers, faChartBar, faThLarge, faBox, faClipboardList, faCogs, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/smk ijo.jpg";
import "./sidebar.css"

const Slidebar = () => {
  return (
    <div>
      <div class="navigation">
          <ul>
            <li>
              <a href="#">
                <span className="">
                  <div className="logo1">
                    {/* <img src={logo} alt="Logo"/> */}
                  </div>
                </span>
                <span className="title">Si Mantar</span>
              </a>
            </li>

            <li>
              <a href="/dashboard">
                <span class="icon">
                  <FontAwesomeIcon icon={faHome} />
                </span>
                <span class="title">Dashboard</span>
              </a>
            </li>

            <li>
              <a href="/datapengguna">
                <span class="icon">
                <FontAwesomeIcon icon={faUsers} />
                </span>
                <span class="title">Data Pengguna</span>
              </a>
            </li>

            <li>
              <a href="/datajurusan">
                <span class="icon">
                <FontAwesomeIcon icon={faChartBar} />
                </span>
                <span class="title">Data Program Keahlian</span>
              </a>
            </li>

            <li>
              <a href="/dataruangan">
                <span class="icon">
                <FontAwesomeIcon icon={faThLarge} />
                </span>
                <span class="title">Data Ruangan</span>
              </a>
            </li>

            <li>
              <a href="databarang">
                <span class="icon">
                <FontAwesomeIcon icon={faBox} />
                </span>
                <span class="title">Data Barang</span>
              </a>
            </li>
            
            <li>
              <a href="#">
                <span class="icon">
                <FontAwesomeIcon icon={faClipboardList} />
                </span>
                <span class="title">Peminjaman</span>
              </a>
            </li>

            <li>
              <a href="#">
                <span class="icon">
                <FontAwesomeIcon icon={faClipboardList} />
                </span>
                <span class="title">Laporan</span>
              </a>
            </li>

            <li>
              <a href="#">
                <span class="icon">
                <FontAwesomeIcon icon={faCogs} />
                </span>
                <span class="title">Pengaturan</span>
              </a>
            </li>
            
            <li>
              <a href="#">
                <span class="icon">
                <FontAwesomeIcon icon={faSignOutAlt} />
                </span>
                <span class="title">Logout</span>
              </a>
            </li>
          </ul>
        </div>
    </div>
  )
}

export default Slidebar
