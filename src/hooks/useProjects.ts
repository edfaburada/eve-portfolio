import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import type { Project } from "../types/Project";

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        setError(error.message);
        // Leave projects as [] so DEMO_PROJECTS kicks in
      } else {
        setProjects(data || []);
      }
    };

    fetchProjects();
  }, []);

  return { projects, error };
};