const axios = require('axios');

// Fetch news from The Guardian API
const fetchNewsFromGuardianAPI = async (query = '') => {
    const apiKey = '45948d98-03be-4243-87ac-81b97251db24';
    const url = query ? 
        `https://content.guardianapis.com/search?q=${query}&api-key=${apiKey}` :
        `https://content.guardianapis.com/search?api-key=${apiKey}`;
    
    try {
        const response = await axios.get(url);
        return response.data.response.results.map(article => ({
            ...article,
            apisource: 'The Guardian' // Add source field
        }));
    } catch (error) {
        console.error('Error fetching from GuardianAPI:', error);
        return [];
    }
};

module.exports = {
    fetchNewsFromGuardianAPI
};
