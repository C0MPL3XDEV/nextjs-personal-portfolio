
## Contact Form

The contact form uses [Formspree](https://formspree.io) for submissions.

### Configuration

The Formspree endpoint is configured in `lib/site-config.ts`:

```typescript
export const siteConfig = {
  // ...
  contact: {
    formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID", // Currently set to mnjbqbwp
  },
}
```

### reCAPTCHA

If you have enabled reCAPTCHA in your Formspree dashboard, the form should work automatically. 
If Formspree requires a client-side token in the future, you may need to integrate the `react-google-recaptcha` library and include `g-recaptcha-response` in the payload. 
Currently, it uses standard AJAX submission.

### Honeypot

A hidden field `companyWebsite` is included to prevent spam bot submissions.

## Spotify Integration

The footer includes a "Now Playing" widget powered by the Spotify Web API.
To enable it, you need to set up a Spotify App in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications) and authorize your account to get a Refresh Token.

Add the following to your `.env` or `.env.local`:

```
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REFRESH_TOKEN=your_refresh_token
```

To get the refresh token:
1. Creating an app in Spotify Dashboard.
2. Add `http://localhost:3000` to Redirect URIs.
3. authorize your user with `user-read-currently-playing` and `user-read-recently-played` scopes.
4. Exchange the code for a refresh token.

## Running tests

This project includes a comprehensive testing suite ensuring code quality and stability.

### Prerequisites

- Node.js installed
- Dependencies installed via `npm install`
- For Playwright (E2E), you may need to install browsers: `npx playwright install`

### Commands

| Type | Command | Description |
|------|---------|-------------|
| **Type Check** | `npm run typecheck` | logical verification of TypeScript types |
| **Unit Tests** | `npm run test` | Runs Jest unit tests |
| **Watch Mode** | `npm run test:watch` | Runs Jest in watch mode |
| **E2E Tests** | `npm run test:e2e` | Runs Playwright end-to-end tests |
| **E2E UI** | `npm run test:e2e:ui` | Opens Playwright UI runner |
| **Full Suite** | `npm run test:all` | Runs lint, typecheck, unit, and E2E tests |

### Notes

- Playwright tests run in headless mode by default. Use `npm run test:e2e:headed` to see the browser.
- Tests are designed to be CI-friendly.
