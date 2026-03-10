export default function SkillCard({ skill, onRequest, isMatch }) {
  const initial = skill.name.charAt(0).toUpperCase();

  const expClass = {
    Beginner: "exp-beginner",
    Intermediate: "exp-intermediate",
    Advanced: "exp-advanced",
  }[skill.experience] || "exp-beginner";

  return (
    <div className="skill-card">
      <div className="skill-card-header">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1 }}>
          <div className="skill-card-avatar">{initial}</div>
          <div className="skill-card-name-block">
            <div className="skill-card-name">{skill.name}</div>
            <div className="skill-card-category">{skill.category}</div>
          </div>
        </div>
        <span className={`exp-badge ${expClass}`}>{skill.experience}</span>
      </div>

      <div className="skill-divider"></div>

      <div className="skill-card-body">
        <div className="skill-row">
          <span className="skill-row-label">🎓 Teaches</span>
          <span className="skill-row-value">{skill.skillTeach}</span>
        </div>
        <div className="skill-row">
          <span className="skill-row-label">📚 Wants</span>
          <span className="skill-row-value">{skill.skillLearn}</span>
        </div>
        {skill.email && (
          <div className="skill-row">
            <span className="skill-row-label">✉️ Contact</span>
            <span className="skill-row-value" style={{ fontSize: "0.8rem", opacity: 0.7 }}>
              {skill.email}
            </span>
          </div>
        )}
      </div>

      <div className="skill-card-footer">
        <button className="btn-request" onClick={() => onRequest(skill)}>
          Request Exchange
        </button>
        {isMatch && <span className="match-badge">🎯 Match!</span>}
      </div>
    </div>
  );
}
