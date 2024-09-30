const express = require('express');
const router = express.Router();
const newsAPIService = require('../services/newsAPIService');
const currentsAPIService = require('../services/currentsAPIService');
const guardianAPIService = require('../services/guardianAPIService');

// Fetch news from a specific source
router.get('/source/:source', async (req, res) => {
    const source = req.params.source.toLowerCase();
    const query = req.query.q || ''; // Get search query if provided

    let newsArticles = [];
    try {
        if (source === 'newsapi') {
            newsArticles = await newsAPIService.fetchNewsFromNewsAPI(query);
        } else if (source === 'currentsapi') {
            newsArticles = await currentsAPIService.fetchNewsFromCurrentsAPI(query);
        } else if (source === 'guardian') {
            newsArticles = await guardianAPIService.fetchNewsFromGuardianAPI(query);
        } else {
            return res.status(400).json({ status: 'error', message: 'Invalid source' });
        }

        res.json({ status: 'success', data: newsArticles });
    } catch (error) {
        console.error('Error fetching news from source:', error);
        res.status(500).json({ status: 'error', message: 'Error fetching news' });
    }
});

module.exports = router;
