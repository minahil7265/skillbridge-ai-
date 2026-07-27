import { supabase } from './supabase';
import type { RoadmapResult } from '@/types';

export async function saveRoadmapToSupabase(roadmap: RoadmapResult): Promise<{ error: string | null }> {
  const { error } = await supabase.from('roadmaps').upsert({
    id: roadmap.id,
    career_goal: roadmap.profile.careerGoal,
    profile_name: roadmap.profile.name,
    roadmap_data: roadmap,
  });
  return { error: error?.message ?? null };
}

export async function fetchUserRoadmaps(): Promise<{ data: RoadmapResult[] | null; error: string | null }> {
  const { data, error } = await supabase
    .from('roadmaps')
    .select('roadmap_data')
    .order('created_at', { ascending: false });

  if (error) return { data: null, error: error.message };
  const roadmaps = (data as { roadmap_data: RoadmapResult }[]).map((row) => row.roadmap_data);
  return { data: roadmaps, error: null };
}

export async function deleteRoadmapFromSupabase(id: string): Promise<{ error: string | null }> {
  const { error } = await supabase.from('roadmaps').delete().eq('id', id);
  return { error: error?.message ?? null };
}
