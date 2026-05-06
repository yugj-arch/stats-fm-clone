# 8x Hiring Template

A modern SaaS starter template for frontend engineering assessments. Built with Next.js 16, React 19, TypeScript, Tailwind CSS, and Supabase.

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+)
- [pnpm](https://pnpm.io/) (or npm/yarn)
- [Docker](https://www.docker.com/) (for local Supabase)
- [Supabase CLI](https://supabase.com/docs/guides/cli)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd 8x-hiring-template
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start local Supabase**
   ```bash
   # If you have another Supabase project running, stop it first:
   # supabase stop --project-id <other-project>

   supabase start
   ```

   This will output your local credentials (note: this project uses custom ports):
   ```
   API URL: http://127.0.0.1:54521
   Publishable key: sb_publishable_...
   Secret key: sb_secret_...
   ```

   Migrations are applied automatically during startup.

4. **Configure environment**
   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local` with the keys from step 3:
   ```
   NEXT_PUBLIC_SUPABASE_URL="http://127.0.0.1:54521"
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="<your-publishable-key>"
   SUPABASE_SERVICE_ROLE_KEY="<your-secret-key>"
   ```

5. **Start development server**
   ```bash
   pnpm dev
   ```

6. **Open** [http://localhost:3000](http://localhost:3000)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI**: React 19 + Tailwind CSS + Shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth (email/password)

## Features

- User authentication (sign up, sign in, sign out)
- Protected routes
- Subscription tiers (Free / Pro)
- Profile management
- Account deletion
- Responsive design
- Dark mode support

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── auth/              # Auth pages (login, signup)
│   ├── profile/           # User profile
│   └── upgrade/           # Subscription upgrade flow
├── components/            # Reusable UI components
├── contexts/              # React Context providers
├── lib/                   # Utilities and Supabase clients
└── supabase/              # Database migrations
```

## Useful Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm lint         # Run ESLint
supabase start    # Start local Supabase (applies migrations)
supabase stop     # Stop local Supabase
supabase studio   # Open Supabase Studio (local admin UI)
```

## Database Schema

The template uses a simple `subscriptions` table:

```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  tier TEXT CHECK (tier IN ('free', 'pro')),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

## Notes

- **No real payments**: The upgrade flow is simulated (writes directly to database)
- **Local auth**: Email verification is disabled in development mode
- **Test accounts**: Use any email/password to sign up locally

---

## Assignment Reflection (Stats.fm Clone)

### What I Built
I built a premium, highly-aesthetic clone of Stats.fm for Spotify. The application connects via Supabase OAuth to Spotify, and provides deep listening analytics including:
- Top Artists and Top Tracks by time period (4-week, 6-month, All-Time).
- An interactive Listening Heatmap generated from recently played tracks.
- A "Music Personality" card that analyzes sonic DNA (top genres) and audio attributes (positivity, energy, danceability), complete with a shareable image export using `html2canvas`.
- The UI is built with a sleek, dark-mode glassmorphic theme and utilizes `framer-motion` for premium, staggered animations on the data grids.

### Issues I Ran Into
1. **Spotify API Rate Limits & Local Testing**: Building an app that relies heavily on a third-party API makes local grading difficult for reviewers without API keys.
   *Solution*: I implemented a robust mock data layer in `lib/spotify.ts` that automatically activates if valid Spotify tokens are not present. This ensures the app is fully functional and reviewable for the judges without needing complex Spotify App configuration on their end.
2. **Heatmap Data Sparsity**: The Spotify API limits the "recently played" endpoint to 50 tracks, making an all-time heatmap impossible without massive data ingestion.
   *Solution*: I built the heatmap to accurately map the last 50 tracks over a 7-day grid, providing a great proof-of-concept for the feature.

### What I'd Improve With More Time
1. **Full History Import**: I'd implement a flow for users to upload their Spotify Data Export ZIP file. This is how the real Stats.fm works, and it allows for true all-time heatmaps.
2. **Caching**: Implementing Redis or React Query for the Spotify endpoints to reduce API hits and improve load times when switching between tabs.
3. **Responsive Cards**: I would optimize the `html2canvas` export for different aspect ratios to perfectly match Instagram Stories vs Twitter.

---

See [CANDIDATE_ASSIGNMENT.md](./CANDIDATE_ASSIGNMENT.md) for assessment instructions.
