import { Link } from 'react-router-dom';
import './NotFound.css';
import './Home.css';

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-inner">
        <div className="not-found-logo">
          <span style={{ color: 'var(--color-white)' }}>DRAG</span>
          <span style={{ color: 'var(--color-red-bright)' }}>MOB</span>
        </div>

        <div className="not-found-divider" />

        <div className="not-found-code">404</div>

        <h1 className="not-found-title">Page introuvable</h1>

        <p className="not-found-text">
          Cette page n'existe pas ou a été déplacée. Retourne à l'accueil ou consulte le blog.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="btn-primary">Accueil</Link>
          <Link to="/blog" className="btn-secondary">Le Blog</Link>
        </div>
      </div>
    </div>
  );
}
