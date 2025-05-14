import Head from 'next/head';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const name = 'Tanabe DevLog';
export const siteTitle = 'Tanabe DevLog';

function Layout({ children, home }) {
    return <div className={styles.container}>
        <Head>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <header className={styles.header}>
            {home ? (
                <>
                    <img src="/images/my_profile.jpg" className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`} />
                </>
            ) : (
                <>
                    <img src="/images/my_profile.jpg" className={`${utilStyles.borderCircle} ${styles.headerImage}`} />
                </>
            )}
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
        </header>
        <main>
            {children}
        </main>
        {!home && (
            <div className={styles.backToHome}>
                <Link href="/">← Back to home</Link>
            </div>
        )}
    </div>
}
export default Layout;