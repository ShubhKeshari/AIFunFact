require('dotenv').config();
const express = require('express');
const cors = require('cors');
const config = require('./config');
const funFactRoutes = require('./routes/funFactRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', funFactRoutes);

// Start server
app.listen(config.PORT, () => {
  console.log(`Fun Facts API server running on http://localhost:${config.PORT}`);
});

