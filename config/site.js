// Site configuration
export const siteConfig = {
  // Basic site info
  name: 'Tanabe DevLog',
  description: 'SIer勤務のシステムエンジニアによる技術ブログ。フロントエンド開発と個人開発の記録。',
  
  // Author info
  author: {
    name: 'Tanabe',
    profileImage: '/images/my_profile.jpg',
    social: {
      x: 'https://x.com/tanabe47', // XアカウントURL
      github: 'https://github.com/hcstnb2047', // GitHubアカウントURL
    }
  },
  
  // Qiita integration
  qiita: {
    // あなたのQiitaユーザー名をここに設定してください
    defaultUsername: 'tnb47', 
    
    // アクセストークン（限定記事を表示したい場合）
    // 本番環境では環境変数を使用することを推奨
    accessToken: process.env.QIITA_ACCESS_TOKEN || '',
    
    // デフォルトでQiita記事を表示するかどうか
    showByDefault: true,
    
    // キャッシュ時間（ミリ秒）
    cacheTime: 10 * 60 * 1000, // 10分
  },
  
  // Features
  features: {
    qiitaIntegration: true,
    darkMode: true,
  }
};