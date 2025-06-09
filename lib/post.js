import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(),  "posts");

//mdファイルのデータを取り出す
export async function getSortedPostsData() {
    //postsディレクトリのファイル名を取得
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        //ファイル名からファイルのパスを取得
        const id = fileName.replace(/\.md$/, "");
        //ファイルのパスを取得
        const fullPath = path.join(postsDirectory, fileName);
        //ファイルの内容を取得
        const fileContents = fs.readFileSync(fullPath, "utf8");
        //ファイルの内容をパース
        const { data, content } = matter(fileContents);
        //idとデータを返す
        return {
            id,
            content,
            ...data
        }
    });
    //日付順に並び替え
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else if (a.date > b.date) {
            return -1;
        } else {
            return 0;
        }
    });
}

//getStaticPathでretunrでつかうpathを取得する
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, "")
            }
        }
    });
}

//MarkdownをHTMLに変換する
export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // gray-matterを使用して投稿のメタデータ部分を解析
    const { data, content } = matter(fileContents);

    // remarkを使用してマークダウンをHTML文字列に変換
    const processedContent = await remark()
        .use(html)
        .process(content);
    const contentHtml = processedContent.toString();

    // idとcontentHtmlとデータを結合
    return {
        id,
        content,
        contentHtml,
        ...data
    }
}
