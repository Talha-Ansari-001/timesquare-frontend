import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHome, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";

const Sidebar = () => {
  const [Navi, setNavi] = useState("");

  const activeStyle = {
    color: "#b0b0b0" // grey
  };

  const normalStyle = {
    color: "white"
  };

  return (
    <div id='SidebarStyle'>
      <p className='text-center mt-3 fs-5'>Times Square Academy</p>
      <hr className='mt-4' />

      <Link
        className="toLink mt"
        to="/Home"
        onClick={() => setNavi("Home")}
        style={Navi === "Home" ? activeStyle : normalStyle}
      >
        <FaHome style={{ marginRight: "10px" }} />
        Home
      </Link>

      <Link
        className="toLink mt"
        to="/Teacher"
        onClick={() => setNavi("Teachers")}
        style={Navi === "Teachers" ? activeStyle : normalStyle}
      >
        <FaChalkboardTeacher style={{ marginRight: "10px" }} />
        Teachers
      </Link>

      <Link
        className="toLink mt"
        to="/Student"
        onClick={() => setNavi("Students")}
        style={Navi === "Students" ? activeStyle : normalStyle}
      >
        <FaUserGraduate style={{ marginRight: "10px" }} />
        Students
      </Link>
    </div>
  )
}

export default Sidebar;
