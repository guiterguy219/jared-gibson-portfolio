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
    date: z.string(),
    tags: z.array(z.string()),
    image: z.object({
      sm: z.string(),
      lg: z.string(),
    }),
    status: z.enum(["draft", "published"]),
  }),
});

export const collections = {
  blog,
};
