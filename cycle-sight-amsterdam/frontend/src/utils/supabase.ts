import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// In a production environment, these should be in environment variables
const SUPABASE_URL = 'https://yuddemfwxhxxkrspurcp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1ZGRlbWZ3eGh4eGtyc3B1cmNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NTg1MjEsImV4cCI6MjA1MDUzNDUyMX0.EbZa9PJSN1fnXL25_AzQJRnEkfT-Y-CFQPr1a8kDF6M';

// Initialize the Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
