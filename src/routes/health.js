const express = require('express');
const { loadPlugins } = require('../registry');

const router = express.Router();

router.get('/', (_req, res) => {
  const plugins = loadPlugins();
  res.json({
    status: 'ok',
    version: process.env.npm_package_version ?? '1.0.0',
    pluginsLoaded: Object.keys(plugins).length,
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
