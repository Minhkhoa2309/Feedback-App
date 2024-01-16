
const mongoose = require('mongoose')
require('dotenv').config();
const createServer = require('./utils/server');

// Start Express server
const app = createServer();
const PORT = process.env.PORT || 3000;


app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connect to DB.')
});
