import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    categories: z.array(z.string()),
    image: z.string().optional(),
    description: z.string().optional(),
    author: z.string().default('Michelle Carvalho'),
    comments: z.array(z.object({
      author: z.string(),
      date: z.string(),
      content: z.string(),
      depth: z.number().default(1),
    })).default([]),
  }),
});

export const collections = { posts };
