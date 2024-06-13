import { z } from "zod";
export const AuthorSchema = z.object({
  sys: z.object({
    id: z.string(),
  }),
  fields: z.object({
    name: z.string().optional(),
    bio: z.string().optional(),
  }),
});

export const TagSchema = z.object({
  sys: z.object({
    id: z.string(),
  }),
  fields: z.object({
    name: z.string({ message: "TagSchema Error" }).optional(),
  }),
});

export const BlogPostSchema = z.object({
  metadata: z.object(
    {
      tags: z.array(z.object({})).optional(),
    },
    { message: "Metadata is Invalid" }
  ),

  sys: z.object({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  fields: z.object({
    title: z.string(),
    slug: z.string(),
    image: z.any().optional(),
    tableOfContent: z.any().optional(),
    description: z.any().optional(),
    authors: z.array(AuthorSchema).optional(),
    tags: z.array(TagSchema).optional(),
    seo: z.any().optional(),
  }),
});
