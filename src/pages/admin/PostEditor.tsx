import { useEffect, useState, useRef } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase, CATEGORY_LABELS } from '../../lib/supabase';
import type { Article, Category } from '../../lib/supabase';
import './PostEditor.css';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const EMPTY: Omit<Article, 'id' | 'created_at' | 'updated_at'> = {
  slug: '',
  title: '',
  date: new Date().toISOString().slice(0, 10),
  category: 'actualites',
  excerpt: '',
  cover_image: '',
  content: '',
  published: false,
};

export default function PostEditor() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === 'new';
  const navigate = useNavigate();

  const [form, setForm] = useState(EMPTY);
  const [slugEdited, setSlugEdited] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isNew) return;
    supabase.from('articles').select('*').eq('id', id).single().then(({ data, error }) => {
      if (error || !data) {
        navigate('/admin');
        return;
      }
      setForm({
        slug: data.slug,
        title: data.title,
        date: data.date,
        category: data.category,
        excerpt: data.excerpt,
        cover_image: data.cover_image,
        content: data.content,
        published: data.published,
      });
      setSlugEdited(true);
      setLoading(false);
    });
  }, [id, isNew, navigate]);

  function handleTitleChange(title: string) {
    setForm(f => ({
      ...f,
      title,
      slug: slugEdited ? f.slug : slugify(title),
    }));
  }

  function set<K extends keyof typeof EMPTY>(key: K, value: typeof EMPTY[K]) {
    setForm(f => ({ ...f, [key]: value }));
  }

  async function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError('');
    setUploading(true);

    const ext = file.name.split('.').pop();
    const path = `covers/${Date.now()}.${ext}`;

    const { error: uploadErr } = await supabase.storage
      .from('article-images')
      .upload(path, file, { upsert: true });

    if (uploadErr) {
      setUploadError(uploadErr.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from('article-images').getPublicUrl(path);
    set('cover_image', data.publicUrl);
    setUploading(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setSaving(true);

    if (!form.title || !form.slug || !form.content) {
      setError('Titre, slug et contenu sont obligatoires.');
      setSaving(false);
      return;
    }

    if (isNew) {
      const { error } = await supabase.from('articles').insert(form);
      if (error) {
        setError(error.message);
        setSaving(false);
        return;
      }
    } else {
      const { error } = await supabase.from('articles').update(form).eq('id', id);
      if (error) {
        setError(error.message);
        setSaving(false);
        return;
      }
    }

    navigate('/admin');
  }

  if (loading) {
    return <div className="editor-loading">Chargement…</div>;
  }

  return (
    <div className="editor-page">
      <header className="editor-header">
        <button className="back-btn" onClick={() => navigate('/admin')}>
          ← Retour
        </button>
        <h1 className="editor-heading">{isNew ? 'Nouvel article' : 'Modifier l\'article'}</h1>
        <div className="editor-header-actions">
          <label className="publish-toggle">
            <input
              type="checkbox"
              checked={form.published}
              onChange={e => set('published', e.target.checked)}
            />
            <span>{form.published ? 'Publié' : 'Brouillon'}</span>
          </label>
          <button className="save-btn" onClick={handleSubmit} disabled={saving}>
            {saving ? 'Enregistrement…' : 'Enregistrer'}
          </button>
        </div>
      </header>

      <form className="editor-body" onSubmit={handleSubmit}>
        {error && <div className="editor-error">{error}</div>}

        <div className="editor-main">
          <div className="form-group">
            <label>Titre *</label>
            <input
              type="text"
              value={form.title}
              onChange={e => handleTitleChange(e.target.value)}
              placeholder="Titre de l'article"
              required
            />
          </div>

          <div className="form-group">
            <label>Contenu *</label>
            <textarea
              value={form.content}
              onChange={e => set('content', e.target.value)}
              placeholder="Rédigez votre article en Markdown…"
              rows={20}
              required
            />
            <span className="field-hint">Markdown supporté</span>
          </div>
        </div>

        <aside className="editor-sidebar">
          <div className="sidebar-card">
            <h3 className="sidebar-section-title">Métadonnées</h3>

            <div className="form-group">
              <label>Slug *</label>
              <input
                type="text"
                value={form.slug}
                onChange={e => { set('slug', e.target.value); setSlugEdited(true); }}
                placeholder="mon-article"
                required
              />
              <span className="field-hint">/blog/{form.slug || '...'}</span>
            </div>

            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={form.date}
                onChange={e => set('date', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Catégorie</label>
              <select
                value={form.category}
                onChange={e => set('category', e.target.value as Category)}
              >
                {(Object.keys(CATEGORY_LABELS) as Category[]).map(cat => (
                  <option key={cat} value={cat}>{CATEGORY_LABELS[cat]}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Image de couverture</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="cover-file-input"
                onChange={handleImageUpload}
              />
              <button
                type="button"
                className="upload-btn"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? 'Upload en cours…' : '📎 Choisir une image'}
              </button>
              {uploadError && <span className="upload-error">{uploadError}</span>}
              {form.cover_image && (
                <>
                  <img src={form.cover_image} alt="Prévisualisation" className="cover-preview" />
                  <button
                    type="button"
                    className="cover-remove-btn"
                    onClick={() => set('cover_image', '')}
                  >
                    Supprimer l'image
                  </button>
                </>
              )}
            </div>

            <div className="form-group">
              <label>Extrait</label>
              <textarea
                value={form.excerpt}
                onChange={e => set('excerpt', e.target.value)}
                placeholder="Court résumé affiché dans la liste d'articles…"
                rows={4}
              />
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}
