function LessonPlanForm() {
    return (
        <div className="form">
            <h1>Create a New Lesson...</h1>
            <form>
                <label htmlFor="lessonObjective" required>Lesson Objective</label>
                <input type="text" placeholder="Enter Lesson Objective" />

                <label htmlFor="successCriteria">Success Criteria</label>
                <input type="text" placeholder="Enter Success Criteria" />

                <label htmlFor="subject" required>Subject</label>
                <select name="subject" id="subject">
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
                <select name="ncStatement" id="ncStatement">
                    <option value="placeholder">Coming Soon</option>
                </select>

                <label htmlFor="lessonPlan" required>Lesson Plan</label>
                <textarea name="text" id="lessonPlan" cols="30" rows="10" placeholder="Type your lesson plan here" />

                <label htmlFor="resources">Resources</label>
                <input type="file" placeholder="Upload Lesson Files" name="resources" />

                <label htmlFor="lessonLink">Useful Links</label>
                <input type="url" placeholder="Copy useful URLs" name="lessonLink" />

                <button type="submit">Create Lesson</button>
                <button type="button">Delete</button>
            </form>
        </div>
    )
}

export default LessonPlanForm;