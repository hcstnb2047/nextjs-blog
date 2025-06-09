import { getQiitaArticles } from '../../../lib/qiita';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, token } = req.query;

  try {
    // Use the library function which handles default configuration
    const articles = await getQiitaArticles(username, token);

    res.status(200).json({
      success: true,
      articles: articles,
      count: articles.length
    });
  } catch (error) {
    console.error('Error fetching Qiita articles:', error);
    res.status(500).json({ 
      error: 'Failed to fetch articles from Qiita', 
      details: error.message 
    });
  }
}