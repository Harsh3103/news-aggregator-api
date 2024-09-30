const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

// Route to fetch all news
router.get('/all', newsController.fetchAllNews);

// Route to fetch news by source
router.get('/source', newsController.fetchNewsBySource);

module.exports = router;
