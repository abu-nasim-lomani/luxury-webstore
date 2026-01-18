import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client for use in Server Components and Server Actions
 * Use this in any Server Component or API route
 */
export async function createServerClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing Supabase environment variables');
    }

    // For server-side usage, create a basic client
    // Cookie handling should be done at the app level with middleware
    return createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
            detectSessionInUrl: false,
        },
    });
}
