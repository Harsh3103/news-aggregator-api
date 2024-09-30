const newsAPIService = require('../services/newsAPIService');
const currentsAPIService = require('../services/currentsAPIService');
const guardianAPIService = require('../services/guardianAPIService');

// Fetch all news
const fetchAllNews = async (req, res) => {
    const { query } = req.query;
    try {
        const newsFromNewsAPI = await newsAPIService.fetchNewsFromNewsAPI(query);
        const newsFromCurrentsAPI = await currentsAPIService.fetchNewsFromCurrentsAPI(query);
        const newsFromGuardianAPI = await guardianAPIService.fetchNewsFromGuardianAPI(query);

        const allNews = [
            ...newsFromNewsAPI,
            ...newsFromCurrentsAPI,
            ...newsFromGuardianAPI
        ];

        res.json({
            status: 'success',
            data: allNews
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Failed to fetch news' });
    }
};

// Fetch news by source
const fetchNewsBySource = async (req, res) => {
    const { source, query } = req.query;

    let news = [];
    try {
        switch (source) {
            case 'NewsAPI':
                news = await newsAPIService.fetchNewsFromNewsAPI(query);
                break;
            case 'CurrentsAPI':
                news = await currentsAPIService.fetchNewsFromCurrentsAPI(query);
                break;
            case 'The Guardian':
                news = await guardianAPIService.fetchNewsFromGuardianAPI(query);
                break;
            default:
                return res.status(400).json({ status: 'error', message: 'Invalid source' });
        }

        res.json({
            status: 'success',
            data: news
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Failed to fetch news from source' });
    }
};

module.exports = {
    fetchAllNews,
    fetchNewsBySource
};
