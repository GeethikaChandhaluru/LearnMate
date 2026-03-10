const features = [
  {
    icon: "🔄",
    title: "Skill Sharing",
    desc: "Offer what you know and trade it for what you want to learn. Every student has something valuable.",
  },
  {
    icon: "🎓",
    title: "Peer Learning",
    desc: "Learn directly from fellow students who understand your perspective and learning style.",
  },
  {
    icon: "🌱",
    title: "Community Growth",
    desc: "Build a network of learners and teachers that grows stronger with every exchange.",
  },
  {
    icon: "🛠️",
    title: "Practical Knowledge",
    desc: "Gain hands-on skills you can actually use — no fluff, just real knowledge from real people.",
  },
];

export default function Home({ setActivePage, skillsCount }) {
  return (
    <>
      {/* ── HERO ── */}
      <section className="hero" id="home">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              Student-Powered Learning
            </div>
            <h1 className="hero-title">
              Learn Skills from Students <em>Like You</em>
            </h1>
            <p className="hero-subtitle">
              Share what you know and learn what you want from other students.
              No cost, no gatekeeping — just genuine peer-to-peer exchange.
            </p>
            <div className="hero-actions">
              <button
                className="btn-primary"
                onClick={() => setActivePage("skills")}
              >
                Explore Skills →
              </button>
              <button
                className="btn-secondary"
                onClick={() => setActivePage("add-skill")}
              >
                Offer a Skill
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-stat-cards">
              <div className="hero-stat-card">
                <span className="hero-stat-num">{skillsCount}+</span>
                <div className="hero-stat-label">Skills Listed</div>
              </div>
              <div className="hero-stat-card">
                <span className="hero-stat-num">5</span>
                <div className="hero-stat-label">Categories</div>
              </div>
              <div className="hero-stat-card">
                <span className="hero-stat-num">100%</span>
                <div className="hero-stat-label">Free Forever</div>
              </div>
              <div className="hero-stat-card">
                <span className="hero-stat-num">∞</span>
                <div className="hero-stat-label">Possibilities</div>
              </div>
            </div>

            <div className="hero-match-preview">
              <span className="match-icon">🎯</span>
              <div className="match-text">
                <strong>Smart Skill Matching</strong>
                <span>Instantly find your perfect exchange partner</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="stats-bar">
        <div className="stats-bar-inner">
          {[
            ["🧑‍💻", "Active Students", "200+"],
            ["🔄", "Exchanges Made", "120+"],
            ["🌍", "Cities Reached", "15+"],
            ["⭐", "Avg. Rating", "4.8"],
          ].map(([icon, label, val]) => (
            <div key={label}>
              <span className="stat-item-num">{icon} {val}</span>
              <div className="stat-item-label">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section className="features">
        <div className="section-header">
          <span className="section-label">Why LearnMate?</span>
          <h2 className="section-title">Everything You Need to Start Exchanging</h2>
          <p className="section-subtitle">
            A simple, warm space for students to connect, share expertise, and
            grow together.
          </p>
        </div>

        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <span className="feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
