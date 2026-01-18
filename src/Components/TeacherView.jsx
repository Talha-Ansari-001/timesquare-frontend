import { React, useState, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom";


const TeacherView = () => {
    const location = useLocation();
    const teacherId = location.state?.id; // likely a number or string
    const navigate = useNavigate();

    const [teachers, setTeachers] = useState([]);

    const [btnName, setbtnName] = useState("Edit");
    const [submitting, setsubmitting] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [Name, setName] = useState("");
    const [Surname, setSurname] = useState("");
    const [Edu, setEdu] = useState("");
    const [Gender, setGender] = useState("Male");
    const [Stream, setStream] = useState("");
    const [Comm, setComm] = useState("");
    const [Age, setAge] = useState("");
    const [Add, setAdd] = useState("");
    const [Adno, setAdno] = useState("");
    const [Ref, setRef] = useState("");
    const [Mob, setMob] = useState("");
    const [JoinDate, setJoinDate] = useState("");

    // teachers = 0;
    for (let index = 0; index < 1; index++) {
        console.log(teachers);
    }

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch("https://your-service-name.onrender.com/teachers");
                const data = await res.json();
                setTeachers(data);

                // ensure types match: convert both to numbers
                const idNum = Number(teacherId);
                const teacher = data.find(t => Number(t.Id) === idNum);

                if (!teacher) {
                    console.warn("Teacher not found for id:", teacherId);
                    return;
                }

                const joining = teacher.Joining_Date
                    ? new Date(teacher.Joining_Date).toISOString().slice(0, 10)
                    : "";
                console.log(teacher.Mobile_number);
                setName(teacher.Name);
                setSurname(teacher.Surname);
                setEdu(teacher.Education);
                setAdd(teacher.Address);
                setAdno(teacher.Adno);
                setComm(teacher.Comm);
                setAge(teacher.Age);
                setRef(teacher.Reference);
                setMob(teacher.Mobile_number);
                setJoinDate(joining);
                setStream(teacher.Stream);
                setGender(teacher.Gender);
            } catch (err) {
                console.error("Error fetching teachers", err);
            }
        };

        if (teacherId != null) {
            load();
        }
    }, [teacherId]);

    const updating = () => {
        // alert("Updating");
        setDisabled(false);
        setbtnName("Save")
        setsubmitting(true);
    }

    const save = async (e) => {
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
            teacherId: Number(teacherId),
            Add: Add.trim(),
            Ref: Ref.trim(),
            Gender: Gender.trim(),
            Date: JoinDate // from input type="JoinDate"
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

        if (String(Mob).length !== 10) {
            alert("Mobile number must be 10 digits");
            return;
        }

        if (String(Adno).length !== 12) {
            alert("Aadhaar number must be 12 digits");
            return;
        }

        try {
            const response = await fetch("https://your-service-name.onrender.com/updateData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Failed to submit");
            }

            alert("Form Updated successfully!");
        } catch (err) {
            console.error(err);
            alert("Error submitting form");
        }
    };

    const deleting = async () => {
        alert("Deleting");
        const formData = { id: teacherId };
        console.log(formData);

        try {
            const response = await fetch("https://your-service-name.onrender.com/deletingTeacherData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to submit");
            }

            alert("Teacher is Deleted");
            navigate("/Teacher")
        } catch (err) {
            console.error(err);
            alert("Error Deleting form");
        }
    };

    return (
        <>
            <div className="page-wrapper">
                <div className="teacher-container" id='tView'>
                    <h3 className="text-center">Teacher Detail</h3>
                    <button id="cross" className="floating-btn" onClick={() => { navigate("/Teacher") }}>X</button>
                    <form className="teacher-form" onSubmit={(e) => { save(e) }}>

                        <div className="form-group">
                            <label id='nohtingasnkd'>Name</label>
                            <input id='asndksandsanjdn' type="text" value={Name} onChange={(e) => setName(e.target.value)} required disabled={disabled} />
                        </div>

                        <div className="form-group">
                            <label>Surname</label>
                            <input type="text" value={Surname} onChange={(e) => setSurname(e.target.value)} required disabled={disabled} />
                        </div>


                        <div className="form-group">
                            <label>Last Education</label>
                            <input type="text" value={Edu} onChange={(e) => setEdu(e.target.value)} disabled={disabled} />
                        </div>


                        <div className="form-group">
                            <label>Address</label>
                            <input type="text" value={Add} onChange={(e) => setAdd(e.target.value)} disabled={disabled} />
                        </div>

                        <div className="form-group">
                            <label>Aadhaar Number</label>
                            <input type="text" maxLength="12" value={Adno} onChange={(e) => setAdno(e.target.value)} disabled={disabled} />
                        </div>

                        <div className="form-group form-group-row2">
                            <div className="field">
                                <label>Commission</label>
                                <input type="number" value={Comm} onChange={(e) => setComm(e.target.value)} disabled={disabled} />
                            </div>

                            <div className="field">
                                <label>Age</label>
                                <input type="number" value={Age} onChange={(e) => setAge(e.target.value)} disabled={disabled} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Reference</label>
                            <input type="text" value={Ref} onChange={(e) => setRef(e.target.value)} disabled={disabled} />
                        </div>


                        <div className="form-group">
                            <label>Mobile Number</label>
                            <input type="tel" maxLength="10" value={Mob} onChange={(e) => setMob(e.target.value)} disabled={disabled} />
                        </div>


                        <div className="form-group">
                            <label>Date Of Joining</label>
                            <input type="date" value={JoinDate} onChange={(e) => setJoinDate(e.target.value)} disabled={disabled} />
                        </div>

                        <div className="form-group form-group-row">
                            <div className="field">
                                <label>Stream</label>
                                <select id="selection1" value={Stream} onChange={(e) => setStream(e.target.value)} disabled={disabled}>
                                    <option value="IT">IT</option>
                                    <option value="Non IT">Non IT</option>
                                </select>
                            </div>

                            <div className="field">
                                <label>Gender</label>
                                <select id="gender" value={Gender} onChange={(e) => setGender(e.target.value)} disabled={disabled}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>

                        <button className="submit-button" type="button" onClick={(e) => { (!submitting) ? updating() : save(e) }}>
                            {btnName}
                        </button>
                        {/* <button className="submit-button" type="submit">
                            Save
                        </button> */}
                        <button className="submit-button" type="button" onClick={() => { navigate("/Teacher") }}>
                            Cancel
                        </button>
                        <button className="submit-button delete-button" type="button" onClick={() => { deleting() }}>
                            Delete
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default TeacherView