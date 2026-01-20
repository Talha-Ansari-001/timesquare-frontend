import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const Student = () => {
    let navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [filteredStudents, setfilteredStudents] = useState([]);
    const [newName, setnewName] = useState("");
    const [newCourse, setnewCourse] = useState("");
    const [newRef, setnewRef] = useState("");
    const [newGender, setnewGender] = useState("");

    // Getting Data from Database
    const getData = async () => {
        try {
            const res = await fetch("https://timesquare-backend.onrender.com/StudentData");
            const data = await res.json();
            setStudents(data);

        } catch (error) {
            console.error("Error fetching teachers", error.status);
        }
    }

    useEffect(() => {
        getData();
    }, []);


    // Searching in the Data

    const searching = (e, newName, newCourse, newRef, newGender) => {
        e.preventDefault();

        if (!newName && !newCourse && !newRef && !newGender) {
            alert("Enter something to search...!!!");
            return;
        }

        // Default undefined to empty strings
        const nameLower = (newName || "").trim().toLowerCase();
        const courseLower = (newCourse || "").trim().toLowerCase();
        const refLower = (newRef || "").trim().toLowerCase();
        const genderLower = (newGender || "").trim().toLowerCase();

        const result = students.filter(t => {
            const matchesName =
                !nameLower ||
                t.Name.toLowerCase() === nameLower ||
                t.Surname.toLowerCase() === nameLower;

            const matchesCourse =
                !courseLower || t.Course.toLowerCase() === courseLower;

            const matchesRef =
                !refLower || t.Reference.toLowerCase() === refLower;

            const matchesGender =
                !genderLower || t.Gender.toLowerCase() === genderLower;

            return matchesName && matchesCourse && matchesRef && matchesGender;
        });

        setfilteredStudents(result);
    };


    useEffect(() => {
        setfilteredStudents(students);
    }, [students]);

    const clear = () => {
        setfilteredStudents(students);
        setnewName("");
        setnewCourse("");
        setnewRef("");
        setnewGender("");
    }

    return (
        <>
            <div className="page-wrapper">
                <div id='tSearch'>
                    <h3 className='text-center hd pt-44'>Student Records</h3>
                    {/* Form Here */}
                    <form className="teacher-form teacher-search-form">
                        <input type="text" placeholder="Name or Surname" onChange={(e) => { setnewName(e.target.value) }} />
                        <select name="" id="selection" value={newCourse} onChange={(e) => { setnewCourse(e.target.value) }}>
                            <option value="">Select Course</option>
                            <option value="Computer Champs">Computer Champs</option>
                            <option value="Computer Fundamentals">Computer Fundamentals</option>
                            <option value="Advanced Excel">Advanced Excel</option>
                            <option value="Tally Prime + GST">Tally Prime + GST</option>
                        </select>
                        <select name="" value={newRef} onChange={(e) => { setnewRef(e.target.value) }}>
                            <option value="">Select Reference</option>
                            <option value="Family">Family</option>
                            <option value="Friends">Friends</option>
                            <option value="Banner">Banner</option>
                            <option value="Others">Others</option>
                        </select>
                        <select name="" value={newGender} onChange={(e) => { setnewGender(e.target.value) }}>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <button type="button" onClick={(e) => searching(e, newName, newCourse, newRef, newGender)}>Search</button>
                        <button type="button" onClick={() => { clear() }}>Clear</button>
                        <button type="button" onClick={() => navigate("/StudentForm")}>Add Student</button>
                    </form>
                    <hr />
                    {/* Form Data */}
                    <div className="teacherData" id='Date_1'>
                        <table className="teacher-table">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Name</th>
                                    <th>Course</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map((t, index) => (
                                    <tr className="rows" key={t.Id}>
                                        <td>{index + 1}</td>
                                        <td>{t.Name} {t.Surname}</td>
                                        <td>{t.Course}</td>
                                        <td><button className="view-btn" onClick={() => navigate("/StudentView", { state: { id: t.Id } })}> View</button></td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Student