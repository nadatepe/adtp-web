create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  yukleme_yeri text not null default '',
  sevk_yeri text not null default '',
  arac_tipi text not null default '',
  yuk_nevi text not null default '',
  navlun text not null default '',
  aciklama text not null default '',
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists jobs_published_idx on jobs (published, updated_at desc);
