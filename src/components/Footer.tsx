import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">
            <span>DRAG</span><span className="red">MOB</span>
          </span>
          <p>L'association des passionnés de dragster</p>
        </div>

        <div className="footer-links">
          <h4>Navigation</h4>
          <a href="/">Accueil</a>
          <a href="/blog">Blog</a>
        </div>

        <div className="footer-contact">
          <h4>Nous retrouver</h4>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-fb-btn"
          >
            Rejoindre sur Facebook
          </a>
          <a href="mailto:contact@dragmobproduction.fr">
            contact@dragmobproduction.fr
          </a>
        </div>
      </div>

      <div className="footer-bottom container">
        <p>© {new Date().getFullYear()} DRAGMOB Production. Tous droits réservés.</p>
        <a href="/mentions-legales">Mentions légales</a>
      </div>
    </footer>
  );
}
