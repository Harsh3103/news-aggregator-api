const express = require('express');
const cors = require('cors'); // Import the cors package

const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS for all routes
app.use(cors());

// Other middleware and routes
app.use(express.json());
app.use('/api/news', require('./routes/newsRoutes'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
