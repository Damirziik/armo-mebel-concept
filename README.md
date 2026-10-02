# ARMO Mebel — Website Concept V2

A complete independent website concept for a custom furniture workshop in Astana. The project translates the real business information and project range published by `@armo_mebel_astana` into a calm architectural catalogue.

> This is an independent portfolio concept.  
> ARMO Mebel did not commission or endorse this redesign.

## Direction

- Architectural interior editorial + contemporary furniture catalogue.
- Warm limestone, charcoal, olive, walnut and muted bronze palette.
- Onest + Unbounded typography with full Cyrillic support.
- Modular 12-column desktop grid and intentionally varied mobile project rhythm.

## Functionality

- Responsive navigation and mobile menu.
- Data-driven project catalogue and filters.
- Accessible keyboard-operated lightbox with Escape and arrow controls.
- Centralised contact configuration.
- WhatsApp, phone and Instagram links.
- Reduced-motion support, focus states, semantic headings and no-index metadata.

## Stack

Vite, semantic HTML, modular CSS and vanilla JavaScript. Playwright covers responsive layouts, overflow, console errors, navigation, lightbox and asset loading.

## Sources and assets

- [Research notes](docs/SOURCE_NOTES.md)
- [Final Instagram research](docs/ARMO_INSTAGRAM_RESEARCH.md)
- [Media index](docs/ARMO_MEDIA_INDEX.md)
- [Project grouping](docs/ARMO_PROJECT_GROUPING.md)
- [Before/after verification](docs/ARMO_BEFORE_AFTER_REPORT.md)
- [Asset attribution](docs/ASSET_SOURCES.md)

Public Instagram preview images are included only for this clearly labelled concept case study and remain the property of their rights holders.

## Local setup

```bash
npm install
npm run dev
```

Production check:

```bash
npm run build
npm run preview
npm run test:e2e
```

## Deployment

The repository contains a Vercel SPA rewrite in `vercel.json`; pushes to the connected repository deploy to [armo-mebel-concept.vercel.app](https://armo-mebel-concept.vercel.app/).
