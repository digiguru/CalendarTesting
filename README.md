# CalendarTesting

A small static prototype for experimenting with calendar layouts and date-range helpers.

## Development

Requires Node.js 22 or newer.

```bash
npm ci
npm run check
```

The quality pipeline runs:

- `npm run lint` — JavaScript syntax and project metadata checks
- `npm test` — unit tests for date helpers and month generation
- `npm run build` — creates the deployable static site in `dist/`
- `npm run smoke` — verifies the built site has a root page and required assets

## Deployment

`vercel.json` configures Vercel to install with `npm ci`, build with `npm run build`, and publish `dist/`.

The root deployment is `index.html`; the older `calendar.htm` and `calendar-no-weeks.htm` pages remain available as static pages.
