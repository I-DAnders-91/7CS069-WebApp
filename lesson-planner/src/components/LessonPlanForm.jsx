import { useState } from "react";

function LessonPlanForm() {

    const [values, setValues] = useState({
        lessonObjective: '',
        successCriteria: '',
        subject: '',
        ncStatement: '',
        lessonPlan: '',
        resources: null,
        lessonLink: ''
    })

    const handleChanges = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted with values:', values);
        // TODO - submit data to backend
    }

    return (
        <div className="form">
            <h1>Create a New Lesson...</h1>
            <form onSubmit={handleSubmit} className="row g-3">

                <div className="col-md-8">
                    <label htmlFor="lessonObjective" className="form-label" required>Lesson Objective</label>
                    <input type="text" id="lessonObjective" className="form-control" placeholder="Enter Lesson Objective" 
                    onChange={(e) => handleChanges(e)}/>
                </div>
                <div className="col-md-4">
                    <label htmlFor="subject" className="form-label" required>Subject</label>
                    <select id="subject" className="form-select"
                    onChange={(e) => handleChanges(e)}>
                        <option value="" disabled selected>Select subject</option>
                        <option value="maths">Maths</option>
                        <option value="english">English</option>
                        <option value="science">Science</option>
                        <option value="geography">Geography</option>
                        <option value="history">History</option>
                        <option value="languages">Languages</option>
                        <option value="art">Art</option>
                        <option value="music">Music</option>
                        <option value="dt">DT</option>
                        <option value="computing">Computing</option>
                        <option value="re">RE</option>
                        <option value="pshe">PSHE</option>
                        <option value="pe">PE</option>
                    </select>
                </div>

                <div className="col-md-8">
                    <label htmlFor="successCriteria" class="form-label">Success Criteria</label>
                    <input type="text" id="successCriteria" class="form-control" placeholder="Enter Success Criteria" 
                    onChange={(e) => handleChanges(e)}/>
                </div>
                <div className="col-md-4">
                    <label htmlFor="ncStatement" className="form-label">NC Statement</label>
                    <select id="ncStatement" className="form-select"
                    onChange={(e) => handleChanges(e)}>
                        <option value="placeholder" disabled selected>Coming Soon</option>
                    </select>
                </div>

                <div className="col-md-12">
                    <label htmlFor="lessonPlan" className="form-label" required>Lesson Plan</label>
                    <textarea id="lessonPlan" className="form-control" rows="10" placeholder="Type your lesson plan here" 
                    onChange={(e) => handleChanges(e)}/>
                </div>

                <div className="col-md-6">
                    <label htmlFor="resources" className="form-label">Resources</label>
                    <input type="file" className="form-control" placeholder="Upload Lesson Files" id="resources" 
                    onChange={(e) => handleChanges(e)}/>
                </div>

                <div className="col-md-6">
                    <label htmlFor="lessonLink">Useful Links</label>
                    <div className="input-group">
                        <button className="btn btn-outline-secondary" type="button" id="addUrl">Add</button>
                        <input type="url" className="form-control" placeholder="Copy useful URLs" id="lessonLink" 
                        onChange={(e) => handleChanges(e)}/>
                        <ul>
                        //TODO: Links should appear here when added
                            <li>Useful URL 1 </li>
                        </ul>
                        </div>

                </div>
                <div className="col-md-8">
                    <button type="submit" className="btn btn-primary">Create Lesson</button>
                    </div>
                <div className="col-md-4">
                    <button type="button" id="delete-btn">Delete</button>
                    </div>
            </form>
        </div>
    )
}

export default LessonPlanForm;