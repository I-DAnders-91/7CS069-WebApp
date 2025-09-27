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
            <form onSubmit={handleSubmit}>
                <label htmlFor="lessonObjective" required>Lesson Objective</label>
                <input type="text" name="lessonObjective" placeholder="Enter Lesson Objective" 
                onChange={(e) => handleChanges(e)}/>

                <label htmlFor="successCriteria">Success Criteria</label>
                <input type="text" name="successCriteria" placeholder="Enter Success Criteria" 
                onChange={(e) => handleChanges(e)}/>

                <label htmlFor="subject" required>Subject</label>
                <select name="subject" id="subject"
                onChange={(e) => handleChanges(e)}>
                    <option value="" disabled selected>Select a subject</option>
                    <option value="maths">Maths</option>
                    <option value="english">English</option>
                    <option value="science">Science</option>
                    <option value="geography">Geography</option>
                    <option value="history">History</option>
                    <option value="languages">Languages</option>
                    <option value="art">Art</option>
                    <option value="music">Music</option>
                    <option value="dt">Design Technology</option>
                    <option value="computing">Computing</option>
                    <option value="re">Religious Education</option>
                    <option value="pshe">Personal, Social, Health, and Economics</option>
                    <option value="pe">Physical Education</option>
                </select>

                <label htmlFor="ncStatement">National Curriculum Statement</label>
                <select name="ncStatement" id="ncStatement"
                onChange={(e) => handleChanges(e)}>
                    <option value="placeholder" disabled selected>Coming Soon</option>
                </select>

                <label htmlFor="lessonPlan" required>Lesson Plan</label>
                <textarea name="lessonPlan" cols="30" rows="10" placeholder="Type your lesson plan here" 
                onChange={(e) => handleChanges(e)}/>

                <label htmlFor="resources">Resources</label>
                <input type="file" placeholder="Upload Lesson Files" name="resources" 
                onChange={(e) => handleChanges(e)}/>

                <label htmlFor="lessonLink">Useful Links</label>
                <input type="url" placeholder="Copy useful URLs" name="lessonLink" 
                onChange={(e) => handleChanges(e)}/>

                <button type="submit">Create Lesson</button>
                <button type="button">Delete</button>
            </form>
        </div>
    )
}

export default LessonPlanForm;