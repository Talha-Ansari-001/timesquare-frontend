import React, { useEffect, useState } from "react";

const Home = () => {
  const [Students, setStudents] = useState(0);
  const [Teachers, setTeachers] = useState(0);

  useEffect(() => {
    const load = async () => {
      let teacherRes = await fetch("https://timesquare-backend.onrender.com/teachers");
      let studentRes = await fetch("https://timesquare-backend.onrender.com/StudentData");
      teacherRes = await teacherRes.json();
      studentRes = await studentRes.json();
      setStudents(studentRes.length);
      setTeachers(teacherRes.length);
    }

    load();
  }, [])



  return (
    <div id="main">
      <h1 className="text-center hd pt-44">Dashboard</h1>
      <div id="outer-box">
        <div id="box1" className="boxes primary-box">
          <span className="box-title">Active Students</span>
          <span className="box-value">{Students}</span>
        </div>
        <div id="box2" className="boxes">
          <span className="box-title">Total Teachers</span>
          <span className="box-value">{Teachers}</span>
        </div>
        <div id="box3" className="boxes">
          <span className="box-title">Courses Running</span>
          <span className="box-value">0</span>
        </div>
        <div id="box4" className="boxes">
          <span className="box-title">Today’s Admissions</span>
          <span className="box-value">0</span>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Home;
