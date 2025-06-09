# デプロイメント設定ガイド

このガイドでは、Qiita連携機能を含むブログのデプロイ方法について説明します。

## 1. 事前準備

### Qiitaアクセストークンの取得（オプション）
1. [Qiita設定ページ](https://qiita.com/settings/applications)にアクセス
2. 「個人用アクセストークン」を生成
3. スコープは `read_qiita` を選択
4. 生成されたトークンを安全に保存

## 2. 設定方法

### 方法1: 環境変数で設定（推奨）

#### Vercelの場合
1. Vercelダッシュボードでプロジェクトを選択
2. Settings → Environment Variables
3. 以下の変数を追加：

```
NEXT_PUBLIC_QIITA_USERNAME=your_qiita_username
QIITA_ACCESS_TOKEN=your_access_token_here
```

#### Netlifyの場合
1. Site settings → Environment variables
2. 同様の環境変数を設定

#### その他のプラットフォーム
各プラットフォームの環境変数設定方法に従って設定してください。

### 方法2: 設定ファイルで設定

`config/site.js`を編集：

```javascript
export const siteConfig = {
  // ...
  qiita: {
    defaultUsername: 'your_qiita_username', // ここを変更
    accessToken: '', // 本番では環境変数を使用
    showByDefault: true,
    cacheTime: 10 * 60 * 1000,
  },
  // ...
};
```

## 3. デプロイ時の動作

### ビルド時の処理
1. SSG時にQiita APIを呼び出して記事を取得
2. 取得に失敗してもビルドは継続（エラーでは止まらない）
3. ISR（増分静的再生成）で10分ごとに更新

### フォールバック機能
- Qiita記事の取得に失敗した場合、エラーバウンダリが表示
- ローカル記事は常に表示可能
- 手動同期機能で後から記事を取得可能

## 4. トラブルシューティング

### ビルドが失敗する場合
1. 環境変数が正しく設定されているか確認
2. Qiitaユーザー名が正しいか確認
3. API制限に引っかかっていないか確認

### Qiita記事が表示されない場合
1. `/admin/settings`で設定を確認
2. 接続テストを実行
3. ブラウザの開発者ツールでエラーを確認

### パフォーマンスの最適化
- ISRの間隔を調整（`revalidate`値を変更）
- 取得記事数を制限（API呼び出しで`per_page`を調整）

## 5. セキュリティ考慮事項

### アクセストークンの管理
- 本番環境では必ず環境変数を使用
- トークンをコードにハードコードしない
- 必要最小限のスコープのみ付与

### API制限
- Qiita APIには呼び出し制限があります
- 頻繁な更新は避ける
- キャッシュを有効活用

## 6. 監視とメンテナンス

### ログの確認
- ビルドログでQiita API呼び出しの成功/失敗を確認
- エラーが継続する場合は設定を見直し

### 定期的なチェック
- Qiitaアクセストークンの有効期限
- API呼び出し制限の状況
- 記事の更新頻度

## 7. 各プラットフォーム固有の設定

### Vercel
```json
{
  "functions": {
    "pages/api/**": {
      "maxDuration": 30
    }
  }
}
```

### Netlify
```toml
[build.environment]
  NEXT_PUBLIC_QIITA_USERNAME = "your_username"
  
[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

## サポート

問題が発生した場合：
1. まず`/admin/settings`で設定を確認
2. ブラウザの開発者ツールでエラーログを確認
3. 必要に応じて手動同期を実行