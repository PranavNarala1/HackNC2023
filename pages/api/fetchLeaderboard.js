import { createClient } from '@supabase/supabase-js';


export default async function fetchLeaderboard() {

    const supabase = createClient('https://yxxeykqqytazrtqgekup.supabase.co', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4eGV5a3FxeXRhenJ0cWdla3VwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODE2NDg3MiwiZXhwIjoyMDEzNzQwODcyfQ.d6NTLLcurXktkX1Su_uXU24nW-AwwZ2lmrqC2-ccvXQ");

    console.log("testing");
    try {
        const { data, error } = await supabase
        .rpc('sort_users_by_points', {}) 
        if (error) {
            console.error('Error getting leaderboard:', error);
        } else {
            console.log(data);
            return data;
        }
    } catch (error) {
        console.error('Error getting leaderboard:', error);
    }
}
