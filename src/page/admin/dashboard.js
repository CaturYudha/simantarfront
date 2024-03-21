import React from 'react'
import Sidebar from "../../component/Slidebar.js";
import Konten from "../../Data Peminjaman/Dashboard.js"

const dashboard = () => {
  return (
    <div>
      <Sidebar/>
      <Konten/>
    </div>
  )
}

export default dashboard
