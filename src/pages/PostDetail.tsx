import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase, CATEGORY_LABELS } from '../lib/supabase';
import type { Article } from '../lib/supabase';
import './PostDetail.css';

function renderContent(content: string): string {
  return content
    .split('\n')
    .map((line) => {
      if (line.startsWith('## ')) return `<h2>${line.slice(3)}</h2>`;
      if (line.startsWith('### ')) return `<h3>${line.slice(4)}</h3>`;
      if (line.startsWith('- ')) return `<li>${line.slice(2)}</li>`;
      if (line.startsWith('**') && line.endsWith('**')) {
        return `<strong>${line.slice(2, -2)}</strong>`;
      }
      if (line.trim() === '') return '';
      return `<p>${line}</p>`;
    })
    .join('\n');
}

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Article | null>(null);
  const [related, setRelated] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      setPost(data ?? null);

      if (data) {
        const { data: relatedData } = await supabase
          .from('articles')
          .select('*')
          .eq('published', true)
          .neq('slug', slug)
          .order('date', { ascending: false })
          .limit(3);
        setRelated(relatedData ?? []);
      }

      setLoading(false);
    }

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <main className="post-detail">
        <div className="container post-not-found">
          <p>Chargement…</p>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="post-detail">
        <div className="container post-not-found">
          <h1>Article introuvable</h1>
          <Link to="/blog" className="btn-back">← Retour au blog</Link>
        </div>
      </main>
    );
  }

  const dateStr = new Date(post.date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(post.title);

  return (
    <main className="post-detail">
      <div className="post-hero">
        <img src={post.cover_image} alt={post.title} />
        <div className="post-hero-overlay" />
        <div className="container post-hero-content">
          <Link to="/blog" className="btn-back">← Blog</Link>
          <span className="post-detail-category">{CATEGORY_LABELS[post.category]}</span>
          <h1>{post.title}</h1>
          <time>{dateStr}</time>
        </div>
      </div>

      <div className="container post-layout">
        <article className="post-content">
          <div
            className="post-body"
            dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
          />

          <div className="post-share">
            <span>Partager :</span>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn fb"
            >
              Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn tw"
            >
              Twitter / X
            </a>
          </div>
        </article>

        <aside className="post-sidebar">
          <div className="sidebar-box">
            <h4>DRAGMOB sur Facebook</h4>
            <p>Rejoignez notre communauté pour du contenu quotidien.</p>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-fb-sm"
            >
              Suivre la page
            </a>
          </div>

          {related.length > 0 && (
            <div className="sidebar-box">
              <h4>Articles récents</h4>
              <div className="sidebar-posts">
                {related.map((p) => (
                  <Link key={p.slug} to={`/blog/${p.slug}`} className="sidebar-post">
                    <img src={p.cover_image} alt={p.title} />
                    <span>{p.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
