import { useState, useEffect, useRef } from "react";
import "./css/style.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Skills from "./pages/Skills";
import AddSkill from "./pages/AddSkill";

import { sampleSkills } from "./data/sampleData";

// ── LocalStorage helpers ──
const LS_SKILLS = "learnmate_skills";

function loadFromLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveToLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [skills, setSkills] = useState(() => loadFromLS(LS_SKILLS, sampleSkills));
  const [popup, setPopup]               = useState(false);
  const [popupClosing, setPopupClosing] = useState(false);
  const [toast, setToast]               = useState(null);
  const closeTimer = useRef(null);
  const hideTimer  = useRef(null);

  // My own latest-added skill (for matching)
  const [mySkillLearn, setMySkillLearn] = useState(() => {
    const stored = loadFromLS(LS_SKILLS, sampleSkills);
    const mine = stored.find((s) => !sampleSkills.find((ss) => ss.id === s.id));
    return mine?.skillLearn || "";
  });

  useEffect(() => { saveToLS(LS_SKILLS, skills); }, [skills]);

  // ── Toast ──
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Popup helpers ──
  const closePopup = () => {
    clearTimeout(closeTimer.current);
    clearTimeout(hideTimer.current);
    setPopupClosing(true);
    hideTimer.current = setTimeout(() => {
      setPopup(false);
      setPopupClosing(false);
    }, 350);
  };

  // ── Add skill ──
  const handleAddSkill = (newSkill) => {
    setSkills((prev) => [newSkill, ...prev]);
    setMySkillLearn(newSkill.skillLearn);
    showToast(`"${newSkill.skillTeach}" listed successfully!`);
    setTimeout(() => setActivePage("skills"), 1500);
  };

  // ── Request exchange → show popup ──
  const handleRequest = () => {
    clearTimeout(closeTimer.current);
    clearTimeout(hideTimer.current);
    setPopup(true);
    setPopupClosing(false);
    closeTimer.current = setTimeout(() => closePopup(), 2000);
  };

  // ── Page renderer ──
  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <Home setActivePage={setActivePage} skillsCount={skills.length} />;
      case "skills":
        return (
          <Skills
            skills={skills}
            onRequest={handleRequest}
            userSkill={mySkillLearn}
          />
        );
      case "add-skill":
        return <AddSkill onAddSkill={handleAddSkill} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      <main>{renderPage()}</main>

      <Footer />

      {/* ── Request Sent Popup ── */}
      {popup && (
        <div
          className={`popup-overlay ${popupClosing ? "popup-hiding" : ""}`}
          onClick={closePopup}
        >
          <div
            className={`popup-box ${popupClosing ? "popup-box-hiding" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="popup-close" onClick={closePopup}>×</button>
            <div className="popup-icon">✅</div>
            <h3 className="popup-title">Request Sent Successfully!</h3>
            <p className="popup-sub">The student will be notified of your exchange request.</p>
          </div>
        </div>
      )}

      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.type === "success" ? "✅" : "⚠️"} {toast.msg}
        </div>
      )}
    </div>
  );
}
