import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const SITE_URL = process.env.SITE_URL || `https://${process.env.VERCEL_URL}` || 'https://dragmob-production.vercel.app';

const STATIC_ROUTES = ['/', '/blog'];

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const supabase = createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.VITE_SUPABASE_ANON_KEY!
  );

  const { data: articles } = await supabase
    .from('articles')
    .select('slug, updated_at')
    .eq('published', true)
    .order('updated_at', { ascending: false });

  const staticUrls = STATIC_ROUTES.map(
    (route) => `  <url>
    <loc>${SITE_URL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`
  ).join('\n');

  const articleUrls = (articles ?? [])
    .map(
      (a) => `  <url>
    <loc>${SITE_URL}/blog/${a.slug}</loc>
    <lastmod>${a.updated_at.split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${articleUrls}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  return res.status(200).send(xml);
}
