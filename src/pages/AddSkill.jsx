import { useState } from "react";
import { categories } from "../data/sampleData";

const EMPTY = {
  name: "",
  skillTeach: "",
  skillLearn: "",
  experience: "Beginner",
  email: "",
  category: "Programming",
};

export default function AddSkill({ onAddSkill }) {
  const [form, setForm] = useState(EMPTY);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.skillTeach.trim()) e.skillTeach = "Please enter a skill you can teach";
    if (!form.skillLearn.trim()) e.skillLearn = "Please enter a skill you want to learn";
    if (!form.email.trim()) e.email = "Contact email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const newSkill = {
      ...form,
      id: Date.now().toString(),
    };

    onAddSkill(newSkill);
    setForm(EMPTY);
    setErrors({});
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  const catOptions = categories.filter((c) => c !== "All");

  return (
    <div className="page">
      <div className="page-inner form-page">
        <div className="page-header">
          <h1>Offer a Skill</h1>
          <p>List what you know and what you'd like to learn in return.</p>
        </div>

        <div className="form-card">
          {success && (
            <div className="form-success">
              ✅ Your skill has been listed! Other students can now find you.
            </div>
          )}

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                Your Name <span>*</span>
              </label>
              <input
                className="form-input"
                type="text"
                name="name"
                placeholder="e.g. Geethika"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && (
                <span style={{ color: "var(--orange)", fontSize: "0.78rem", marginTop: "0.25rem", display: "block" }}>
                  {errors.name}
                </span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">
                Category <span>*</span>
              </label>
              <div className="form-select-wrap">
                <select
                  className="form-select"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  {catOptions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                Skill I Can Teach <span>*</span>
              </label>
              <input
                className="form-input"
                type="text"
                name="skillTeach"
                placeholder="e.g. Web Development"
                value={form.skillTeach}
                onChange={handleChange}
              />
              {errors.skillTeach && (
                <span style={{ color: "var(--orange)", fontSize: "0.78rem", marginTop: "0.25rem", display: "block" }}>
                  {errors.skillTeach}
                </span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">
                Skill I Want to Learn <span>*</span>
              </label>
              <input
                className="form-input"
                type="text"
                name="skillLearn"
                placeholder="e.g. Machine Learning"
                value={form.skillLearn}
                onChange={handleChange}
              />
              {errors.skillLearn && (
                <span style={{ color: "var(--orange)", fontSize: "0.78rem", marginTop: "0.25rem", display: "block" }}>
                  {errors.skillLearn}
                </span>
              )}
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Experience Level</label>
              <div className="form-select-wrap">
                <select
                  className="form-select"
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Email / Contact <span>*</span>
              </label>
              <input
                className="form-input"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span style={{ color: "var(--orange)", fontSize: "0.78rem", marginTop: "0.25rem", display: "block" }}>
                  {errors.email}
                </span>
              )}
            </div>
          </div>

          <button className="form-submit" onClick={handleSubmit}>
            ☕ List My Skill
          </button>
        </div>
      </div>
    </div>
  );
}
