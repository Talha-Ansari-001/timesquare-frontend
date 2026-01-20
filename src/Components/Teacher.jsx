import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Teacher = () => {
  const navigate = useNavigate();

  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [newName, setNewName] = useState("");
  const [newStream, setNewStream] = useState("");
  const [newRef, setNewRef] = useState("");
  const [newGender, setNewGender] = useState("");

  // Fetch data
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("https://timesquare-backend.onrender.com/teachers");
        const data = await res.json();
        setTeachers(data);
        setFilteredTeachers(data);
      } catch (error) {
        console.error("Error fetching teachers", error);
      }
    };
    getData();
  }, []);

  // Search
  const searching = (e) => {
    e.preventDefault();

    if (!newName && !newStream && !newRef && !newGender) {
      alert("Enter something to search...!!!");
      return;
    }

    const nameLower = (newName || "").trim().toLowerCase();
    const streamLower = (newStream || "").trim().toLowerCase();
    const refLower = (newRef || "").trim().toLowerCase();
    const genderLower = (newGender || "").trim().toLowerCase();

    const result = teachers.filter((t) => {
      const matchesName =
        !nameLower ||
        t.Name.toLowerCase() === nameLower ||
        t.Surname.toLowerCase() === nameLower;

      const matchesStream =
        !streamLower || t.Stream.toLowerCase() === streamLower;

      const matchesRef =
        !refLower || t.Reference.toLowerCase() === refLower;

      const matchesGender =
        !genderLower || t.Gender.toLowerCase() === genderLower;

      return matchesName && matchesStream && matchesRef && matchesGender;
    });

    setFilteredTeachers(result);
  };

  // Clear filters
  const clear = () => {
    setFilteredTeachers(teachers);
    setNewName("");
    setNewStream("");
    setNewRef("");
    setNewGender("");
  };

  return (
    <div className="page-wrapper">
      <div id="tSearch">
        <h3 className="text-center hd pt-44">Teacher Records</h3>

        {/* Search bar */}
        <form className="teacher-form teacher-search-form" onSubmit={searching}>
          <input
            type="text"
            placeholder="Name or Surname"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />

          <select
            id="selection"
            value={newStream}
            onChange={(e) => setNewStream(e.target.value)}
          >
            <option value="">Select Stream</option>
            <option value="IT">IT</option>
            <option value="Non IT">Non IT</option>
          </select>

          <select
            value={newRef}
            onChange={(e) => setNewRef(e.target.value)}
          >
            <option value="">Select Reference</option>
            <option value="Family">Family</option>
            <option value="Friends">Friends</option>
            <option value="Banner">Banner</option>
            <option value="Others">Others</option>
          </select>

          <select value={newGender} onChange={(e) => setNewGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <button type="submit">Search</button>
          <button type="button" onClick={clear}>Clear</button>
          <button type="button" className="add-btn" onClick={() => navigate("/TeacherForm")}>Add Teacher</button>
        </form>

        <hr />

        {/* Table */}
        <div className="teacherData" id="Date_1">
          <table className="teacher-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Stream</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map((t, index) => (
                <tr className="rows" key={t.Id}>
                  <td>{index + 1}</td>
                  <td>
                    {t.Name} {t.Surname}
                  </td>
                  <td>{t.Stream}</td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() =>
                        navigate("/TeacherView", { state: { id: t.Id } })
                      }
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Teacher;