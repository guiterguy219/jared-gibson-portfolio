import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  loader: glob({
    pattern: "**/!(*.template).md",
    base: "src/data/blog/posts",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string().datetime({ offset: true }),
    tags: z.array(z.string()),
    image: z.object({
      sm: z.string(),
      lg: z.string(),
    }),
    status: z.enum(["idea", "draft", "published"]),
  }),
});

const projects = defineCollection({
  loader: glob({
    pattern: "**/!(*.template).md",
    base: "src/data/projects",
  }),
  schema: z.object({
    title: z.string(),
    sponsor: z.string(),
    shortDescription: z.string(),
    soleDeveloper: z.boolean().optional(),
    urls: z
      .object({
        landing: z.string().url(),
        app: z.string().url(),
        iframe: z.string().url(),
        source: z.string().url(),
      })
      .partial()
      .optional(),
    images: z.array(
      z.object({
        primary: z.boolean().optional(),
        sm: z.string(),
        lg: z.string(),
        alt: z.string(),
        description: z.string(),
      })
    ),
    techStack: z.array(
      z.object({
        name: z.string(),
        highlight: z.boolean().optional(),
      })
    ),
    status: z.enum(["prototype", "alpha", "beta", "stable"]),
    size: z.enum(["xs", "sm", "md", "lg", "xl"]),
    lastCommit: z.string().datetime({ offset: true }).optional(),
  }),
});

export const collections = {
  blog,
  projects,
};
