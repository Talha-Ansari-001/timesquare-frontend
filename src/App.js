import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet
} from "react-router-dom";

// CSS

import "../src/Css/Header.css"
import "../src/Css/Student.css"
import "../src/Css/Teacher.css"
import "../src/Css/Home.css"
import "../src/Css/Batch.css"

// React Components
import Login from "./Components/Login";
import Sidebar from "./Components/Sidebar";
import Home from "./Components/Home";
import Teacher from "./Components/Teacher";
import TeacherForm from "./Components/TeacherForm";
import TeacherView from "./Components/TeacherView";
import Student from "./Components/Student";
import StudentView from "./Components/StudentView";
import StudentForm from "./Components/StudentForm";

const MainLayout = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  )
}

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<MainLayout />}>
            <Route path="/Teacher" element={<Teacher />} />
            <Route path="/TeacherForm" element={<TeacherForm />} />
            <Route path="/TeacherView" element={<TeacherView />} />
            <Route path="/StudentView" element={<StudentView />} />
            <Route path="/StudentForm" element={<StudentForm />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Student" element={<Student />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;