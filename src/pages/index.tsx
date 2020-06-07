import Head from "next/head";
import Link from "next/link";

import Layout from "../components/layout";
import styles from "./Index.module.css";
import { getAllArticles, SerializedArticle } from "../lib/articles";
import getFormattedDateTime from "../lib/date";

export default function Index({ articles }: { articles: SerializedArticle[] }) {
  const articleList = (
    <ul className={styles.articleList}>
      {articles.map((article) => {
        const date = getFormattedDateTime(article.date);
        return (
          <li key={article.slug}>
            <time dateTime={article.date}>{date}</time>{" "}
            <Link href={`/articles/${article.slug}`}>
              <a>{article.title}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <Layout>
      <Head>
        <meta
          name="description"
          content="David Stotijn‘s homepage, with bio, articles on web development and contact information."
        />
      </Head>
      <header>
        <h1>
          I’m David Stotijn,
          <br /> a software engineer from Amsterdam.
        </h1>
      </header>
      <main>
        <p className={styles.intro}>
          Hello! Welcome to my homepage. Here you’ll find info about me, my
          work, articles, and side projects.
        </p>

        <h2>About me</h2>
        <p>
          <img
            className={styles.avatar}
            src="/assets/avatar.jpg"
            alt="Profile picture of David Stotijn"
          />
          For as long as I can remember I enjoy tinkering with computers and
          building things. I’m very grateful to do this for a living, over 10
          years already now. Aside from tech I really enjoy music; mostly
          playing piano and guitar. I live in Amsterdam, where I was also born.
        </p>
        <p>
          This website is just a small home on the web to put assorted stuff
          I’ve created over the years. The source code is on{" "}
          <a href="https://github.com/dstotijn/v0x">GitHub</a>. I registered the
          domain <code>v0x.nl</code> a few years ago as a quick-to-type hostname
          for hosting side projects.
        </p>
        <h2>Work</h2>
        <p>
          After a few years building websites at smaller studios, I got involved
          with APIs and web services in 2015 when I joined MessageBird, an
          Amsterdam based telecom startup. There I helped develop{" "}
          <a href="https://www.messagebird.com/flow-builder/">Flow Builder</a>,
          a no-code platform for creating automated SMS, voice and chat
          workflows.
        </p>
        <p>
          I’m currently at Framer, helping build and maintain the backend for
          its cloud based prototyping tool:{" "}
          <a href="http://framer.com/web">Framer Web</a>.
        </p>

        <h2>Articles</h2>
        {articleList}

        <h2>Get in touch</h2>
        <p>
          You can find me on <a href="https://twitter.com/dstotijn">Twitter</a>,{" "}
          <a href="https://www.instagram.com/dstotijn/">Instagram</a>,{" "}
          <a href="https://github.com/dstotijn">GitHub</a>,{" "}
          <a href="https://www.linkedin.com/in/dstotijn/">LinkedIn</a> or{" "}
          <a href="mailto:dstotijn@gmail.com">send me an e-mail</a>.
        </p>
      </main>
    </Layout>
  );
}

export const getStaticProps = async (): Promise<{
  props: { articles: SerializedArticle[] };
}> => {
  const articles = getAllArticles(["title", "date", "slug"]);

  return {
    props: {
      articles: articles.map((article) => ({
        ...article,
        date: article.date ? article.date.toISOString() : undefined,
      })),
    },
  };
};
