import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import Layout from "@/components/Layout";
import { getStaticQiitaArticles } from "@/lib/qiita";
import { siteConfig } from "@/config/site";
import { siteTitle } from "@/components/Layout";

//SSGの場合
export async function getStaticProps() {
  // Qiita記事を取得
  let qiitaArticles = [];
  if (siteConfig.features.qiitaIntegration) {
    qiitaArticles = await getStaticQiitaArticles();
  }
  
  return {
    props: {
      initialQiitaArticles: qiitaArticles,
      // ビルド時の情報を含める
      buildInfo: {
        hasQiitaArticles: qiitaArticles.length > 0,
        buildTime: new Date().toISOString(),
        qiitaConfigured: !!(process.env.NEXT_PUBLIC_QIITA_USERNAME || siteConfig.qiita.defaultUsername)
      }
    },
    // 記事が更新される可能性があるので再生成間隔を設定
    revalidate: 60 * 10 // 10分
  }
}

export default function Home({ initialQiitaArticles = [], buildInfo }) {
  const [viewMode, setViewMode] = useState('gallery'); // 'gallery' or 'list'
  const [qiitaArticles, setQiitaArticles] = useState(initialQiitaArticles);

  // Load Qiita articles from localStorage on mount, but prefer SSG data
  useEffect(() => {
    // localStorage is only available in the browser
    if (typeof window === 'undefined') return;

    // If we have SSG data, use it and cache it
    if (initialQiitaArticles.length > 0) {
      setQiitaArticles(initialQiitaArticles);
      localStorage.setItem('qiitaArticles', JSON.stringify(initialQiitaArticles));
      localStorage.setItem('qiitaCacheTime', Date.now().toString());
      return;
    }

    // Otherwise, try to load from cache
    const saved = localStorage.getItem('qiitaArticles');
    const cacheTime = localStorage.getItem('qiitaCacheTime');
    
    if (saved && cacheTime) {
      const now = Date.now();
      const cacheAge = now - parseInt(cacheTime);
      const maxAge = siteConfig.qiita.cacheTime;
      
      if (cacheAge < maxAge) {
        setQiitaArticles(JSON.parse(saved));
      } else {
        // Clear expired cache
        localStorage.removeItem('qiitaArticles');
        localStorage.removeItem('qiitaCacheTime');
      }
    }
  }, [initialQiitaArticles]);

  return (
    <Layout home pageTitle="Home" qiitaArticles={qiitaArticles}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Tanabe DevLog</h1>
        <p className={styles.pageDescription}>
          SIer勤務のシステムエンジニアによる技術ブログ。個人開発の記録。
        </p>
      </div>

      <div className={styles.controlsRow}>
        <div className={styles.viewToggle}>
          <button
            className={`${styles.viewButton} ${viewMode === 'gallery' ? styles.active : ''}`}
            onClick={() => setViewMode('gallery')}
          >
            Gallery
          </button>
          <button
            className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
            onClick={() => setViewMode('list')}
          >
            List
          </button>
        </div>
      </div>

      {viewMode === 'gallery' ? (
        <div className={styles.postsGrid}>
          {qiitaArticles.map((post) => (
            <a 
              key={post.id} 
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.postCard}
            >
              <div className={styles.qiitaThumbnail}>
                <svg viewBox="0 0 80 80" fill="#55C500" className={styles.qiitaLogo}>
                  <path d="M37.8,60.8c-13.2,0-24-10.8-24-24s10.8-24,24-24s24,10.8,24,24S51,60.8,37.8,60.8z M37.8,16.8c-11,0-20,9-20,20
                    s9,20,20,20s20-9,20-20S48.8,16.8,37.8,16.8z"/>
                  <path d="M37.8,48.8c-6.6,0-12-5.4-12-12s5.4-12,12-12s12,5.4,12,12S44.4,48.8,37.8,48.8z M37.8,28.8c-4.4,0-8,3.6-8,8
                    s3.6,8,8,8s8-3.6,8-8S42.2,28.8,37.8,28.8z"/>
                </svg>
              </div>
              <div className={styles.postContent}>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <div className={styles.postMeta}>
                  <time className={styles.postDate}>{post.date}</time>
                  <div className={styles.qiitaStats}>
                    <span className={styles.statItem}>
                      <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                      </svg>
                      {post.likes_count}
                    </span>
                    <span className={styles.statItem}>
                      <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2z" clipRule="evenodd" />
                      </svg>
                      {post.comments_count}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className={styles.postsList}>
          {qiitaArticles.map((post) => (
            <a 
              key={post.id} 
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.postListItem}
            >
              <svg className={styles.postListIcon} viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-1a1 1 0 100-2h1a4 4 0 014 4v6a4 4 0 01-4 4H6a4 4 0 01-4-4V7a4 4 0 014-4z" clipRule="evenodd" />
              </svg>
              <div className={styles.postListContent}>
                <h3 className={styles.postListTitle}>{post.title}</h3>
                <div className={styles.postListMeta}>
                  <time className={styles.postListDate}>{post.date}</time>
                  <div className={styles.postListStats}>
                    <span className={styles.statItem}>
                      <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                      </svg>
                      {post.likes_count}
                    </span>
                    <span className={styles.statItem}>
                      <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2z" clipRule="evenodd" />
                      </svg>
                      {post.comments_count}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </Layout>
  );
}
