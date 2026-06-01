// Cloudflare Workers entry point — wraps the Express app via fetch handler

const PLUGINS = [
  {
    name: 'hello-world',
    version: '1.0.0',
    description: 'Plugin de ejemplo que devuelve un saludo personalizado',
    author: 'Ikerlan',
    tags: ['ejemplo', 'demo', 'saludo'],
  },
];

function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function searchPlugins(query) {
  if (!query) return PLUGINS;
  const q = query.toLowerCase();
  return PLUGINS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.tags?.some((t) => t.toLowerCase().includes(q))
  );
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname, searchParams } = url;

    if (pathname === '/') {
      return json({
        name: 'Plugin Marketplace API',
        version: '1.0.0',
        runtime: 'Cloudflare Workers',
        endpoints: {
          health: 'GET /health',
          listPlugins: 'GET /api/plugins',
          searchPlugins: 'GET /api/plugins?q=<query>',
          getPlugin: 'GET /api/plugins/:name',
        },
      });
    }

    if (pathname === '/health') {
      return json({ status: 'ok', pluginsLoaded: PLUGINS.length, runtime: 'Cloudflare Workers' });
    }

    if (pathname === '/api/plugins') {
      const results = searchPlugins(searchParams.get('q'));
      return json({ total: results.length, plugins: results });
    }

    const pluginMatch = pathname.match(/^\/api\/plugins\/([^/]+)$/);
    if (pluginMatch) {
      const name = pluginMatch[1];
      const plugin = PLUGINS.find((p) => p.name === name);
      if (!plugin) return json({ error: 'Plugin not found' }, 404);
      return json(plugin);
    }

    return json({ error: 'Not found' }, 404);
  },
};
