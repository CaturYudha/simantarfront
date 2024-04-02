import React from 'react';
import './laporan.css';

const Laporan = () => {
  return (
    <div className="surat-container">
      <div className="header-row">
        <div className="header-col">
          <strong>PEMERINTAH PROVINSI JAWA TIMUR</strong><br />
          DINAS PENDIDIKAN<br />
          SEKOLAH MENENGAH KEJURUAN NEGERI 1. MEJAYAN
        </div>
      </div>
      <div className="header-row">
        <div className="header-col">
          J Imam Bonjol No. 7 Telp. (0351) 388 490, Email: smkn.mejayan@yahoo.co.id
        </div>
        <div className="header-col center-align">
          MADIUN
        </div>
        <div className="header-col right-align">
          USULAN SURAT REKOMENDASI TEMPAT PRAKTIK KERJA LAPANGAN (PKL)
        </div>
      </div>
      <div className="header-row">
        <div className="header-col left-align">
          Tahun ajaran 2024/2025
        </div>
        <div className="header-col center-align">
          SMK NEGERI I MEJAYAN
        </div>
        <div className="header-col right-align">
          Kode Pos 63153
        </div>
      </div>
      <div className="table-row header-row">
        <div className="table-col left-align">NO.</div>
        <div className="table-col">NAMA</div>
        <div className="table-col">NO. INDUK</div>
        <div className="table-col">KELAS</div>
        <div className="table-col">DU/DI</div>
      </div>
      <div className="table-row">
        <div className="table-col left-align">1</div>
        <div className="table-col">Apa Ay Hermawati</div>
        <div className="table-col">3</div>
        <div className="table-col">XI EPL</div>
        <div className="table-col">Inea</div>
      </div>
      <div className="table-row">
        <div className="table-col left-align">2</div>
        <div className="table-col">Aulia Patri Rahmawati</div>
        <div className="table-col">3490/610 063</div>
        <div className="table-col">XIRPL</div>
        <div className="table-col">Inea</div>
      </div>
      <div className="header-row">
        <div className="header-col left-align">
          <p>Kepala Pimpinan</p>
          <p>Alamat : J Yos Sudarso No 71, Madiun 63122, Jawa Timur</p>
          <p>No Telp Hp (0351) 452271-74</p>
        </div>
        <div className="header-col right-align">
          <p>Pelaksanaan PKI.</p>
          <p>Mulai tanggal 01 bulan Juni tahun 2024 s/d tanggal 30 bulan November tahun 2024 (enam bulan)</p>
          <p>Ketua Program Keahlian Pengembangan Perangkat Lunak dan Gim</p>
          <p>ANANDA EKA SETIAWAN, S. Pd</p>
          <p>NIP 19871004 201503 | 002</p>
          <p>Mejayan</p>
          <p>Pembimbing PKL. 2023/2024</p>
          <p>NIP PEMERINTAH PROVINSI JAWA TIMUR DINAS PENDIDIKAN SEKOLAH MENENGAH KEJURUAN NEGERI 1 . MEJAYAN J Imam Bonjol No. 7 Telp . ( 0351 ) 388 490 , Email smkn.mejayan@yahoo.co.id MADIUN</p>
        </div>
      </div>
    </div>
  );
};

export default Laporan;
