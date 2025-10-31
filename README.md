## Development quickstart

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the site. The primary UI lives in `components/HomePage.tsx`; global styles are in `styles/globals.css`.

## Production build

```bash
npm run lint
npm run build
npm run start
```

`npm run start` serves the production build locally on port 3000.

## Deployment

The site is ready for Vercel. To publish at **adm3313.noureldin.dev**:

1. In the project root, run `vercel link` and point to the `adm3313` Vercel project (or create one with `vercel`).
2. Deploy with `vercel --prod` (or push to the linked Git branch if CI is enabled). Vercel will run `npm install`, `npm run lint`, and `npm run build` automatically.
3. In the Vercel dashboard, open **Settings → Domains** for the project and add `adm3313.noureldin.dev`.
4. Update the DNS for `noureldin.dev` so the `adm3313` subdomain is a CNAME pointing to `cname.vercel-dns.com` (or follow Vercel’s DNS instructions if the domain is already managed there).
5. After DNS propagates, verify the certificate issuance under **Settings → Domains** and trigger a redeploy if needed.

The repository includes a legacy `/pages/index.js` file that re-exports the App Router homepage, satisfying hosting environments that expect the Pages Router entry point.
