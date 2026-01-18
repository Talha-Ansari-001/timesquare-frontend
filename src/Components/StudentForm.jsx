import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const TeacherForm = () => {

    const navigate = useNavigate();
    const [Name, setName] = useState("");
    const [Surname, setSurname] = useState("");
    const [Edu, setEdu] = useState("");
    const [Gender, setGender] = useState("");
    const [Course, setCourse] = useState("");
    const [Age, setAge] = useState("");
    const [Add, setAdd] = useState("");
    const [Adno, setAdno] = useState("");
    const [Ref, setRef] = useState("");
    const [Mob, setMob] = useState("");
    const [BirthDate, setBirthDate] = useState("");

    const submit = async (e) => {
        e.preventDefault();

        const formData = {
            Name: Name.trim(),
            Surname: Surname.trim(),
            Edu: Edu.trim(),
            Course: Course.trim(),
            Adno: Number(Adno),
            Mob: Number(Mob),
            Age: Number(Age),
            Add: Add.trim(),
            Ref: Ref.trim(),
            Gender: Gender.trim(),
            BirthDate: BirthDate
        };

        console.log("formData:", formData);
        // console.log(formData["Gender"]);

        const hasEmptyField = Object.entries(formData).some(([key, value]) => {
            if (typeof value === "string") {
                return value.trim() === "";          // empty text or date
            }
            if (typeof value === "number") {
                return Number.isNaN(value);          // NaN = not filled/invalidbut 
            }
            return value == null;                  // null or undefined
        });


        if (hasEmptyField) {
            alert("All fields are required");
            return;
        }

        // Aadhaar: exactly 12 digits
        if (String(Adno).length !== 12) {
            alert("Aadhaar number must be 12 digits");
            return;
        }

        // Mobile: exactly 10 digits
        if (String(Mob).length !== 10) {
            alert("Mobile number must be 10 digits");
            return;
        }


        try {
            const response = await fetch("https://your-service-name.onrender.com/StudentData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Failed to submit");
            }

            alert("Form submitted successfully!");
        } catch (err) {
            console.error(err.status);
            alert("Error submitting form");
        }
    };

    // Closing the Form
    const closing = () => {
        // just clear filters if you want
        setName("");
        setSurname("");
        setEdu("");
        setCourse("");
        setAdd("");
        setAdno("");
        setRef("");
        setMob("");
        setBirthDate("");
        setGender("");
        setAge("");
    };

    //Initializing Variables
    // const [teachers, setTeachers] = useState([]);
    // const [newName, setnewName] = useState("");
    // const [newCourse, setnewCourse] = useState("");

    return (
        <>
            <div className="page-wrapper">
                <div className="teacher-container" id='tForm'>
                    <h3 className="text-center">Student Entry</h3>
                    <button id="cross" className="floating-btn" onClick={() => { closing(true); navigate("/Student") }}>
                        X
                    </button>
                    <form className="teacher-form" onSubmit={submit}>

                        <div className="form-group">
                            <label id="nohtingasnkd">Name</label>
                            <input id="asndksandsanjdn" type="text" value={Name} onChange={e => setName(e.target.value)} required />
                        </div>

                        <div className="form-group">
                            <label>Surname</label>
                            <input type="text" value={Surname} onChange={e => setSurname(e.target.value)} required />
                        </div>

                        <div className="form-group">
                            <label>Current Education</label>
                            <input type="text" value={Edu} onChange={e => setEdu(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Address</label>
                            <input type="text" value={Add} onChange={e => setAdd(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Aadhaar Number</label>
                            <input type="text" value={Adno} maxLength={12} onChange={e => { const onlyDigits = e.target.value.replace(/\D/g, ""); if (onlyDigits.length <= 12) setAdno(onlyDigits); }} />
                        </div>

                        <div className="form-group">
                            <label>Age</label>
                            <input type="number" className="fields" value={Age} onChange={e => setAge(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Reference</label>
                            <input type="text" value={Ref} onChange={e => setRef(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Mobile Number</label>
                            <input type="text" value={Mob} maxLength={10} onChange={e => { const onlyDigits = e.target.value.replace(/\D/g, ""); if (onlyDigits.length <= 10) setMob(onlyDigits); }} />
                        </div>

                        <div className="form-group">
                            <label>Date Of Birth</label>
                            <input type="date" value={BirthDate} onChange={e => setBirthDate(e.target.value)} />
                        </div>

                        <div className="form-group form-group-row">
                            <div className="field">
                                <label>Course</label>
                                <select id="selection1" value={Course} onChange={e => setCourse(e.target.value)}>
                                    <option value="">Select Course</option>
                                    <option value="Computer Champs">Computer Champs</option>
                                    <option value="Computer Fundamentals">Computer Fundamentals</option>
                                    <option value="Advanced Excel">Advanced Excel</option>
                                    <option value="Tally Prime + GST">Tally Prime + GST</option>
                                </select>
                            </div>

                            <div className="field">
                                <label>Gender</label>
                                <select id="gender" value={Gender} onChange={e => setGender(e.target.value)}>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>

                        <button className="submit-button" type="submit">Submit</button>

                    </form>

                </div>
            </div>
        </>
    )
}

export default TeacherForm
