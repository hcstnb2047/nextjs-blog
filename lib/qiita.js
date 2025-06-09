import { siteConfig } from '../config/site';

// Qiita記事を取得する関数
export async function getQiitaArticles(username, token) {
  const finalUsername = username || siteConfig.qiita.defaultUsername || process.env.NEXT_PUBLIC_QIITA_USERNAME;
  const finalToken = token || siteConfig.qiita.accessToken;
  
  if (!finalUsername) {
    throw new Error('Qiita username is not configured');
  }

  const headers = {};
  if (finalToken) {
    headers['Authorization'] = `Bearer ${finalToken}`;
  }

  const response = await fetch(
    `https://qiita.com/api/v2/users/${finalUsername}/items?page=1&per_page=100`,
    { headers }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch articles: ${response.status} ${response.statusText}`);
  }

  const articles = await response.json();

  // Transform articles to match our blog post format
  return articles.map(article => ({
    id: article.id,
    title: article.title,
    date: new Date(article.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    created_at: article.created_at,
    updated_at: article.updated_at,
    url: article.url,
    tags: article.tags,
    likes_count: article.likes_count,
    comments_count: article.comments_count,
    body: article.body,
    rendered_body: article.rendered_body,
    user: {
      id: article.user.id,
      name: article.user.name,
      profile_image_url: article.user.profile_image_url
    },
    // Add source identifier
    source: 'qiita'
  }));
}

// SSG用：ビルド時にQiita記事を取得
export async function getStaticQiitaArticles() {
  try {
    // ビルド時は環境変数を優先
    const username = process.env.NEXT_PUBLIC_QIITA_USERNAME || siteConfig.qiita.defaultUsername;
    const token = process.env.QIITA_ACCESS_TOKEN || siteConfig.qiita.accessToken;
    
    if (!username) {
      console.warn('No Qiita username configured for build');
      return [];
    }
    
    console.log(`Fetching Qiita articles for user: ${username}`);
    return await getQiitaArticles(username, token);
  } catch (error) {
    console.warn('Failed to fetch Qiita articles during build:', error.message);
    // ビルドは失敗させずに空配列を返す
    return [];
  }
}