import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface Company {
  id: string
  name: string
  industry: string
  location: string
  registration_number: string
  contact_email: string
  contact_phone: string
  created_at: string
}

export interface Emission {
  id: string
  company_id: string
  pollutant_type: 'CO2' | 'NOx' | 'SOx' | 'PM' | 'CH4' | 'Other'
  amount: number
  unit: string
  measurement_date: string
  source: string
  notes?: string
  created_at: string
}

export interface CarbonCredit {
  id: string
  company_id: string
  credits: number
  transaction_type: 'purchase' | 'sale' | 'offset'
  price_per_credit: number
  total_amount: number
  transaction_date: string
  status: 'pending' | 'completed' | 'cancelled'
  created_at: string
}

export interface SACRating {
  id: string
  company_id: string
  overall_score: number
  pollutant_knowledge_score: number
  compliance_score: number
  reduction_efforts_score: number
  rating_grade: string
  assessment_date: string
  notes?: string
  created_at: string
}
