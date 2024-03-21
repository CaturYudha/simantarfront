import React from 'react'
import Sidebar from "../../component/Slidebar.js";
import Barang from "../../DataBarang/Databarang.js"

const databarang = () => {
  return (
    <div>
      <Sidebar/>
      <Barang/>
    </div>
  )
}

export default databarang
