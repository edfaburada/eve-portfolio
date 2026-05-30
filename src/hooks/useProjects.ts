import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import type { Project } from "../types/Project";

export const useProjects = () => {
  const newLocal = useState<Project[]>([]);
  const [projects, setProjects] = newLocal;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
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

function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
