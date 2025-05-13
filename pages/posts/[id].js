import Layout from "@/components/Layout";
import { getAllPostIds, getPostData } from "@/lib/post";

export async function getStaticPaths(){
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData
        }
    }
}

export default function Post({ postData }){
    return (
        <Layout>
            <article>
                <h1>{postData.title}</h1>
                <div>{postData.date}</div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    )
}