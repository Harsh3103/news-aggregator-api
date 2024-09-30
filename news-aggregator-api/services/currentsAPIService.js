const axios = require('axios');

// Fetch news from CurrentsAPI
const fetchNewsFromCurrentsAPI = async (query = '') => {
    const apiKey = 'q7NZFTHG6B6RrPNuIgehM27DF-vK6SGnFCeN1z6NqkR5NBf_';
    const url = query ? 
        `https://api.currentsapi.services/v1/search?keywords=${query}&apiKey=${apiKey}` :
        `https://api.currentsapi.services/v1/latest-news?apiKey=${apiKey}`;
    
    try {
        const response = await axios.get(url);
        return response.data.news.map(article => ({
            ...article,
            apisource: 'CurrentsAPI' // Add source field
        }));
    } catch (error) {
        console.error('Error fetching from CurrentsAPI:', error);
        return [];
    }
};

module.exports = {
    fetchNewsFromCurrentsAPI
};
