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
            <form onSubmit={handleSubmit} className="row g-3" id="lessonPlanForm">

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
                        <UrlList />
                    </div>

                <div className="col-md-8">
                    <button type="submit" id="create-btn" className="btn btn-primary app-button">Create Lesson</button>
                    </div>
                <div className="col-md-4">
                    <button type="button" id="reset-btn" className="app-button" onClick={confirmReset}>Reset</button>
                    </div>
            </form>
        </div>
    )
}

function UrlList() {
  const [inputValue, setInputValue] = useState("");
  const [links, setLinks] = useState([]);

  const handleAddLink = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    setLinks((prev) => [...prev, trimmed]);
    setInputValue("");
  };

  const handleRemoveLink = (index) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label htmlFor="lessonLink" className="form-label">
        Useful Links
      </label>
      <div className="input-group mb-3">
        <input
          id="lessonLink"
          type="url"
          className="form-control"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a URL"
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={handleAddLink}
        >
          Add
        </button>
      </div>

      {links.length > 0 && (
        <ul className="list-group mt-2">
          {links.map((u, i) => (
            <li
              key={`${u}-${i}`}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>{u}</span>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleRemoveLink(i)}
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function confirmReset() {
  let text = "Are you sure you want to delete this lesson?";
  if (confirm(text) == true) {
    document.getElementById('lessonPlanForm').reset();
  } else {
    text = "Not reset";
  }
}

export default LessonPlanForm;