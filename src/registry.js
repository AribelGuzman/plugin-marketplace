const path = require('path');
const fs = require('fs');

const PLUGINS_DIR = path.join(__dirname, '..', 'plugins');

function loadPlugins() {
  if (!fs.existsSync(PLUGINS_DIR)) return {};

  const entries = fs.readdirSync(PLUGINS_DIR, { withFileTypes: true });
  const plugins = {};

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const metaPath = path.join(PLUGINS_DIR, entry.name, 'plugin.json');
    if (!fs.existsSync(metaPath)) continue;

    try {
      const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
      plugins[meta.name] = { ...meta, dir: entry.name };
    } catch {
      console.warn(`[registry] could not load plugin at ${entry.name}`);
    }
  }

  return plugins;
}

function getPlugin(name) {
  const plugins = loadPlugins();
  return plugins[name] ?? null;
}

function searchPlugins(query) {
  const plugins = Object.values(loadPlugins());
  if (!query) return plugins;

  const q = query.toLowerCase();
  return plugins.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.tags?.some((t) => t.toLowerCase().includes(q))
  );
}

module.exports = { loadPlugins, getPlugin, searchPlugins };
