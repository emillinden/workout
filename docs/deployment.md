# Deployment guide

Goal: host the built SPA inside a subdirectory on your existing PHP site (client-only JS, no SSR).

Build
- pnpm build → outputs dist/

Upload
- Copy the entire dist/ folder contents to your target subdirectory, e.g. /public_html/workout/
- Because vite.config.ts has base: './', asset URLs are relative and will work from a subfolder.

Optional: SPA fallback for deep links
- If your server serves 404 for /workout/some/path, you can add a simple .htaccess to rewrite to index.html.
- Only do this if you add client-side routing later. The current app is a single-page with no routes.

Example .htaccess (Apache):
```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /workout/
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /workout/index.html [L]
</IfModule>
```

Cache busting
- Vite fingerprints assets, so you can enable long cache headers safely.

