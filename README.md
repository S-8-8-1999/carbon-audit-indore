# Carbon Audit Indore

A comprehensive carbon emissions auditing platform for MSMEs in Indore, featuring emissions tracking, carbon credit trading, and SAC (Sustainability Awareness & Compliance) rating system.

## Features

- **Carbon Emissions Auditing**: Track and analyze emissions data for MSMEs
- **Carbon Credit Trading**: Marketplace for buying and selling carbon credits
- **SAC Rating System**: Rate companies based on their pollutant knowledge and compliance
- **Analytics Dashboard**: Comprehensive insights and reporting

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **Charts**: Recharts

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/S-8-8-1999/carbon-audit-indore.git
cd carbon-audit-indore
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Database Schema

### Companies
- Company profile and registration details
- Industry type and location
- Contact information

### Emissions
- Emission records by pollutant type
- Calculation methodology
- Temporal data

### Carbon Credits
- Credit inventory
- Trading history
- Pricing data

### SAC Ratings
- Assessment scores
- Knowledge tests
- Compliance metrics

## Deployment

Deploy to Vercel with one click or push to main branch for automatic deployment.

## License

MIT
