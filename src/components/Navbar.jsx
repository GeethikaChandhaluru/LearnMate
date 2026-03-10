import { useState } from "react";

export default function Navbar({ activePage, setActivePage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (page) => {
    setActivePage(page);
    setMenuOpen(false);
  };

  const links = [
    { page: "home", label: "Home" },
    { page: "skills", label: "Skills" },
    { page: "add-skill", label: "Add Skill" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <span className="navbar-logo">
            Learn<span>Mate</span>
          </span>
        </div>

        <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
          {links.map(({ page, label }) => (
            <li key={page}>
              <a
                href="#"
                className={activePage === page ? "active" : ""}
                onClick={(e) => { e.preventDefault(); handleNav(page); }}
              >
                {label}
              </a>
            </li>
          ))}

        </ul>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
