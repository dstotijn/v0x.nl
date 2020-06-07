import Head from "next/head";

import {
  getArticleBySlug,
  getAllArticles,
  SerializedArticle,
} from "../../lib/articles";
import markdownToHtml from "../../lib/markdownToHtml";
import getFormattedDateTime from "../../lib/date";
import Layout from "../../components/layout";

export default function Article({ article }: { article: SerializedArticle }) {
  return (
    <Layout>
      <Head>
        <title>v0x.nl - {article.title}</title>
        <meta name="description" content={article.description} />
      </Head>
      <h1>{article.title}</h1>
      <time dateTime={article.date}>
        {getFormattedDateTime(article.date as string)}
      </time>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
      <p>
        View source:{" "}
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
