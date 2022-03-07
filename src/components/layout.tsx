import Head from "next/head";
import Link from "next/link";

import styles from "./Layout.module.css";

export default function Layout({ children }) {
  const year = new Date().getFullYear();
  return (
    <div className={styles.container}>
      <Head>
        <title>
          v0x.nl - David Stotijn, a software engineer from Amsterdam
        </title>
        <script async defer src="https://nullitics.com/script.js"></script>
      </Head>
      <header>
        <Link href="/">
          <a className={styles.logo}>v0x.nl</a>
        </Link>
      </header>
      {children}
      <footer>© {year} David Stotijn</footer>
    </div>
  );
}
