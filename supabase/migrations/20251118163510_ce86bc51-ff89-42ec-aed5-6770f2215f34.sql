-- Remove unused tables that don't match the visa assessment tool purpose
-- This app is for evaluating business ideas for UK Innovator Founder Visa, not managing employees/lawyers

-- Drop tables in correct order (respecting dependencies)
DROP TABLE IF EXISTS compliance_alerts CASCADE;
DROP TABLE IF EXISTS employees CASCADE;
DROP TABLE IF EXISTS lawyer_clients CASCADE;
DROP TABLE IF EXISTS subscriptions CASCADE;
DROP TABLE IF EXISTS organizations CASCADE;

-- Keep users and messages tables as they may be used for authentication and communication