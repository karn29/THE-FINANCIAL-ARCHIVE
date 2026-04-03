# Testing: The Financial Archive

## Local Dev Setup

```bash
npm install
npx vite --port=3000 --host=0.0.0.0
# App runs at http://localhost:3000 (or next available port if 3000 is in use)
```

## Lint & Build

```bash
npm run lint    # runs tsc --noEmit
npm run build   # runs vite build
```

## Key Architecture

- `src/AppRoot.tsx` — Root wrapper that gates on auth. Checks `localStorage.loggedInUser`; renders `AuthPage` if absent, `App` if present.
- `src/components/AuthPage.tsx` — Login/signup with animated member counter.
- `src/components/Testimonials.tsx` — Field reports section with submit form and review cards. Rendered at bottom of `App.tsx` before footer.
- The existing app has a "Welcome to The Boardroom" modal that appears on first entry — you need to fill it out or dismiss it before scrolling to testimonials.

## localStorage Keys

| Key | Shape | Notes |
|---|---|---|
| `registeredUsers` | `[{ name, email, password, joinedAt }]` | Array of registered users |
| `loggedInUser` | `{ name, email }` | Set on login, cleared on logout |
| `userReviews` | `[{ name, role, rating, text, submittedAt }]` | User-submitted reviews |

## Testing Auth Page

1. Clear localStorage: `localStorage.clear(); location.reload();`
2. Verify counter shows "0 ANALYSTS ENROLLED"
3. Submit empty form → expect "All fields are required."
4. Submit invalid email → browser native validation blocks it
5. Submit valid signup → toast appears, counter increments, redirects after ~2s
6. Remove `loggedInUser` from localStorage, reload → auth page shows with counter = N
7. Click "ACCESS DOSSIER" tab → only email/password fields shown
8. Wrong password → "Credentials unverified. Access denied."
9. Correct password → toast + redirect
10. Try signup with duplicate email → "This channel is already registered."

## Testing Testimonials

1. After auth, dismiss the Boardroom modal (fill form or interact with it)
2. Scroll to bottom of page to find "ANALYST FIELD REPORTS" section
3. Verify 3 seed reviews if localStorage has no `userReviews`: Rohan Mehta, Ananya Iyer, Dev Kapoor
4. Form pre-fills "Operative Name" from `loggedInUser`
5. Fill designation, click stars (interactive rating), type review text
6. Character counter updates live (e.g., "95 / 300")
7. Submit → new card appears at top, form resets, success message shown
8. Verify localStorage `userReviews` has the new entry

## Tips

- The Boardroom modal (from the original app) blocks interaction on first load after auth. Fill the form to dismiss it.
- Star rating uses clickable `<span>` elements — click the Nth star to set rating to N.
- The submit button is disabled until name, rating, and text are all provided.
- Reviews are displayed in a 2-column masonry grid on desktop, horizontal scroll on mobile.

## Devin Secrets Needed

None — this app uses localStorage only, no backend or API keys required.
