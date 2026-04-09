import { useParams, Link } from 'react-router-dom';
import { posts } from '../data/posts';
import './PostDetail.css';

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find((p) => p.slug === slug);

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

  const relatedPosts = posts.filter((p) => p.slug !== slug).slice(0, 3);

  const contentHtml = post.content
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

  return (
    <main className="post-detail">
      <div className="post-hero">
        <img src={post.coverImage} alt={post.title} />
        <div className="post-hero-overlay" />
        <div className="container post-hero-content">
          <Link to="/blog" className="btn-back">← Blog</Link>
          <span className="post-detail-category">{post.category}</span>
          <h1>{post.title}</h1>
          <time>{dateStr}</time>
        </div>
      </div>

      <div className="container post-layout">
        <article className="post-content">
          <div
            className="post-body"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
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

          <div className="sidebar-box">
            <h4>Articles récents</h4>
            <div className="sidebar-posts">
              {relatedPosts.map((p) => (
                <Link key={p.slug} to={`/blog/${p.slug}`} className="sidebar-post">
                  <img src={p.coverImage} alt={p.title} />
                  <span>{p.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
