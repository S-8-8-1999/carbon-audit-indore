-- Carbon Audit Indore Database Schema

-- Companies Table
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  industry VARCHAR(100) NOT NULL,
  location VARCHAR(255) NOT NULL,
  registration_number VARCHAR(100) UNIQUE NOT NULL,
  contact_email VARCHAR(255) NOT NULL,
  contact_phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100) DEFAULT 'Indore',
  state VARCHAR(100) DEFAULT 'Madhya Pradesh',
  pincode VARCHAR(10),
  employee_count INTEGER,
  annual_revenue DECIMAL(15, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Emissions Table
CREATE TABLE emissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  pollutant_type VARCHAR(50) NOT NULL CHECK (pollutant_type IN ('CO2', 'NOx', 'SOx', 'PM', 'CH4', 'N2O', 'HFC', 'PFC', 'SF6', 'Other')),
  amount DECIMAL(15, 4) NOT NULL,
  unit VARCHAR(20) DEFAULT 'tons',
  measurement_date DATE NOT NULL,
  source VARCHAR(255),
  calculation_method VARCHAR(100),
  scope INTEGER CHECK (scope IN (1, 2, 3)),
  notes TEXT,
  verified BOOLEAN DEFAULT FALSE,
  verified_by VARCHAR(255),
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Carbon Credits Table
CREATE TABLE carbon_credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  credits DECIMAL(15, 4) NOT NULL,
  transaction_type VARCHAR(20) NOT NULL CHECK (transaction_type IN ('purchase', 'sale', 'offset', 'grant')),
  price_per_credit DECIMAL(10, 2),
  total_amount DECIMAL(15, 2),
  transaction_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled', 'failed')),
  counterparty VARCHAR(255),
  certificate_number VARCHAR(100),
  registry VARCHAR(100),
  vintage_year INTEGER,
  project_type VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SAC Ratings Table
CREATE TABLE sac_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  overall_score DECIMAL(5, 2) NOT NULL CHECK (overall_score >= 0 AND overall_score <= 100),
  pollutant_knowledge_score DECIMAL(5, 2) CHECK (pollutant_knowledge_score >= 0 AND pollutant_knowledge_score <= 100),
  compliance_score DECIMAL(5, 2) CHECK (compliance_score >= 0 AND compliance_score <= 100),
  reduction_efforts_score DECIMAL(5, 2) CHECK (reduction_efforts_score >= 0 AND reduction_efforts_score <= 100),
  rating_grade VARCHAR(5) NOT NULL,
  assessment_date DATE NOT NULL,
  assessor VARCHAR(255),
  certification_valid_until DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assessment Questions Table
CREATE TABLE assessment_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category VARCHAR(50) NOT NULL CHECK (category IN ('pollutant_knowledge', 'compliance', 'reduction_efforts')),
  question TEXT NOT NULL,
  question_type VARCHAR(20) CHECK (question_type IN ('multiple_choice', 'true_false', 'numeric', 'text')),
  options JSONB,
  correct_answer TEXT,
  points INTEGER DEFAULT 1,
  difficulty VARCHAR(20) CHECK (difficulty IN ('easy', 'medium', 'hard')),
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assessment Responses Table
CREATE TABLE assessment_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  question_id UUID REFERENCES assessment_questions(id) ON DELETE CASCADE,
  response TEXT NOT NULL,
  is_correct BOOLEAN,
  points_earned INTEGER DEFAULT 0,
  assessment_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Marketplace Listings Table
CREATE TABLE marketplace_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  credits_available DECIMAL(15, 4) NOT NULL,
  price_per_credit DECIMAL(10, 2) NOT NULL,
  minimum_purchase DECIMAL(15, 4) DEFAULT 1,
  listing_type VARCHAR(20) CHECK (listing_type IN ('fixed_price', 'auction', 'negotiable')),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'sold', 'expired', 'cancelled')),
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Indexes
CREATE INDEX idx_emissions_company ON emissions(company_id);
CREATE INDEX idx_emissions_date ON emissions(measurement_date);
CREATE INDEX idx_emissions_pollutant ON emissions(pollutant_type);
CREATE INDEX idx_carbon_credits_company ON carbon_credits(company_id);
CREATE INDEX idx_carbon_credits_date ON carbon_credits(transaction_date);
CREATE INDEX idx_sac_ratings_company ON sac_ratings(company_id);
CREATE INDEX idx_sac_ratings_date ON sac_ratings(assessment_date);
CREATE INDEX idx_marketplace_status ON marketplace_listings(status);

-- Create Views
CREATE VIEW company_emissions_summary AS
SELECT 
  c.id,
  c.name,
  c.industry,
  COUNT(e.id) as total_records,
  SUM(CASE WHEN e.pollutant_type = 'CO2' THEN e.amount ELSE 0 END) as total_co2,
  SUM(CASE WHEN e.pollutant_type = 'NOx' THEN e.amount ELSE 0 END) as total_nox,
  SUM(CASE WHEN e.pollutant_type = 'SOx' THEN e.amount ELSE 0 END) as total_sox,
  SUM(e.amount) as total_emissions
FROM companies c
LEFT JOIN emissions e ON c.id = e.company_id
GROUP BY c.id, c.name, c.industry;

CREATE VIEW company_carbon_balance AS
SELECT 
  c.id,
  c.name,
  SUM(CASE WHEN cc.transaction_type IN ('purchase', 'grant') THEN cc.credits ELSE 0 END) as credits_acquired,
  SUM(CASE WHEN cc.transaction_type IN ('sale', 'offset') THEN cc.credits ELSE 0 END) as credits_used,
  SUM(CASE WHEN cc.transaction_type IN ('purchase', 'grant') THEN cc.credits ELSE -cc.credits END) as net_credits
FROM companies c
LEFT JOIN carbon_credits cc ON c.id = cc.company_id AND cc.status = 'completed'
GROUP BY c.id, c.name;

-- Insert Sample Assessment Questions
INSERT INTO assessment_questions (category, question, question_type, options, correct_answer, points, difficulty) VALUES
('pollutant_knowledge', 'What is the primary greenhouse gas emitted by industrial processes?', 'multiple_choice', '["CO2", "NOx", "SOx", "CH4"]', 'CO2', 1, 'easy'),
('pollutant_knowledge', 'NOx emissions primarily contribute to which environmental issue?', 'multiple_choice', '["Acid rain", "Ozone depletion", "Global warming", "Water pollution"]', 'Acid rain', 2, 'medium'),
('compliance', 'Does your facility have an environmental clearance certificate?', 'true_false', '["true", "false"]', 'true', 1, 'easy'),
('reduction_efforts', 'What percentage of energy used in your facility comes from renewable sources?', 'numeric', NULL, NULL, 3, 'medium');
