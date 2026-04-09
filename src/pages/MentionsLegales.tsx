import './MentionsLegales.css';

export default function MentionsLegales() {
  return (
    <main className="legal-page">
      <div className="container legal-content">
        <h1>Mentions légales</h1>

        <section>
          <h2>Éditeur du site</h2>
          <p>
            <strong>DRAGMOB Production</strong><br />
            Association loi 1901<br />
            Siège social : France<br />
            Email : contact@dragmobproduction.fr
          </p>
        </section>

        <section>
          <h2>Hébergement</h2>
          <p>
            Ce site est hébergé par <strong>Vercel Inc.</strong><br />
            440 N Barranca Ave #4133, Covina, CA 91723, USA
          </p>
        </section>

        <section>
          <h2>Propriété intellectuelle</h2>
          <p>
            L'ensemble du contenu de ce site (textes, images, vidéos) est la propriété de
            DRAGMOB Production sauf mention contraire. Toute reproduction est interdite sans
            autorisation préalable.
          </p>
        </section>

        <section>
          <h2>Données personnelles</h2>
          <p>
            Ce site ne collecte aucune donnée personnelle via des formulaires ou cookies de
            tracking. Les seules données stockées sont celles nécessaires au fonctionnement
            technique du site (logs serveur).
          </p>
        </section>
      </div>
    </main>
  );
}
