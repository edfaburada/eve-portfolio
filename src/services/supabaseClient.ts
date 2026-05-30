import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://heqmvfzbomyvlvueckah.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlcW12Znpib215dmx2dWVja2FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwODMyNDMsImV4cCI6MjA5NTY1OTI0M30.LH2a819RnFhwSPXWlkCU_WNLf6_3Z3wdg98KLQDrEGY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* ─── Storage image helper ─────────────────────────────────────────────────
   Accepts whatever is stored in `image` column:
   • Full https URL  → returned as-is
   • Storage path    → converted to public URL  (bucket = "projects")
   • null / ""       → returns "" (card shows placeholder)
────────────────────────────────────────────────────────────────────────── */
export const getImageUrl = (path?: string | null): string => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const { data } = supabase.storage.from("projects").getPublicUrl(path);
  return data.publicUrl ?? "";
};

/* ─── Typed Supabase helpers ────────────────────────────────────────────── */

// ── Projects ──────────────────────────────────────────────────────────────
export const fetchProjects = async () => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("id", { ascending: true });
  if (error) throw error;
  return data ?? [];
};

// ── Certificates ──────────────────────────────────────────────────────────
export const fetchCertificates = async () => {
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .order("date", { ascending: false });
  if (error) throw error;
  return data ?? [];
};

// ── Skills ────────────────────────────────────────────────────────────────
export const fetchSkills = async () => {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("id", { ascending: true });
  if (error) throw error;
  return data ?? [];
};

// ── About (single row) ────────────────────────────────────────────────────
export const fetchAbout = async () => {
  const { data, error } = await supabase
    .from("about")
    .select("*")
    .single();
  if (error) return null;
  return data;
};

// ── Contact — insert a message ────────────────────────────────────────────
export const sendMessage = async (payload: {
  name: string;
  email: string;
  message: string;
}) => {
  const { error } = await supabase.from("messages").insert([payload]);
  if (error) throw error;
};