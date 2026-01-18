import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const TeacherForm = () => {

    const navigate = useNavigate();

    //Submitting The Form
    const submit = async (e) => {
        e.preventDefault();

        const formData = {
            Name: Name.trim(),
            Surname: Surname.trim(),
            Edu: Edu.trim(),
            Stream: Stream.trim(),
            Comm: Number(Comm),
            Adno: Number(Adno),
            Mob: Number(Mob),
            Age: Number(Age),
            Add: Add.trim(),
            Ref: Ref.trim(),
            Gender: Gender.trim(),
            Date: JoinDate // from input type="JoinDate"
        };

        console.log("formData:", formData);
        console.log(formData["Gender"]);

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

        if (String(Mob).length !== 10) {
            alert("Mobile number must be 10 digits");
            return;
        }

        if (String(Adno).length !== 12) {
            alert("Aadhaar number must be 12 digits");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/teacherData", {
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
            console.error(err);
            alert("Error submitting form");
        }
    };

    // Closing the Form
    const closing = () => {
        // just clear filters if you want
        setName("");
        setSurname("");
        setEdu("");
        setStream("");
        setComm("");
        setAdd("");
        setAdno("");
        setRef("");
        setMob("");
        setJoinDate("");
        setGender("");
        setAge("");
    };


    //Initializing Variables
    // const [teachers, setTeachers] = useState([]);
    // const [newName, setnewName] = useState("");
    // const [newStream, setnewStream] = useState("");
    const [Name, setName] = useState("");
    const [Surname, setSurname] = useState("");
    const [Edu, setEdu] = useState("");
    const [Gender, setGender] = useState("");
    const [Stream, setStream] = useState("");
    const [Comm, setComm] = useState("");
    const [Age, setAge] = useState("");
    const [Add, setAdd] = useState("");
    const [Adno, setAdno] = useState("");
    const [Ref, setRef] = useState("");
    const [Mob, setMob] = useState("");
    const [JoinDate, setJoinDate] = useState("");

    return (
        <>
            <div className="page-wrapper">
                <div className="teacher-container" id='tForm'>
                    <h3 className="text-center">Teacher Entry</h3>
                    <button id="cross" className="floating-btn" onClick={() => { closing(true); navigate("/Teacher") }}>
                        X
                    </button>
                    <form className="teacher-form" onSubmit={submit}>


                        <div className="form-group">
                            <label id='nohtingasnkd'>Name</label>
                            <input id='asndksandsanjdn' type="text" value={Name} onChange={(e) => setName(e.target.value)} required />
                        </div>


                        <div className="form-group">
                            <label>Surname</label>
                            <input type="text" value={Surname} onChange={(e) => setSurname(e.target.value)} required />
                        </div>


                        <div className="form-group">
                            <label>Last Education</label>
                            <input type="text"
                                value={Edu}
                                onChange={(e) => setEdu(e.target.value)}
                            />
                        </div>


                        <div className="form-group">
                            <label>Address</label>
                            <input
                                type="text"
                                value={Add}
                                onChange={(e) => setAdd(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Aadhaar Number</label>
                            <input
                                type="text"
                                maxLength="12"
                                value={Adno}
                                onChange={(e) => setAdno(e.target.value)}
                            />
                        </div>

                        <div className="form-group form-group-row2">
                            <div className="field">
                                <label>Commission</label>
                                <input
                                    type="number"
                                    className='fields'
                                    value={Comm}
                                    onChange={(e) => setComm(e.target.value)}
                                />
                            </div>


                            <div className="field">
                                <label>Age</label>
                                <input
                                    type="number"
                                    className='fields'
                                    value={Age}
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Reference</label>
                            <input
                                type="text"
                                value={Ref}
                                onChange={(e) => setRef(e.target.value)}
                            />
                        </div>


                        <div className="form-group">
                            <label>Mobile Number</label>
                            <input
                                type="tel"
                                maxLength="10"
                                value={Mob}
                                onChange={(e) => setMob(e.target.value)}
                            />
                        </div>


                        <div className="form-group">
                            <label>Date Of Joining</label>
                            <input
                                type="date"
                                value={JoinDate}
                                onChange={(e) => setJoinDate(e.target.value)}
                            />
                        </div>

                        <div className="form-group form-group-row">
                            <div className="field">
                                <label>Stream</label>
                                <select
                                    id="selection1"
                                    value={Stream}
                                    onChange={(e) => setStream(e.target.value)}
                                >
                                    <option value="">Select</option>
                                    <option value="IT">IT</option>
                                    <option value="Non IT">Non IT</option>
                                </select>
                            </div>

                            <div className="field">
                                <label>Gender</label>
                                <select
                                    id="gender"
                                    value={Gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>

                        <button className="submit-button" type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default TeacherForm
