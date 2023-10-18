import {createClient} from "@supabase/supabase-js";

export const supabaseUrl = "https://orgynwndnrayqggharos.supabase.co";
export const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yZ3lud25kbnJheXFnZ2hhcm9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcyODUzMjUsImV4cCI6MjAxMjg2MTMyNX0.wNBnDadc_fGGlei2WbbY8Q5ixifFcvUf6eqoEQOZ3wA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
