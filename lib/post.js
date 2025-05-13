import path from "path";
import fs from "fs";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

//mdファイルのデータを取り出す
export function getSortedPostsData() {
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
        const matter = matter(fileContents);
        //idとデータを返す
        return {
            id,
            ...matter.data
        }
    });
    //日付順に並び替え
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        }
    });
}

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