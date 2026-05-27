import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Article, Category } from '../lib/supabase';
import PostCard from '../components/PostCard';
import './Blog.css';

const CATEGORIES: { label: string; value: Category | 'all' }[] = [
  { label: 'Tous', value: 'all' },
  { label: 'Actualités', value: 'actualites' },
  { label: 'Événements', value: 'evenements' },
  { label: 'Tutoriels', value: 'tutoriels' },
  { label: 'Photos & Vidéos', value: 'photos-videos' },
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      let query = supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('date', { ascending: false });

      if (activeCategory !== 'all') {
        query = query.eq('category', activeCategory);
      }

      const { data } = await query;
      setArticles(data ?? []);
      setLoading(false);
    }

    fetchArticles();
  }, [activeCategory]);

  return (
    <main className="blog-page">
      <div className="blog-hero">
        <div className="blog-hero-bg">
          <img
            src="https://images.unsplash.com/photo-1607853202273-232359b8c6b5?w=1600&q=80"
            alt="Blog DRAGMOB"
          />
          <div className="blog-hero-overlay" />
        </div>
        <div className="container blog-hero-content">
          <div className="section-label">Le Blog</div>
          <h1>Actualités &amp; stories</h1>
          <p>Événements, tutoriels, photos — tout ce qui fait la vie de DRAGMOB Production.</p>
        </div>
      </div>

      <div className="container blog-body">
        <div className="blog-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              className={`filter-btn ${activeCategory === cat.value ? 'active' : ''}`}
              onClick={() => { setLoading(true); setActiveCategory(cat.value); }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="blog-empty">Chargement…</div>
        ) : (
          <>
            <div className="blog-grid">
              {articles.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
            {articles.length === 0 && (
              <div className="blog-empty">Aucun article dans cette catégorie pour le moment.</div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
