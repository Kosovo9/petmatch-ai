# 🚀 PetMatch AI - Quick Start Guide

Get PetMatch AI running locally in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- npm 9+ installed
- Git installed

## Step 1: Install Dependencies (2 minutes)

```bash
cd petmatch-ai
npm install
```

This will install all required packages including:
- Next.js 14.2
- React 18.3
- Supabase client
- Stripe
- Tailwind CSS
- And 20+ other dependencies

## Step 2: Setup Environment Variables (1 minute)

Create `.env.local` file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your keys:

```env
# Supabase (Get from supabase.com)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...

# Stripe (Get from stripe.com)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Don't have Supabase/Stripe yet?** You can still run the app! Just use placeholder values for now.

## Step 3: Run Development Server (30 seconds)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 4: Test Key Features (1 minute)

Visit these URLs to test:

1. **Home Page:** `http://localhost:3000`
   - Should redirect to `http://localhost:3000/es-MX` (or your locale)

2. **Service Page:** `http://localhost:3000/es-MX/paseo/cdmx`
   - Dog walkers in Mexico City

3. **Love Stories:** `http://localhost:3000/es-MX/love-stories`
   - Adoption stories

4. **Pet Travel:** `http://localhost:3000/es-MX/volar-con-mascota`
   - Airline policies

## What's Working Out of the Box?

✅ **Routing:** All dynamic routes configured  
✅ **i18n:** 20 languages with auto-detection  
✅ **Styling:** Tailwind CSS fully configured  
✅ **TypeScript:** Full type safety  
✅ **Middleware:** Geolocation routing active  
✅ **SEO:** Meta tags and sitemap ready  

## What Needs Setup?

⚠️ **Database:** Supabase tables need to be created  
⚠️ **Payments:** Stripe products need configuration  
⚠️ **Content:** Pages need real data  
⚠️ **Images:** Placeholder images need replacement  

## Next Steps

### Option A: Quick Demo (No Setup Required)

Just run `npm run dev` and explore the UI. All pages will work with placeholder data.

### Option B: Full Setup (30 minutes)

1. **Setup Supabase:**
   ```bash
   # Go to supabase.com and create project
   # Run SQL from supabase/schema.sql
   # Add credentials to .env.local
   ```

2. **Setup Stripe:**
   ```bash
   # Go to stripe.com and create account
   # Create products for subscriptions
   # Add credentials to .env.local
   ```

3. **Restart dev server:**
   ```bash
   npm run dev
   ```

### Option C: Deploy to Production (1 hour)

Follow the complete guide in `DEPLOYMENT.md`

## Common Issues

### Port 3000 Already in Use

```bash
# Use different port
npm run dev -- -p 3001
```

### TypeScript Errors

These are normal before `npm install`. After installation, restart your editor.

### Module Not Found

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Fails

```bash
# Check Node version
node --version  # Should be 18+

# Clear Next.js cache
rm -rf .next
npm run build
```

## Development Workflow

### Making Changes

1. Edit files in `src/`
2. Changes auto-reload in browser
3. Check console for errors

### Adding New Pages

```bash
# Create new page
touch src/app/[locale]/new-page/page.tsx

# Add translations
# Edit messages/es-MX.json
# Edit messages/en-US.json
```

### Testing Build

```bash
npm run build
npm start
```

## Project Structure

```
petmatch-ai/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── [locale]/     # Localized routes
│   │   ├── layout.tsx    # Root layout
│   │   └── globals.css   # Global styles
│   ├── components/       # React components (to be created)
│   ├── lib/              # Utilities
│   │   ├── supabase/     # Database clients
│   │   └── utils.ts      # Helper functions
│   └── types/            # TypeScript types
├── messages/             # i18n translations
├── supabase/             # Database schema
├── public/               # Static assets
└── package.json          # Dependencies
```

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript
```

## Getting Help

- **Documentation:** See `README.md`
- **Deployment:** See `DEPLOYMENT.md`
- **TODO List:** See `TODO.md`
- **Database Schema:** See `supabase/schema.sql`

## Quick Tips

1. **Hot Reload:** Changes auto-reload, no need to restart
2. **TypeScript:** Hover over code for type hints
3. **Tailwind:** Use className for styling
4. **Console:** Check browser console for errors
5. **Network:** Check Network tab for API calls

## Success Checklist

After setup, verify:

- [ ] `npm run dev` starts without errors
- [ ] Home page loads at `http://localhost:3000`
- [ ] Geolocation redirects to locale (e.g., `/es-MX`)
- [ ] Service pages load (e.g., `/es-MX/paseo/cdmx`)
- [ ] No console errors in browser
- [ ] Tailwind styles are applied
- [ ] Images load correctly

## What's Next?

1. **Explore the code** - Check out the file structure
2. **Read the docs** - See `README.md` for full details
3. **Add content** - Start populating with real data
4. **Deploy** - Follow `DEPLOYMENT.md` when ready

---

**You're all set! Happy coding! 🎉**

Need help? Check the documentation or create an issue.
