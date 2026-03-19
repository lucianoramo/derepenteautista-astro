import { getCollection } from 'astro:content';

const SITE = 'https://derepenteautista.com.br';

const STATIC_PAGES = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/nossa-historia', priority: '0.8', changefreq: 'monthly' },
  { url: '/a-autora', priority: '0.8', changefreq: 'monthly' },
  { url: '/sobre-pai', priority: '0.7', changefreq: 'monthly' },
  { url: '/category/blog', priority: '0.7', changefreq: 'weekly' },
  { url: '/category/dicas-uteis', priority: '0.7', changefreq: 'weekly' },
  { url: '/category/historia', priority: '0.7', changefreq: 'weekly' },
];

function url(path: string, lastmod?: string, priority = '0.6', changefreq = 'monthly') {
  return `
  <url>
    <loc>${SITE}${path}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`.trim();
}

export async function GET() {
  const posts = await getCollection('posts');
  const sortedPosts = posts.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  const staticUrls = STATIC_PAGES.map(p => url(p.url, undefined, p.priority, p.changefreq));
  const postUrls = sortedPosts.map(post =>
    url(`/${post.slug}`, post.data.date.toISOString().split('T')[0], '0.9', 'monthly')
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...postUrls].join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
