import { React, useState, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom";


const TeacherView = () => {
    const location = useLocation();
    const studentId = location.state?.id; // likely a number or string
    const navigate = useNavigate();

    const [btnName, setbtnName] = useState("Edit");
    const [submitting, setsubmitting] = useState(false);
    const [disabled, setDisabled] = useState(true);
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

    const [Student, setStudent] = useState([]);


    // teachers = 0;
    // for (let index = 0; index < 1; index++) {
    //     console.log(teachers);
    // }

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch("http://localhost:5000/StudentData");
                const data = await res.json();
                setStudent(data);
                // ensure types match: convert both to numbers
                const idNum = Number(studentId);
                const student = data.find(t => Number(t.Id) === idNum);
                console.log("Here is Mobile Number : ", student.Mobile_Number);

                if (!student) {
                    console.warn("Teacher not found for id:", studentId);
                    return;
                }

                const joining = student.Date_Of_Birth ? new Date(student.Date_Of_Birth).toISOString().slice(0, 10) : "";

                // console.log(student.M);

                setName(student.Name);
                setSurname(student.Surname);
                setEdu(student.Current_Edu);
                setAdd(student.Address);
                setAdno(student.Aadhaar_Number);
                setAge(student.Age);
                setRef(student.Reference);
                setMob(student.Mobile_Number);
                setGender(student.Gender);
                setCourse(student.Course);
                setBirthDate(joining);
            }
            catch (err) {
                console.error("Error fetching teachers", err);
            }
        };

        if (studentId != null) {
            load();
        }
    }, [studentId]);

    const updating = () => {
        // alert("Updating");
        setDisabled(false);
        setbtnName("Save")
        setsubmitting(true);
    }

    for (let index = 0; index < 1; index++) {
        console.log(Student);
    }

    const save = async (e) => {
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
            BirthDate: BirthDate,
            studentId
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
            const response = await fetch("http://localhost:5000/updateStudentData", {
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
            console.error(err.status);
            console.error(err.msg);
            alert("Error submitting form");
        }
    };

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

    const deleting = async () => {
        alert("Deleting");
        const formData = { id: studentId };   
        console.log(formData);

        try {
            const response = await fetch("http://localhost:5000/deletingStudentData", {
                method: "POST",              
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to submit");
            }

            alert("Student is Deleted");
            navigate("/Student")
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
                    <button id="cross" className="floating-btn" onClick={() => { closing(); navigate("/Student") }}>X</button>
                    <form className="teacher-form" onSubmit={(e) => { save(e) }}>

                        <div className="form-group">
                            <label >Name</label>
                            <input type="text" value={Name} onChange={(e) => setName(e.target.value)} required disabled={disabled} />
                        </div>

                        <div className="form-group">
                            <label>Surname</label>
                            <input type="text" value={Surname} onChange={(e) => setSurname(e.target.value)} required disabled={disabled} />
                        </div>


                        <div className="form-group">
                            <label>Current Education</label>
                            <input type="text" value={Edu} onChange={(e) => setEdu(e.target.value)} disabled={disabled} />
                        </div>


                        <div className="form-group">
                            <label>Address</label>
                            <input type="text" value={Add} onChange={(e) => setAdd(e.target.value)} disabled={disabled} />
                        </div>

                        <div className="form-group">
                            <label>Aadhaar Number</label>
                            <input type="text" value={Adno} maxLength={12} disabled={disabled} onChange={e => { const onlyDigits = e.target.value.replace(/\D/g, ""); if (onlyDigits.length <= 12) setAdno(onlyDigits); }} />
                        </div>

                        <div className="form-group">
                            <label>Age</label>
                            <input type="number" disabled={disabled} className="fields" value={Age} onChange={e => setAge(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Reference</label>
                            <input type="text" value={Ref} onChange={(e) => setRef(e.target.value)} disabled={disabled} />
                        </div>


                        <div className="form-group">
                            <label>Mobile Number</label>
                            <input type="text" value={Mob} maxLength={10} onChange={(e) => setMob(e.target.value)} disabled={disabled} />
                        </div>


                        <div className="form-group">
                            <label>Date Of Birth</label>
                            <input type="date" disabled={disabled} value={BirthDate} onChange={e => setBirthDate(e.target.value)} />
                        </div>

                        <div className="form-group form-group-row">
                            <div className="field">
                                <label>Course</label>
                                <select id="selection1" disabled={disabled} value={Course} onChange={e => setCourse(e.target.value)}>
                                    <option value="">Select Course</option>
                                    <option value="Computer Champs">Computer Champs</option>
                                    <option value="Computer Fundamentals">Computer Fundamentals</option>
                                    <option value="Advanced Excel">Advanced Excel</option>
                                    <option value="Tally Prime + GST">Tally Prime + GST</option>
                                </select>
                            </div>

                            <div className="field">
                                <label>Gender</label>
                                <select id="gender" disabled={disabled} value={Gender} onChange={e => setGender(e.target.value)}>
                                    <option value="">Select Gender</option>
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
                        <button className="submit-button" type="button" onClick={() => { navigate("/Student") }}>
                            Cancel
                        </button>
                        <button className="submit-button delete-button" type="button" onClick={() => { deleting() }}>
                            Delete
                        </button>
                    </form>
                </div >
            </div >
        </>
    )
}

export default TeacherView