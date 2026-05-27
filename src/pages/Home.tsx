import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Article } from '../lib/supabase';
import PostCard from '../components/PostCard';
import './Home.css';

export default function Home() {
  const [latestPosts, setLatestPosts] = useState<Article[]>([]);

  useEffect(() => {
    supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .order('date', { ascending: false })
      .limit(3)
      .then(({ data }) => setLatestPosts(data ?? []));
  }, []);

  return (
    <main className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <img
            src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1600&q=80"
            alt="Dragster en action"
          />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content container">
          <div className="hero-badge">Association</div>
          <h1 className="hero-title">
            L'adrénaline<br />
            <span className="text-red">à l'état pur</span>
          </h1>
          <p className="hero-sub">
            Passionnés de dragster, unis par la vitesse, la mécanique et l'esprit de communauté.
          </p>
          <div className="hero-ctas">
            <Link to="/blog" className="btn-primary">Découvrir le blog</Link>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Notre Facebook
            </a>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="hero-scroll-bar" />
        </div>
      </section>

      {/* About strip */}
      <section className="about-strip">
        <div className="container about-strip-inner">
          <div className="stat"><span className="stat-num">12+</span><span className="stat-label">Ans de passion</span></div>
          <div className="stat-divider" />
          <div className="stat"><span className="stat-num">80+</span><span className="stat-label">Membres actifs</span></div>
          <div className="stat-divider" />
          <div className="stat"><span className="stat-num">20+</span><span className="stat-label">Événements / an</span></div>
        </div>
      </section>

      {/* About */}
      <section className="about section">
        <div className="container about-grid">
          <div className="about-img">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80"
              alt="Dragster sur la piste"
            />
          </div>
          <div className="about-text">
            <div className="section-label">Qui sommes-nous</div>
            <h2>Des passionnés, pas des institutionnels</h2>
            <p>
              DRAGMOB Production, c'est une bande de fous de moteurs qui partagent leur amour du dragster
              depuis plus d'une décennie. Roulages, rassemblements, tutorials — on vit pour ça et on le
              fait avec le sourire.
            </p>
            <p>
              Que tu sois pilote confirmé ou simple curieux, tu es le bienvenu dans notre communauté.
              On se retrouve sur les circuits et surtout sur notre page Facebook, où la vie de l'asso
              se passe au quotidien.
            </p>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Rejoindre la communauté
            </a>
          </div>
        </div>
      </section>

      {/* Latest posts */}
      {latestPosts.length > 0 && (
        <section className="latest section">
          <div className="container">
            <div className="section-header">
              <div>
                <div className="section-label">Le blog</div>
                <h2>Derniers articles</h2>
              </div>
              <Link to="/blog" className="btn-outline">Tout voir →</Link>
            </div>
            <div className="posts-grid">
              {latestPosts.map((post, i) => (
                <PostCard key={post.slug} post={post} featured={i === 0} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Facebook CTA */}
      <section className="fb-cta">
        <div className="container fb-cta-inner">
          <div>
            <h2>On se retrouve sur Facebook</h2>
            <p>Du contenu tous les jours : photos, vidéos, événements, discussions.</p>
          </div>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-fb"
          >
            Suivre la page
          </a>
        </div>
      </section>
    </main>
  );
}
