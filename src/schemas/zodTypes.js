import { z } from "zod";
export const AuthorSchema = z.object({
  sys: z.object({
    id: z.string(),
  }),
  fields: z.object({
    name: z.string(),
    bio: z.string().optional(),
  }),
});

export const TagSchema = z.object({
  sys: z.object({
    id: z.string(),
  }),
  fields: z.object({
    name: z.string().optional(),
  }),
});

export const BlogPostSchema = z.object({
  sys: z.object({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  fields: z.object({
    title: z.string(),
    slug: z.string(),
    body: z.string().optional(),
    tags: z.array(TagSchema).optional(),
    author: AuthorSchema.optional(),
  }),
});
