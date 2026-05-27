import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase, CATEGORY_LABELS } from '../../lib/supabase';
import type { Article } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import './Dashboard.css';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('date', { ascending: false });
    if (!error && data) setArticles(data);
    setLoading(false);
  }

  async function togglePublish(article: Article) {
    await supabase
      .from('articles')
      .update({ published: !article.published })
      .eq('id', article.id);
    setArticles(prev =>
      prev.map(a => a.id === article.id ? { ...a, published: !a.published } : a)
    );
  }

  async function deleteArticle(id: string) {
    if (!confirm('Supprimer cet article définitivement ?')) return;
    setDeletingId(id);
    await supabase.from('articles').delete().eq('id', id);
    setArticles(prev => prev.filter(a => a.id !== id));
    setDeletingId(null);
  }

  async function handleSignOut() {
    await signOut();
    navigate('/admin/login');
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-logo">
          <span className="logo-text">DRAGMOB</span>
          <span className="logo-sub">Backoffice</span>
        </div>
        <div className="dashboard-user">
          <span className="user-email">{user?.email}</span>
          <button className="signout-btn" onClick={handleSignOut}>Déconnexion</button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-toolbar">
          <h1 className="dashboard-title">Articles</h1>
          <Link to="/admin/articles/new" className="new-article-btn">
            + Nouvel article
          </Link>
        </div>

        {loading ? (
          <div className="dashboard-loading">Chargement…</div>
        ) : articles.length === 0 ? (
          <div className="dashboard-empty">
            Aucun article. <Link to="/admin/articles/new">Créez le premier !</Link>
          </div>
        ) : (
          <div className="articles-table-wrapper">
            <table className="articles-table">
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Catégorie</th>
                  <th>Date</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map(article => (
                  <tr key={article.id} className={article.published ? '' : 'unpublished'}>
                    <td className="article-title-cell">
                      <span className="article-title">{article.title}</span>
                      <span className="article-slug">/{article.slug}</span>
                    </td>
                    <td>
                      <span className="category-badge">
                        {CATEGORY_LABELS[article.category]}
                      </span>
                    </td>
                    <td className="article-date">
                      {new Date(article.date).toLocaleDateString('fr-FR')}
                    </td>
                    <td>
                      <button
                        className={`publish-btn ${article.published ? 'published' : 'draft'}`}
                        onClick={() => togglePublish(article)}
                      >
                        {article.published ? 'Publié' : 'Brouillon'}
                      </button>
                    </td>
                    <td className="article-actions">
                      <Link to={`/admin/articles/${article.id}`} className="edit-btn">
                        Modifier
                      </Link>
                      <button
                        className="delete-btn"
                        onClick={() => deleteArticle(article.id)}
                        disabled={deletingId === article.id}
                      >
                        {deletingId === article.id ? '…' : 'Supprimer'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
