# Baseline Build & Lint Output

## Command Execution
Executed: `npm install && npm run lint && npm run build`

## Output
```
> complexdev-portfolio@0.1.0 lint
> next lint

✔ No ESLint warnings or errors
> complexdev-portfolio@0.1.0 build
> next build

  ▲ Next.js 14.2.3
  - Environments: .env

   Creating an optimized production build ...
 ✓ Compiled successfully
 ✓ Linting and checking validity of types
 ✓ Collecting page data
 ✓ Generating static pages (5/5)
 ✓ Collecting build traces
 ✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    78.3 kB         165 kB
└ ○ /_not-found                          871 B          87.9 kB
+ First Load JS shared by all            87 kB
  ├ chunks/23-987a85f4a7325c89.js        31.5 kB
  ├ chunks/fd9d1056-b844ce094a61356f.js  50.5 kB
  ├ chunks/main-app-3286b97664c7827e.js  236 B
  └ chunks/webpack-6ce95ee038e1378f.js   1.48 kB


○  (Static)  prerendered as static content
```

## Observations
- Build successful.
- Linting passed with no errors.
- No test script available in `package.json`.
