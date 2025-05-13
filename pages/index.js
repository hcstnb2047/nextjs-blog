import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Layout from "@/components/Layout";
import utilStyles from "@/styles/utils.module.css";
import { getSortedPostsData } from "@/lib/post";

//SSGの場合
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();//id,title,date,thumbnail
  console.log(allPostsData);
  return {
    props: {
      allPostsData
    }
  }
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home({ allPostsData }) {
  return (
    <Layout>
      <section className={utilStyles.headingMd}>
        <p>
          私はSIer勤務のシステムエンジニアです。趣味で個人開発をしており、フロントエンドの勉強中です。
        </p>
      </section>

      <section>
        <h2 className={utilStyles.headingLg}>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          <article>
            <Link href="/">
              <img src="/images/thumbnail01-230227-162936.jpg" className={styles.thumbnailImage} />
            </Link>
            <Link href="/" className={utilStyles.boldText}>
              SSGとSSRの使い分け
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              May 13, 2025
            </small>
          </article>
          <article>
            <Link href="/">
              <img src="/images/thumbnail01-230227-162936.jpg" className={styles.thumbnailImage} />
            </Link>
            <Link href="/" className={utilStyles.boldText}>
              SSGとSSRの使い分け
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              May 13, 2025
            </small>
          </article>
          <article>
            <Link href="/">
              <img src="/images/thumbnail01-230227-162936.jpg" className={styles.thumbnailImage} />
            </Link>
            <Link href="/" className={utilStyles.boldText}>
              SSGとSSRの使い分け
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              May 13, 2025
            </small>
          </article>
          <article>
            <Link href="/">
              <img src="/images/thumbnail01-230227-162936.jpg" className={styles.thumbnailImage} />
            </Link>
            <Link href="/" className={utilStyles.boldText}>
              SSGとSSRの使い分け
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              May 13, 2025
            </small>
          </article>
          <article>
            <Link href="/">
              <img src="/images/thumbnail01-230227-162936.jpg" className={styles.thumbnailImage} />
            </Link>
            <Link href="/" className={utilStyles.boldText}>
              SSGとSSRの使い分け
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              May 13, 2025
            </small>
          </article>
        </div>
      </section>
    </Layout>
  );
}
