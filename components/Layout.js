import Head from 'next/head';
import styles from './layout.module.css';
import Sidebar from './Sidebar';

export const siteTitle = 'Tanabe DevLog';

function Layout({ children, home, pageTitle, qiitaArticles = [] }) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <title>{pageTitle ? `${pageTitle} - ${siteTitle}` : siteTitle}</title>
            </Head>
            <div className={styles.layoutContainer}>
                <Sidebar qiitaArticles={qiitaArticles} />
                <div className={styles.mainContainer}>
                    <div className={styles.pageContent}>
                        <main className={styles.main}>
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Layout;