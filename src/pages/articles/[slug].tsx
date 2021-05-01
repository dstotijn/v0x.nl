import Head from "next/head";

import {
  getArticleBySlug,
  getAllArticles,
  SerializedArticle,
} from "../../lib/articles";
import markdownToHtml from "../../lib/markdownToHtml";
import getFormattedDateTime from "../../lib/date";
import Layout from "../../components/layout";
import styles from "./Article.module.css";

export default function Article({ article }: { article: SerializedArticle }) {
  return (
    <Layout>
      <Head>
        <title>v0x.nl - {article.title}</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="title" content={article.title} />
        <meta name="og:title" content={article.title} />
        <meta name="description" content={article.description} />
        <meta name="og:description" content={article.description} />
        <meta name="description" content={article.description} />
        {article.ogImage && (
          <meta name="og:image" content={"https://v0x.nl" + article.ogImage} />
        )}
      </Head>
      <h1>{article.title}</h1>
      <header>
        <img
          className={styles.avatar}
          src="/assets/avatar.jpg"
          alt="Profile picture of David Stotijn"
        />
        <a href="https://twitter.com/dstotijn">David Stotijn</a>
        {" • "}
        <time dateTime={article.date}>
          {getFormattedDateTime(article.date as string)}
        </time>
      </header>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
      <hr />
      <p>
        ⚙️ View article source:{" "}
        <code>
          <a
            href={`https://github.com/dstotijn/v0x/blob/master/${article.path}`}
          >
            /{article.path}
          </a>
        </code>
      </p>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const article = getArticleBySlug(params.slug, [
    "title",
    "description",
    "slug",
    "date",
    "content",
    "path",
    "ogImage",
  ]);
  const content = await markdownToHtml(article.content);

  return {
    props: {
      article: {
        ...article,
        date: article.date ? article.date.toISOString() : undefined,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const articles = getAllArticles(["slug"]);
  return {
    paths: articles.map((article) => ({
      params: {
        slug: article.slug,
      },
    })),
    fallback: false,
  };
}
