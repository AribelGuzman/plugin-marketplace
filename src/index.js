const express = require('express');
const pluginsRouter = require('./routes/plugins');
const healthRouter = require('./routes/health');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.use('/health', healthRouter);
app.use('/api/plugins', pluginsRouter);

app.get('/', (_req, res) => {
  res.json({
    name: 'Plugin Marketplace API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /health',
      listPlugins: 'GET /api/plugins',
      searchPlugins: 'GET /api/plugins?q=<query>',
      getPlugin: 'GET /api/plugins/:name',
      installPlugin: 'POST /api/plugins/:name/install',
    },
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Plugin Marketplace running on http://localhost:${PORT}`);
});

module.exports = app;
