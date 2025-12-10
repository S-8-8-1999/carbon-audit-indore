# Deployment Guide

## Prerequisites

1. **Supabase Account**: Sign up at [supabase.com](https://supabase.com)
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **GitHub Account**: Repository already created

## Step 1: Set Up Supabase Database

1. Create a new Supabase project
2. Go to SQL Editor in Supabase dashboard
3. Copy the contents of `database/schema.sql`
4. Execute the SQL to create all tables, indexes, and views
5. Note your Supabase URL and anon key from Settings > API

## Step 2: Configure Environment Variables

1. Copy `.env.example` to `.env.local`
2. Fill in your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

## Step 3: Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Step 4: Deploy to Vercel

### Option A: Automatic Deployment (Recommended)

1. Push your code to GitHub (already done)
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository: `S-8-8-1999/carbon-audit-indore`
4. Configure environment variables in Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click "Deploy"

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY

# Deploy to production
vercel --prod
```

## Step 5: Post-Deployment Configuration

1. **Custom Domain** (Optional):
   - Go to Vercel project settings
   - Add your custom domain
   - Update DNS records as instructed

2. **Supabase Row Level Security** (Recommended):
   - Enable RLS on all tables
   - Create policies for authenticated users
   - Example policy:
   ```sql
   ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
   
   CREATE POLICY "Companies are viewable by authenticated users"
   ON companies FOR SELECT
   TO authenticated
   USING (true);
   ```

3. **Authentication** (Optional):
   - Enable Supabase Auth providers
   - Configure email templates
   - Set up OAuth providers if needed

## Architecture

```
┌─────────────────┐
│   Vercel Edge   │ ← Next.js App (Frontend + API Routes)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Supabase     │ ← PostgreSQL Database + Auth
└─────────────────┘
```

## Features Deployed

✅ Landing page with features overview
✅ Dashboard with emissions tracking
✅ Carbon credit marketplace interface
✅ SAC rating system display
✅ Responsive design
✅ Database schema with all tables
✅ Sample data and views

## Next Steps

1. **Add Authentication**: Implement Supabase Auth for user login
2. **API Routes**: Create Next.js API routes for CRUD operations
3. **Form Validation**: Add form validation and error handling
4. **Real Data Integration**: Connect forms to Supabase
5. **Admin Panel**: Build admin interface for managing companies
6. **Reports**: Generate PDF reports for emissions and ratings
7. **Notifications**: Email notifications for credit trades
8. **Mobile App**: Consider React Native for mobile access

## Monitoring

- **Vercel Analytics**: Automatically enabled
- **Supabase Logs**: Check database logs in Supabase dashboard
- **Error Tracking**: Consider adding Sentry for error monitoring

## Support

For issues or questions:
- Check Vercel deployment logs
- Review Supabase database logs
- Verify environment variables are set correctly
