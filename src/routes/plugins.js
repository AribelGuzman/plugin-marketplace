const express = require('express');
const { loadPlugins, getPlugin, searchPlugins } = require('../registry');

const router = express.Router();

router.get('/', (req, res) => {
  const { q } = req.query;
  const results = searchPlugins(q);
  res.json({ total: results.length, plugins: results });
});

router.get('/:name', (req, res) => {
  const plugin = getPlugin(req.params.name);
  if (!plugin) return res.status(404).json({ error: 'Plugin not found' });
  res.json(plugin);
});

router.post('/:name/install', (req, res) => {
  const plugin = getPlugin(req.params.name);
  if (!plugin) return res.status(404).json({ error: 'Plugin not found' });

  res.json({
    message: `Plugin "${plugin.name}@${plugin.version}" ready to install`,
    install: `npm install ${plugin.package ?? plugin.name}`,
  });
});

module.exports = router;
