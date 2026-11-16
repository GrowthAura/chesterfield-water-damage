// Cloudflare Pages Function for /404.
//
// Why this exists: Pages resolves /404 to the static file 404.html
// (extensionless serving) and returns 200 BEFORE _redirects rules are
// evaluated, so the `_redirects` rule `/404 /404.html 404` never fires
// (measured live 2026-11-17: /404 -> 200 on both hosts). A path-specific
// Function runs before static-asset serving for its route, so it can
// return the real 404 status. It fetches 404.html from the asset store
// directly (env.ASSETS bypasses Pages routing) and returns it with 404.
//
// Deploys with the site: keep this file in the source tree at
// functions/404.js and copy it into the deploy branch on every sync
// (the Next.js export does NOT copy it into out/ — out/ is regenerated).
export async function onRequest(context) {
  const res = await context.env.ASSETS.fetch(
    new URL('/404.html', context.request.url)
  );
  if (!res.ok) {
    return new Response('Page not found', {
      status: 404,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    });
  }
  const headers = new Headers(res.headers);
  headers.set('x-robots-tag', 'noindex');
  return new Response(res.body, { status: 404, headers });
}
