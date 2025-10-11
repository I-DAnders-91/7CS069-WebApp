import { useState } from "react";

export default function LessonPlanForm() {

    const [values, setValues] = useState({
        // Map form fields to backend API fields
        objective: '',
        subject: '',
        year_group: '',
        date: '',
        success_criteria: '',
        activities: '',
        created_at: '',
        updated_at: '',
        useful_links: [] as string[],
        attachments: null as File | null,
    });

    const [errors, setErrors] = useState<Errors>({});
    const [saving, setSaving] = useState(false);
    
    const handleChanges = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
        ) => {
            const { name, value } = e.target;
            setValues((v) => ({ ...v, [name]: value }));
        };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0] ?? null;
        setValues((v) => ({ ...v, attachments: f}));
    };

    const handleLinksChange = (links: string[]) => {
        setValues((v) => ({ ...v, useful_links: links }));
    };

    const resetForm = () => {
        setValues({
        objective: '',
        subject: '',
        year_group: '',
        date: '',
        success_criteria: '',
        activities: '',
        created_at: '',
        updated_at: '',
        useful_links: [] as string[],
        attachments: null as File | null,
        });
        setErrors({});
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setErrors({});
    }

    try {
        // build api endpoint payload
        const payload = {
        objective: values.objective,
        subject: values.subject,
        year_group: values.year_group || "Year _", // Placeholder until field added
        date: values.date,
        success_criteria: values.success_criteria,
        activities: values.activities,
        useful_links: values.useful_links.filter((u) => u.trim() !== ""),
        };

        const res = await fetch(`${import.meta.env.VITE_API_URL}/lessons`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (res.status === 201) {
            const data = await res.json();
            // TODO: upload attachments to /lessons/{id}/attachments
            alert("Lesson saved!");
            resetForm();
            // TODO: navigate to newly created lesson (`/lessons/${data.id}`)
        } else if (res.status === 422) {
            const body = await res.json();
            setErrors(body.errors || {});
        } else {
            const text = await res.text();
            alert(`Unexpected error (${res.status}): ${text}`);
        }
    } catch (err: any) {
        alert("Network error. Please try again.");
    } finally {
        setSaving(false);
    }
};

const err = (field: string) => errors?.[field]?.[0];
    
return (
    <div className="form">
        <h1 id="page-title" className="mb-3">Create a New Lesson...</h1>
        
        <form onSubmit={onSubmitd} className="row g-3" id="lessonPlanForm" noValidate>

            <div className="col-md-8">
                <label htmlFor="objective" className="form-label" required>Lesson Title / Objective</label>
                <input 
                    type="text" 
                    id="objective"
                    name="objective"
                    className="form-control" 
                    placeholder="Enter Lesson Objective"
                    value={values.objective}
                    onChange={(e) => handleChanges(e)}
                    required
                />
            </div>
            
            <div className="col-md-4">
                <label htmlFor="subject" className="form-label" required>Subject</label>
                <select 
                    id="subject"
                    name="subject"
                    className="form-select"
                    value={values.subject}
                    onChange={handleChanges}
                    required
                    >
                        <option value="" disabled selected>Select subject</option>
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
                {err("subject") && <div className="text-danger small">{err("subject)}</div>}
                </div>

            <div className="col-md-4">
                <label htmlFor="year_group" className="form-label">Year Group</label>
                <select 
                    id="year_group"
                    name="year_group"
                    className="form-select"
                    value={values.year_group}
                    onChange={handleChanges}
                    required
                    >
                        <option value="" disabled selected>Select Year Group</option>
                    <option value="EYFS">EYFS</option>
                    <option value="YR">Reception</option>
                    <option value="Y1">Year 1</option>
                    <option value="Y2">Year 2</option>
                    <option value="Y3">Year 3</option>
                    <option value="Y4">Year 4</option>
                    <option value="Y5">Year 5</option>
                    <option value="Y6">Year 6</option>
                </select>
                    {err("year_group") && <div className="text-danger small">{err("year_group"</div>}
            </div>        
                                                                                  
            <div className="col-md-4">
              <label htmlFor="date" className="form-label">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                className="form-control"
                value={values.date}
                onChange={handleChanges}
                required
              />
          {err("date") && <div className="text-danger small">{err("date")}</div>}
        </div>
                                                                           
        <div className="col-md-8">
            <label htmlFor="success_criteria" class="form-label">Success Criteria</label>
            <input 
                type="text" 
                id="success_criteria"
                name= "success_criteria"
                className="form-control" 
                placeholder="Enter Success Criteria"
                value={values.success_criteria}
                onChange={handleChanges}
            />
            </div>
            
        <div className="col-md-4">
            <label htmlFor="ncStatement" className="form-label">NC Statement</label>
            <select id="ncStatement" className="form-select"
                onChange={(e) => handleChanges(e)}>
                <option value="placeholder" disabled selected>Coming Soon</option>
            </select>
        </div>

        <div className="col-md-12">
            <label htmlFor="activities" className="form-label" required>Lesson Plan / Activities</label>
            <textarea
                id="activities"
                name="activities"
                className="form-control" 
                rows={8} 
                placeholder="Starter, main, plenary..."
                value={values.activities}
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
                onChange={handleChanges}
            />
        </div>

        <div className="col-md-6">
            <UrlList value={values.useful_links} onChange={handleLinksChange} />
            {err("useful_links") && <div className="text-danger small">{err("useful_links")}</div>
            {err("useful_links.0") && <div className="text-danger small">{err("useful_links.0")}</div>
                    </div>

        <div className="col-md-8">
            <button type="submit" id="create-btn" className="btn btn-primary app-button" disabled={saving}>
                {saving ? "Saving..." : "Create Lesson"}
            </button>
        </div>
        <div className="col-md-4">
            <button type="button" id="reset-btn" className="btn btn-outline-secondary app-button" onClick={resetForm}>
                Reset
            </button>
        </div>
    </form>
</div>
);
}

function UrlList({
    value,
    onChange,
}: {
    value: string[];
    onChange: (links: string[]) => void;
}) {
  const [inputValue, setInputValue] = useState("");
    
  const handleAddLink = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    onChange([...(value || []), trimmed]);
    setInputValue("");
  };

  const handleRemoveLink = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label htmlFor="lessonLink" className="form-label">Useful Links</label>
      <div className="input-group mb-3">
        <input
          id="lessonLink"
          type="url"
          className="form-control"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="https://example.com"
        />
        <button className="btn btn-outline-secondary" type="button" onClick={handleAddLink}>
          Add
        </button>
      </div>

      {value?.length ? (
        <ul className="list-group mt-2">
          {value.map((u, i) => (
            <li key={`${u}-${i}`} className="list-group-item d-flex justify-content-between align-items-center">
              <span className="text-truncate" style={{ maxWidth: "80%" }}>{u}</span>
              <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleRemoveLink(i)}>
                ✖
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
