import { Link } from 'react-router-dom';
import type { Post } from '../data/posts';
import './PostCard.css';

interface Props {
  post: Post;
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: Props) {
  const dateStr = new Date(post.date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Link to={`/blog/${post.slug}`} className={`post-card ${featured ? 'featured' : ''}`}>
      <div className="post-card-image">
        <img src={post.coverImage} alt={post.title} loading="lazy" />
        <span className="post-card-category">{post.categoryLabel}</span>
      </div>
      <div className="post-card-body">
        <time className="post-card-date">{dateStr}</time>
        <h3 className="post-card-title">{post.title}</h3>
        <p className="post-card-excerpt">{post.excerpt}</p>
        <span className="post-card-cta">Lire la suite →</span>
      </div>
    </Link>
  );
}
