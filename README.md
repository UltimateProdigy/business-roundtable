# Ibadan Business Roundtable

The official Next.js web platform for the **Ibadan Business Roundtable** — an executive forum for business owners, founders, SME leaders, and investors in Ibadan and its environs.

## Features
- **ElevateHub-Inspired Theme**: Deep Navy Blue (`#005891`) & Lime Accent (`#c5d51a`) palette with `Titan One` headings and `Outfit` typography.
- **Speaker & Panelist Showcase (`/speakers`)**: Profiles, session topics, and full event agenda.
- **Call for Sponsors & Ecosystem Partners (`/sponsors`)**: 4 sponsorship & exhibition tiers (**Headline/Platinum**, **Gold**, **Silver**, **Exhibition Booth**) with an interactive Sponsor Inquiry Form, bank transfer copy-to-clipboard, and WhatsApp fast-track.
- **Business Registration (`/register`)**: Supports both **Free Standard Business Pass** and **Paid VIP Executive / Exhibition Pass** (`₦25,000`) with instant GTBank account copy, WhatsApp proof-of-payment link, and Ibadan Business Owners WhatsApp community onboarding.
- **Secretariat Admin Control Center (`/admin`)**: Manage registered businesses, verify VIP payments, track sponsor inquiries, message leads on WhatsApp, and export CSVs.

## Getting Started

1. Configure environment variables in `.env.local` (see `.env.example`):
   ```bash
   cp .env.example .env.local
   ```
2. Run the SQL schema in [supabase_schema.sql](./supabase_schema.sql) inside your Supabase SQL Editor.
3. Start the development server:
   ```bash
   pnpm dev
   ```
