import { useState } from "react";
import SkillCard from "../components/SkillCard";
import { categories } from "../data/sampleData";

export default function Skills({ skills, onRequest, userSkill }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Skill match: find skills where they teach what the current user wants to learn
  const isMatch = (skill) => {
    if (!userSkill) return false;
    return skill.skillTeach.toLowerCase() === userSkill.toLowerCase();
  };

  const filtered = skills.filter((s) => {
    const q = search.toLowerCase();
    const matchesSearch =
      s.name.toLowerCase().includes(q) ||
      s.skillTeach.toLowerCase().includes(q) ||
      s.skillLearn.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q);
    const matchesCategory =
      activeCategory === "All" || s.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Put matches at the top
  const sorted = [...filtered].sort((a, b) => (isMatch(b) ? 1 : 0) - (isMatch(a) ? 1 : 0));

  return (
    <div className="page">
      <div className="page-inner">
        <div className="page-header">
          <h1>Browse Skills</h1>
          <p>Discover what students around you can teach.</p>
        </div>

        <div className="controls">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              type="text"
              placeholder="Search by skill, name, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-tabs" style={{ marginBottom: "2rem" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-tab ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {sorted.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>No skills found</h3>
            <p>Try adjusting your search or filter.</p>
          </div>
        ) : (
          <div className="skills-grid">
            {sorted.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                onRequest={onRequest}
                isMatch={isMatch(skill)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
