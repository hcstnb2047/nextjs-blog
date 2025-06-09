import Layout from "@/components/Layout";
import { getAllPostIds, getPostData, getSortedPostsData } from "@/lib/post";
import { getStaticQiitaArticles } from "@/lib/qiita";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import utilStyles from "@/styles/utils.module.css";

export async function getStaticPaths(){
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    
    // Qiita記事を取得
    let qiitaArticles = [];
    if (siteConfig.features.qiitaIntegration) {
        qiitaArticles = await getStaticQiitaArticles();
    }
    
    return {
        props: {
            postData,
            qiitaArticles
        }
    }
}

export default function Post({ postData, qiitaArticles }){
    return (
        <Layout pageTitle={postData.title} qiitaArticles={qiitaArticles}>
            <article>
                <header className={utilStyles.postHeader}>
                    <h1 className={utilStyles.postTitle}>{postData.title}</h1>
                    <div className={utilStyles.postMeta}>
                        <div className={utilStyles.postMetaItem}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 7a1 1 0 110 2 1 1 0 010-2zm-1 1a1 1 0 11-2 0 1 1 0 012 0zm5 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H4zm8 10H4V4h8v8z" clipRule="evenodd" />
                            </svg>
                            <time>{postData.date}</time>
                        </div>
                    </div>
                </header>
                <div className={utilStyles.postContent} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
                <div className={utilStyles.backToHome}>
                    <Link href="/" className={utilStyles.backLink}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path fillRule="evenodd" d="M10.354 4.646a.5.5 0 010 .708L7.707 8l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z" clipRule="evenodd" />
                        </svg>
                        Back to home
                    </Link>
                </div>
            </article>
        </Layout>
    )
}