const axios = require('axios');

// Fetch news from NewsAPI.org
const fetchNewsFromNewsAPI = async (query = '') => {
    const apiKey = '1929dc5c2f334662af1a38070c9a2357';
    const url = query ? 
        `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}` :
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    
    try {
        const response = await axios.get(url);
        return response.data.articles.map(article => ({
            ...article,
            apisource: 'NewsAPI' // Add source field
        }));
    } catch (error) {
        console.error('Error fetching from NewsAPI:', error);
        return [];
    }
};

module.exports = {
    fetchNewsFromNewsAPI
};
