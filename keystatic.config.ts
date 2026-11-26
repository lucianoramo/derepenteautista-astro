import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: { kind: 'cloud' },
  cloud: { project: 'derepente/derepenteautista' },
  locale: 'pt-BR',
  ui: { brand: { name: 'De repente autista' } },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      // Botão no editor para abrir o post publicado no site.
      previewUrl: '/{slug}/',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['title', 'date'],
      schema: {
        title: fields.slug({ name: { label: 'Título' } }),
        date: fields.date({ label: 'Data de publicação', defaultValue: { kind: 'today' } }),
        categories: fields.multiselect({
          label: 'Categorias',
          options: [
            { label: 'Blog', value: 'Blog' },
            { label: 'Dicas úteis', value: 'Dicas úteis' },
            { label: 'História', value: 'História' },
          ],
          defaultValue: ['Blog'],
        }),
        image: fields.image({
          label: 'Imagem de capa',
          directory: 'public/images/posts',
          publicPath: '/images/posts/',
        }),
        description: fields.text({
          label: 'Resumo curto (aparece no Google e quando o post é compartilhado)',
          multiline: true,
        }),
        author: fields.text({ label: 'Autora', defaultValue: 'Michelle Carvalho' }),
        comments: fields.ignored(),
        content: fields.markdoc({ label: 'Texto do post', extension: 'md' }),
      },
    }),
  },
});
