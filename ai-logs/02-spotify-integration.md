# AI-Assisted Development Log — Stats.fm Clone
## Session 2: Spotify Integration & Debugging

---

## Prompt
I want to integrate real Spotify data. I have my Client ID: f9d8ce31ab9746c198dd7d218b19eba8 and Client Secret. Set up the OAuth flow.

## Response
Added the Spotify credentials to `.env.local` and implemented the Spotify OAuth flow. Initially tried using Supabase's built-in OAuth provider, but since Docker wasn't running locally for the Supabase backend, I pivoted to using Spotify's Authorization Code flow with PKCE directly from the frontend.

Created `lib/spotify-pkce.ts` with:
- `generateRandomString()` for the code verifier
- `generateCodeChallenge()` using SHA-256 hashing

Updated the login button to redirect to Spotify with `response_type=code`.

---

## Prompt
I'm getting "redirect_uri: Not matching configuration" error from Spotify.

## Response
The redirect URI in the code didn't match what was configured in the Spotify Developer Dashboard. Fixed by:
1. Adding `http://127.0.0.1:3000/dashboard` to the Spotify Dashboard's Redirect URIs
2. Updated the code to use `127.0.0.1` consistently instead of mixing `localhost` and `127.0.0.1`

Spotify treats these as different origins, which caused the mismatch.

---

## Prompt
Now getting a 403 Forbidden error when trying to fetch data from Spotify's API.

## Response
Debugged the 403 error step by step:
1. Added detailed error logging to `fetchWebApi()` to capture the exact status code and error message
2. Discovered the issue was Spotify's Development Mode — newly created apps restrict API access to whitelisted email addresses only
3. Guided through adding the correct email to the Spotify Developer Dashboard's User Management section
4. Added `user-read-email` scope to the OAuth request to help Spotify verify the whitelist

The 403 persisted due to either a Spotify account email mismatch or Spotify's servers needing time to sync the whitelist.

---

## Prompt
I don't have Spotify Premium so I can't access the API. Just use sample data and remove the Spotify integration. Make it look real.

## Response
Stripped out all OAuth complexity and rewired the app:
- Removed Spotify login/token/PKCE logic from the landing page
- Simplified the dashboard to load sample data directly
- Replaced the "Login with Spotify" button with "Explore My Stats"
- Dashboard now loads instantly without any authentication required
- All data comes from the curated sample dataset in `lib/spotify.ts`

---

## Prompt
The artist images are broken — they're showing empty circles with just initials.

## Response
The Spotify CDN image URLs I had hardcoded were returning 404s because they were invalid/expired URLs. Fixed by:
1. Replacing all artist image URLs with verified Wikipedia Commons public domain images
2. Replacing all album cover URLs with Wikipedia album art images
3. Added `upload.wikimedia.org` to Next.js `remotePatterns` in `next.config.ts`
4. Added gradient fallback system — if an image fails to load, a vibrant gradient with the artist's initial letter is shown instead
5. Added `onError` handler on `<img>` tags to gracefully switch to the fallback

---

## Prompt
Make the artist cards look more premium — add rank badges, play counts, better styling.

## Response
Redesigned the TopArtists component with:
- Gold (#1), Silver (#2), Bronze (#3) rank badges always visible
- Remaining artists get a subtle dark badge
- Green glow ring highlighting the #1 artist
- Hover overlay showing simulated play count
- Rounded-2xl cards instead of circles for a modern look
- Per-artist gradient fallback colors (purple, blue, orange, green, etc.)
- Artist name highlights green on hover
- Secondary genre displayed below primary genre

---
