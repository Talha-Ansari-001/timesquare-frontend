import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddBatch = () => {
    const navigate = useNavigate();
    const [selectedStudentId, setSelectedStudentId] = useState("");
    const [Teachers, setTeachers] = useState([]);
    const [Students, setStudents] = useState([]);
    const [Name, setName] = useState([]);
    const [Course, setCourse] = useState([]);
    const [Teacher, setTeacher] = useState([]);
    const [TData, setTData] = useState([]);


    // Get Teachers Data
    useEffect(() => {
        const getTeachers = async () => {
            let response = await fetch("https://your-service-name.onrender.com/teachers");
            response = await response.json();
            setTeachers(response);
        };
        getTeachers();
    }, []);


    async function gettingStudents(Course) {
        console.log(Course);
        const res = await fetch("https://your-service-name.onrender.com/StudentData");
        const data = await res.json();
        const result = data.filter(e => e.Course === Course);
        setStudents(result);
    }

    const addStudents = () => {
        const s = Students.find((st) => st.Id === Number(selectedStudentId));
        if (!s) return;

        // prevent duplicates
        setTData((prev) => {
            const alreadyExists = prev.some((item) => item.Id === s.Id);
            if (alreadyExists) return prev;        // no change
            return [...prev, s];
        });
    };


    const handleRemove = (id) => {
        setTData((prev) => prev.filter((s) => s.Id !== id));
    };

    const saving = () => {
        console.log(TData);
    }

    return (
        <div className="page-wrapper">
            <div className="teacher-container" id='tForm'>
                <h3 className="text-center">Batch Entry</h3>
                <button id="cross" className="floating-btn" onClick={() => { navigate("/Batch") }}>
                    X
                </button>
                <form className="teacher-form" onSubmit={() => { saving() }}>

                    <div className="form-group">
                        <label id="nohtingasnkd">Batch Name</label>
                        <input id="asndksandsanjdn" required value={Name} onChange={(e) => { setName(e.target.value) }} />
                    </div>

                    <div className="form-group">
                        <label>Course</label>
                        <select className="selection1" required value={Course} onChange={(e) => {
                            const selectedCourse = e.target.value; setCourse(selectedCourse);
                            gettingStudents(selectedCourse);
                        }}>
                            <option value="">Select Course</option>
                            <option value="Computer Champs">Computer Champs</option>
                            <option value="Computer Fundamentals">Computer Fundamentals</option>
                            <option value="Advanced Excel">Advanced Excel</option>
                            <option value="Tally Prime + GST">Tally Prime + GST</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Teacher Assigned</label>
                        <select name="" id="" className='selection1' required value={Teacher} onChange={(e) => { setTeacher(e.target.value) }}>
                            <option value="">Select Teacher</option>
                            {
                                Teachers.map((t) => (
                                    <option value={t.Name}>{t.Name + " " + t.Surname}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Timing</label>
                        <select name="" id="" className='selection1'>
                            <option value="">Select Timing</option>
                            <option value="10:00 - 12:00">10:00 - 12:00</option>
                            <option value="04:00 - 06:00">04:00 - 06:00</option>
                            <option value="06:00 - 08:00">06:00 - 08:00</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Start Data</label>
                        <input type="date" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="">End Data</label>
                        <input type="date" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Add Students</label>
                        <select className="selection1" required value={selectedStudentId} onChange={(e) => setSelectedStudentId(e.target.value)}>
                            <option value="">Select Student</option>
                            {
                                Students.map((t) => (
                                    <option key={t.Id} value={t.Id}>
                                        {t.Name + " " + t.Surname}
                                    </option>
                                ))
                            }
                        </select>

                        <button className="submit-button" type="button" onClick={() => { addStudents() }} >Add Student</button>
                    </div>
                    <div className="batch-bottom">
                        <table className="batch-table">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    TData.map((t, index) => (
                                        < tr key={t.Id} >
                                            <td>{index + 1}</td>
                                            <td>{t.Name + " " + t.Surname}</td>
                                            <td>
                                                <button className="remove-btn" type="button" onClick={() => handleRemove(t.Id)}>Remove</button>
                                            </td>
                                        </ tr>
                                    ))
                                }
                            </tbody>

                        </table>

                        <button className="submit-button" type="submit" onClick={() => { saving() }}>Submit</button>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default AddBatch
