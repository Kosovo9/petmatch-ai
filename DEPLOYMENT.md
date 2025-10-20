# 🚀 PetMatch AI - Deployment Guide

Complete step-by-step guide to deploy PetMatch AI to production on Vercel.

## Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] npm 9+ installed
- [ ] Git repository created
- [ ] Supabase account created
- [ ] Stripe account created
- [ ] Vercel account created
- [ ] Domain name (optional but recommended)

## Step 1: Supabase Setup

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details:
   - **Name:** petmatch-ai-production
   - **Database Password:** (generate strong password)
   - **Region:** Choose closest to your users
4. Wait for project to be created (~2 minutes)

### 1.2 Run Database Schema

1. In Supabase Dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy entire contents of `supabase/schema.sql`
4. Paste and click "Run"
5. Verify all tables created successfully

### 1.3 Configure Storage Buckets

1. Go to **Storage** in Supabase Dashboard
2. Create buckets:
   - `avatars` (public)
   - `pet-photos` (public)
   - `love-story-photos` (public)
   - `provider-photos` (public)
   - `documents` (private)

3. Set bucket policies:
```sql
-- Allow public read access
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'pet-photos');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated Upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'pet-photos' AND 
    auth.role() = 'authenticated'
  );
```

### 1.4 Get API Keys

1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL:** `https://xxxxx.supabase.co`
   - **anon/public key:** `eyJhbGc...`
   - **service_role key:** `eyJhbGc...` (keep secret!)

## Step 2: Stripe Setup

### 2.1 Create Stripe Account

1. Go to [stripe.com](https://stripe.com)
2. Create account or sign in
3. Complete business verification

### 2.2 Create Products

Create these products in Stripe Dashboard:

#### Smart Collar Subscriptions
```
Product: Smart Collar Basic
Price: $9.99/month
Recurring: Monthly
```

```
Product: Smart Collar Premium
Price: $19.99/month
Recurring: Monthly
```

```
Product: Smart Collar Enterprise
Price: $49.99/month
Recurring: Monthly
```

#### Course Products
```
Product: Pet First Aid Course
Price: $49.99
One-time payment
```

### 2.3 Setup Webhooks

1. Go to **Developers** → **Webhooks**
2. Click "Add endpoint"
3. Endpoint URL: `https://petmatch-ai.vercel.app/api/webhooks/stripe`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy **Signing secret** (starts with `whsec_`)

### 2.4 Get API Keys

1. Go to **Developers** → **API keys**
2. Copy:
   - **Publishable key:** `pk_live_...` or `pk_test_...`
   - **Secret key:** `sk_live_...` or `sk_test_...`

## Step 3: Local Testing

### 3.1 Install Dependencies

```bash
cd petmatch-ai
npm install
```

### 3.2 Configure Environment Variables

Create `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### 3.3 Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` and verify:
- [ ] Home page loads
- [ ] Geolocation redirects work
- [ ] Service pages load (`/paseo/cdmx`)
- [ ] Love stories page loads
- [ ] No console errors

### 3.4 Test Build

```bash
npm run build
npm start
```

Verify build completes without errors.

## Step 4: Vercel Deployment

### 4.1 Install Vercel CLI

```bash
npm install -g vercel
```

### 4.2 Login to Vercel

```bash
vercel login
```

### 4.3 Link Project

```bash
vercel link
```

Follow prompts:
- **Set up and deploy?** Yes
- **Which scope?** Your account
- **Link to existing project?** No
- **Project name?** petmatch-ai
- **Directory?** ./

### 4.4 Configure Environment Variables

```bash
# Add production environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production
vercel env add STRIPE_SECRET_KEY production
vercel env add STRIPE_WEBHOOK_SECRET production
vercel env add NEXT_PUBLIC_APP_URL production
```

Or add via Vercel Dashboard:
1. Go to project settings
2. Navigate to **Environment Variables**
3. Add each variable with production scope

### 4.5 Deploy to Production

```bash
vercel --prod
```

Wait for deployment to complete (~2-3 minutes).

### 4.6 Verify Deployment

Visit your production URL (e.g., `https://petmatch-ai.vercel.app`)

Check:
- [ ] Home page loads correctly
- [ ] Geolocation works (test from different countries using VPN)
- [ ] All routes accessible
- [ ] Images load properly
- [ ] No console errors
- [ ] Lighthouse score > 95

## Step 5: Domain Configuration (Optional)

### 5.1 Add Custom Domain

1. In Vercel Dashboard, go to **Settings** → **Domains**
2. Click "Add"
3. Enter your domain: `petmatch-ai.com`
4. Follow DNS configuration instructions

### 5.2 Update DNS Records

Add these records to your domain registrar:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 5.3 Update Environment Variables

```bash
vercel env add NEXT_PUBLIC_APP_URL production
# Enter: https://petmatch-ai.com
```

### 5.4 Redeploy

```bash
vercel --prod
```

## Step 6: Post-Deployment Configuration

### 6.1 Update Stripe Webhook URL

1. Go to Stripe Dashboard → **Webhooks**
2. Update endpoint URL to: `https://petmatch-ai.com/api/webhooks/stripe`
3. Test webhook

### 6.2 Configure Supabase Auth

1. In Supabase Dashboard, go to **Authentication** → **URL Configuration**
2. Add Site URL: `https://petmatch-ai.com`
3. Add Redirect URLs:
   - `https://petmatch-ai.com/auth/callback`
   - `https://petmatch-ai.com/auth/confirm`

### 6.3 Enable Vercel Features

In Vercel Dashboard:

1. **Analytics**
   - Go to **Analytics** tab
   - Enable Web Analytics
   - Enable Audiences

2. **Speed Insights**
   - Go to **Speed Insights** tab
   - Enable Real Experience Score

3. **Edge Config** (Optional)
   - Create Edge Config for feature flags
   - Link to project

### 6.4 Setup Monitoring

1. **Vercel Monitoring**
   - Enable in project settings
   - Set up alerts for errors

2. **Supabase Monitoring**
   - Go to **Reports** in Supabase
   - Monitor database performance
   - Set up alerts

3. **Stripe Monitoring**
   - Enable email notifications
   - Monitor failed payments

## Step 7: SEO & Performance

### 7.1 Submit Sitemap

```bash
# Sitemap is auto-generated at build time
# Submit to search engines:
```

**Google Search Console:**
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property: `https://petmatch-ai.com`
3. Verify ownership
4. Submit sitemap: `https://petmatch-ai.com/sitemap.xml`

**Bing Webmaster Tools:**
1. Go to [bing.com/webmasters](https://www.bing.com/webmasters)
2. Add site
3. Submit sitemap

### 7.2 Verify Core Web Vitals

Run Lighthouse audit:
```bash
npx lighthouse https://petmatch-ai.com --view
```

Target scores:
- Performance: > 95
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 95

### 7.3 Setup CDN Caching

Vercel automatically handles this, but verify:
- Static assets cached for 1 year
- API routes have appropriate cache headers
- ISR working correctly (3600s revalidation)

## Step 8: Security Checklist

- [ ] All environment variables are secret
- [ ] Supabase RLS policies enabled
- [ ] HTTPS enforced (automatic with Vercel)
- [ ] CORS configured correctly
- [ ] Rate limiting enabled (Vercel automatic)
- [ ] SQL injection protection (Supabase automatic)
- [ ] XSS protection headers set
- [ ] CSP headers configured

## Step 9: Backup & Recovery

### 9.1 Database Backups

Supabase automatically backs up daily. To create manual backup:

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Create backup
supabase db dump -f backup.sql
```

### 9.2 Code Backups

Ensure Git repository is pushed:
```bash
git push origin main
```

### 9.3 Environment Variables Backup

Save all environment variables securely:
```bash
vercel env pull .env.production
```

Store `.env.production` in secure location (NOT in Git).

## Step 10: Monitoring & Maintenance

### Daily Checks
- [ ] Check Vercel deployment status
- [ ] Monitor error rates in Vercel Analytics
- [ ] Check Stripe payment success rate
- [ ] Review Supabase database performance

### Weekly Tasks
- [ ] Review user feedback
- [ ] Check Core Web Vitals
- [ ] Update content (recipes, courses, etc.)
- [ ] Review and respond to support tickets

### Monthly Tasks
- [ ] Update dependencies: `npm update`
- [ ] Review and optimize database queries
- [ ] Analyze traffic patterns
- [ ] Review and adjust pricing
- [ ] Security audit

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
vercel --force
```

### Environment Variables Not Working

```bash
# Pull latest env vars
vercel env pull

# Verify in Vercel Dashboard
```

### Database Connection Issues

1. Check Supabase project status
2. Verify API keys are correct
3. Check RLS policies
4. Review connection pooling settings

### Slow Performance

1. Check Vercel Analytics for bottlenecks
2. Review database query performance in Supabase
3. Optimize images (use WebP/AVIF)
4. Enable ISR for dynamic pages
5. Review bundle size: `npm run build -- --analyze`

## Support

For deployment issues:
- Vercel: [vercel.com/support](https://vercel.com/support)
- Supabase: [supabase.com/support](https://supabase.com/support)
- Stripe: [support.stripe.com](https://support.stripe.com)

## Success Criteria

Your deployment is successful when:
- ✅ All pages load in < 1.5s
- ✅ Lighthouse score > 95
- ✅ Zero console errors
- ✅ Geolocation routing works
- ✅ Payments process successfully
- ✅ Database queries execute quickly
- ✅ All 120+ URLs in sitemap
- ✅ SSL certificate active
- ✅ Monitoring alerts configured

---

**Congratulations! PetMatch AI is now live in production! 🎉**
