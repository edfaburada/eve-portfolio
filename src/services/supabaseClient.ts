import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://heqmvfzbomyvlvueckah.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlcW12Znpib215dmx2dWVja2FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwODMyNDMsImV4cCI6MjA5NTY1OTI0M30.LH2a819RnFhwSPXWlkCU_WNLf6_3Z3wdg98KLQDrEGY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Helper ────────────────────────────────────────────────────────────────
// Pass the value stored in the `image` column and get back a displayable URL.
//
// It handles three cases:
//   1. Already a full URL  →  returned as-is
//      e.g. "https://heqmvfzbomyvlvueckah.supabase.co/storage/v1/object/public/..."
//
//   2. A storage path only  →  converted to a public URL
//      e.g. "projects/my-screenshot.png"
//
//   3. Empty / null  →  returns "" so the <img> is simply hidden
//
export const getImageUrl = (imagePath: string | null | undefined): string => {
  if (!imagePath) return "";

  // Already a full URL — use directly
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // Storage path — build the public URL
  // Default bucket name is "projects"; change below if yours is different
  const { data } = supabase.storage
    .from("projects")          // ← your bucket name
    .getPublicUrl(imagePath);

  return data.publicUrl ?? "";
};