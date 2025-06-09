import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './sidebar.module.css';
import { siteConfig } from '../config/site';

export default function Sidebar({ qiitaArticles = [] }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
        <div className={styles.sidebarHeader}>
          <button
            className={styles.toggleButton}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle sidebar"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              {isOpen ? (
                <path d="M11.354 4.646a.5.5 0 010 .708L8.707 8l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z" />
              ) : (
                <path d="M4.646 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L7.293 8 4.646 5.354a.5.5 0 010-.708z" />
              )}
            </svg>
          </button>
          {isOpen && (
            <Link href="/" className={styles.workspaceName}>
              My Blog Space
            </Link>
          )}
        </div>

        {isOpen && (
          <>
            <nav className={styles.nav}>
              <Link href="/" className={styles.navItem}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className={styles.icon}>
                  <path d="M8 1.5L2 6.5V14h4V10h4v4h4V6.5L8 1.5z" />
                </svg>
                <span>Home</span>
              </Link>
              <Link href="/posts" className={styles.navItem}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className={styles.icon}>
                  <path d="M2 2h12v3H2V2zm0 5h12v3H2V7zm0 5h12v2H2v-2z" />
                </svg>
                <span>All Posts</span>
              </Link>
            </nav>

            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTitle}>Recent Qiita Posts</span>
              </div>
              <div className={styles.postList}>
                {qiitaArticles.slice(0, 5).map((article) => (
                  <a key={article.id} href={article.url} target="_blank" rel="noopener noreferrer" className={styles.postItem}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className={styles.icon}>
                      <path d="M3 2v12h10V5l-3-3H3zm7 0v3h3l-3-3z" />
                    </svg>
                    <span className={styles.postTitle}>{article.title}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className={styles.socialSection}>
              <div className={styles.socialLinks}>
                <a 
                  href={siteConfig.author.social.x} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  title="X (Twitter)"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a 
                  href={siteConfig.author.social.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  title="GitHub"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                </a>
                <a 
                  href={`https://qiita.com/${process.env.NEXT_PUBLIC_QIITA_USERNAME || siteConfig.qiita.defaultUsername}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  title="Qiita"
                >
                  <svg width="18" height="18" viewBox="0 0 80 80" fill="currentColor">
                    <path d="M37.8,60.8c-13.2,0-24-10.8-24-24s10.8-24,24-24s24,10.8,24,24S51,60.8,37.8,60.8z M37.8,16.8c-11,0-20,9-20,20s9,20,20,20s20-9,20-20S48.8,16.8,37.8,16.8z"/>
                    <path d="M37.8,48.8c-6.6,0-12-5.4-12-12s5.4-12,12-12s12,5.4,12,12S44.4,48.8,37.8,48.8z M37.8,28.8c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8S42.2,28.8,37.8,28.8z"/>
                  </svg>
                </a>
              </div>
            </div>
          </>
        )}
      </div>
      {isOpen && <div className={styles.sidebarOverlay} onClick={() => setIsOpen(false)} />}
    </>
  );
}