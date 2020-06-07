import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

export interface Article {
  title: string;
  description: string;
  slug: string;
  date: Date;
  content: string;
  path: string;
}

export interface SerializedArticle {
  title: string;
  description: string;
  slug: string;
  date: string;
  content: string;
  path: string;
}

export const articlesPath = "content/articles";

const fsArticlesPath = join(process.cwd(), articlesPath);

function getArticlePaths(): string[] {
  return fs.readdirSync(fsArticlesPath);
}

function getArticleByPath(path: string, fields = []): Article {
  const fullPath = join(fsArticlesPath, path);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const article = {};

  // Only the requested fields are returned.
  for (const field of fields) {
    switch (field) {
      case "slug":
        article[field] = path.replace(/\.md$/, "");
        break;
      case "content":
        article[field] = content;
        break;
      case "path":
        article[field] = join(articlesPath, path);
        break;
    }

    if (data[field]) {
      article[field] = data[field];
    }
  }

  return article as Article;
}

export function getArticleBySlug(slug: string, fields = []): Article {
  return getArticleByPath(slug + ".md", fields);
}

export function getAllArticles(fields = []): Article[] {
  const paths = getArticlePaths();
  const articles = paths
    .map((path) => getArticleByPath(path, fields))
    .sort((article1, article2) => (article1.date > article2.date ? -1 : 1));

  return articles;
}
