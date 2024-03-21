import React from 'react'
import Sidebar from "../../component/Slidebar.js";
import Ruangan from "../../DataRuangan/Dataruangan.js"

const dataruangan = () => {
  return (
    <div>
      <Sidebar/>
      <Ruangan/>
    </div>
  )
}

export default dataruangan
