import {useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function EditLesson() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        objective: "",
        subject: "",
        year_group: "",
        date: "",
        success_criteria: "",
        activities: "",
        useful_links: [],
    });
    const [linkInput, setLinkInput] = useState("");
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        let ignore = false;
        async function load() {
            try {
                const res = await fetch(`/api/lessons/${id}`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                if (!ignore) {
                    setForm({
                        objective: data.objective || "",
                        subject: data.subject || "",
                        year_group: data.year_group || "",
                        date: data.date || "",
                        success_criteria: data.success_criteria || "",
                        activities: data.activities || "",
                        useful_links: data.useful_links || [],
                    });
                }
            } catch (error) {
                console.error(error);
                if (!ignore) setErrors({ load: "Could not load lesson." });
            } finally {
                setLoading(false);
            }
        }
        load();
        return () => { ignore = true; };
    }, [id]);

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const err = (field) => (errors && errors[field] ? errors[field][0] : undefined);

    // ...existing addLink, removeLink, onSubmit...

    // Add a resetForm function if you want to reset to initial state
    const resetForm = () => {
        setForm({
            objective: "",
            subject: "",
            year_group: "",
            date: "",
            success_criteria: "",
            activities: "",
            useful_links: [],
        });
        setErrors(null);
    };

    if (loading) return <div className="container py-4">Loading...</div>;
    if (typeof errors === "string") return <div className="container py-4 text-danger">{errors}</div>;

    return (
    <div className="form">
        <Link to={`/lessons/${id}`} className="btn btn-sm btn-outline-secondary mb-3">Back</Link>
      <h1 id="page-title" className="mb-3">Edit Lesson...</h1>
      {errors?._form && <div className="alert alert-danger">{errors._form[0]}</div>}

      <form onSubmit={onSubmit} className="row g-3" id="editLesson" noValidate>
        <div className="col-md-8">
          <label htmlFor="objective" className="form-label">Lesson Title / Objective</label>
          <input
            type="text"
            id="objective"
            name="objective"
            className="form-control"
            placeholder="Enter Lesson Objective"
            value={form.objective}
            onChange={handleChanges}
            required
          />
          {err("objective") && <div className="text-danger small">{err("objective")}</div>}
        </div>

        <div className="col-md-4">
          <label htmlFor="subject" className="form-label">Subject</label>
          <select
            id="subject"
            name="subject"
            className="form-select"
            value={form.subject}
            onChange={handleChanges}
            required
          >
            <option value="" disabled>Select subject</option>
            <option value="Maths">Maths</option>
            <option value="English">English</option>
            <option value="Science">Science</option>
            <option value="Geography">Geography</option>
            <option value="History">History</option>
            <option value="Languages">Languages</option>
            <option value="Art">Art</option>
            <option value="Music">Music</option>
            <option value="DT">DT</option>
            <option value="Computing">Computing</option>
            <option value="RE">RE</option>
            <option value="PSHE">PSHE</option>
            <option value="PE">PE</option>
          </select>
          {err("subject") && <div className="text-danger small">{err("subject")}</div>}
        </div>

        <div className="col-md-6">
          <label htmlFor="year_group" className="form-label">Year Group</label>
          <select
            id="year_group"
            name="year_group"
            className="form-select"
            value={form.year_group}
            onChange={handleChanges}
            required
          >
            <option value="" disabled>Select Year Group</option>
            <option value="EYFS">EYFS</option>
            <option value="YR">Reception</option>
            <option value="Y1">Year 1</option>
            <option value="Y2">Year 2</option>
            <option value="Y3">Year 3</option>
            <option value="Y4">Year 4</option>
            <option value="Y5">Year 5</option>
            <option value="Y6">Year 6</option>
          </select>
          {err("year_group") && <div className="text-danger small">{err("year_group")}</div>}
        </div>

        <div className="col-md-6">
          <label htmlFor="date" className="form-label">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            className="form-control"
            value={form.date}
            onChange={handleChanges}
            required
          />
          {err("date") && <div className="text-danger small">{err("date")}</div>}
        </div>

        <div className="col-md-8">
          <label htmlFor="success_criteria" className="form-label">Success Criteria</label>
          <input
            type="text"
            id="success_criteria"
            name="success_criteria"
            className="form-control"
            placeholder="Enter Success Criteria"
            value={form.success_criteria}
            onChange={handleChanges}
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="ncStatement" className="form-label">NC Statement</label>
          <select
            id="ncStatement"
            name="ncStatement"
            className="form-select"
            value={form.ncStatement || ""}
            onChange={handleChanges}
          >
            <option value="placeholder" disabled>Coming Soon</option>
          </select>
        </div>

        <div className="col-md-12">
          <label htmlFor="activities" className="form-label">Lesson Plan / Activities</label>
          <textarea
            id="activities"
            name="activities"
            className="form-control"
            rows={8}
            placeholder="Starter, main, plenary..."
            value={form.activities}
            onChange={handleChanges}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="attachments" className="form-label">Resources</label>
          <input
            type="file"
            id="attachments"
            name="attachments"
            className="form-control"
            // onChange={handleFile} // implement if needed
          />
        </div>

        <div className="col-md-6">
          {/* Replace with your UrlList component if needed */}
          {/* <UrlList value={form.useful_links} onChange={handleLinksChange} /> */}
          {err("useful_links") && <div className="text-danger small">{err("useful_links")}</div>}
          {err("useful_links.0") && <div className="text-danger small">{err("useful_links.0")}</div>}
        </div>

        <div className="col-md-10">
          <button type="submit" id="create-btn" className="btn btn-primary app-button" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
        <div className="col-md-2">
          <button type="button" id="reset-btn" className="btn btn-outline-secondary app-button" onClick={resetForm}>
            <i className="bi bi-x-octagon reset-btn"></i>
          </button>
        </div>
      </form>
    </div>
  );
}