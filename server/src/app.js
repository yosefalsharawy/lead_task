const express = require('express');
const leadRoutes = require('./routes/lead.routes');
const { errorHandler } = require('./middleware/error.middleware');

const app = express();
app.use(express.json());
app.use('/api/v1/leads', leadRoutes);
app.use(errorHandler);

module.exports = app;
