import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const SITE_URL = process.env.SITE_URL || `https://${process.env.VERCEL_URL}` || 'https://dragmob-production.vercel.app';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const slug = req.query.slug as string;

  if (!slug) {
    return res.status(400).send('Missing slug');
  }

  const supabase = createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.VITE_SUPABASE_ANON_KEY!
  );

  const { data: article } = await supabase
    .from('articles')
    .select('title, excerpt, cover_image, slug')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  // Read the built index.html (bundled via includeFiles in vercel.json)
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  let html: string;
  try {
    html = fs.readFileSync(indexPath, 'utf-8');
  } catch {
    // Fallback: no file access in this context, serve without meta injection
    return res.status(200).setHeader('Content-Type', 'text/html').send('<!doctype html><html><head><meta charset="UTF-8" /><title>DRAGMOB Production</title></head><body><div id="root"></div></body></html>');
  }

  if (!article) {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-maxage=60');
    return res.status(200).send(html);
  }

  const pageTitle = `${escapeHtml(article.title)} — DRAGMOB Production`;
  const description = escapeHtml(article.excerpt || '');
  const image = article.cover_image || '';
  const articleUrl = `${SITE_URL}/blog/${article.slug}`;

  const metaTags = [
    `<title>${pageTitle}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta property="og:type" content="article" />`,
    `<meta property="og:site_name" content="DRAGMOB Production" />`,
    `<meta property="og:title" content="${pageTitle}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:url" content="${articleUrl}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${pageTitle}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<link rel="canonical" href="${articleUrl}" />`,
  ].join('\n    ');

  // Replace the existing <title> tag with full meta block
  const injected = html.replace(
    /<title>.*?<\/title>/,
    metaTags
  );

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  return res.status(200).send(injected);
}
