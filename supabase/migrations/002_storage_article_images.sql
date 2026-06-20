-- Public bucket for article cover images
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'article-images',
  'article-images',
  true,
  5242880,  -- 5 MB
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do nothing;

-- Public read
create policy "public_read_article_images"
  on storage.objects for select
  using (bucket_id = 'article-images');

-- Authenticated users can upload
create policy "auth_upload_article_images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'article-images');

-- Authenticated users can replace their uploads
create policy "auth_update_article_images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'article-images');

-- Authenticated users can delete
create policy "auth_delete_article_images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'article-images');
