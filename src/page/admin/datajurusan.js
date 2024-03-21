import React from 'react'
import Sidebar from "../../component/Slidebar.js";
import Jurusan from "../../DataJurusan/Datajurusan.js"

const datajurusan = () => {
  return (
    <div>
      <Sidebar />
      <Jurusan/>
    </div>
  )
}

export default datajurusan
