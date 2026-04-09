import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo">
          <span className="logo-drag">DRAG</span><span className="logo-mob">MOB</span>
          <span className="logo-sub">PRODUCTION</span>
        </Link>

        <nav className={`navbar-nav ${open ? 'open' : ''}`}>
          <NavLink to="/" end onClick={() => setOpen(false)}>Accueil</NavLink>
          <NavLink to="/blog" onClick={() => setOpen(false)}>Blog</NavLink>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-fb"
            onClick={() => setOpen(false)}
          >
            Facebook
          </a>
        </nav>

        <button
          className={`navbar-burger ${open ? 'open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
