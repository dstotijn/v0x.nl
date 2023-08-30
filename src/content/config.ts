import { defineCollection, z } from "astro:content";

const date = z
  .string()
  .or(z.date())
  .transform((val) => new Date(val));

const articles = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: date,
      ogImage: image().optional(),
    }),
});

const workExperiences = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      from: date,
      to: date.optional(),
      logo: image(),
      order: z.number(),
    }),
});

const sideProjects = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      logo: image(),
      url: z.string().url(),
      github: z.string(),
      order: z.number(),
    }),
});

export const collections = {
  articles,
  ["work-experiences"]: workExperiences,
  ["side-projects"]: sideProjects,
};
