/*
# Create roadmaps table for user-saved career roadmaps

1. New Tables
- `roadmaps`
  - `id` (text, primary key) — client-generated roadmap id (e.g. roadmap_1234567890)
  - `user_id` (uuid, not null, defaults to auth.uid()) — owner of the roadmap
  - `career_goal` (text, not null) — target career (e.g. "Backend Engineer")
  - `profile_name` (text, not null) — user's name at time of generation
  - `roadmap_data` (jsonb, not null) — full RoadmapResult object (phases, skill gaps, projects, resources, tips, questions)
  - `created_at` (timestamptz, defaults to now())

2. Security
- Enable RLS on `roadmaps`.
- Owner-scoped CRUD: each authenticated user can only SELECT, INSERT, UPDATE, DELETE rows they own.
- Policies scoped TO authenticated with auth.uid() = user_id ownership checks.
- user_id defaults to auth.uid() so client inserts that omit user_id succeed.

3. Indexes
- Index on user_id for fast per-user lookups.
- Index on created_at desc for recent-roadmap ordering.

4. Notes
- The full roadmap result is stored as JSONB to keep the schema simple and avoid 6+ child tables.
- Email confirmation stays OFF (default).
*/

CREATE TABLE IF NOT EXISTS roadmaps (
  id text PRIMARY KEY,
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  career_goal text NOT NULL,
  profile_name text NOT NULL,
  roadmap_data jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE roadmaps ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_roadmaps_user_id ON roadmaps(user_id);
CREATE INDEX IF NOT EXISTS idx_roadmaps_created_at ON roadmaps(created_at DESC);

DROP POLICY IF EXISTS "select_own_roadmaps" ON roadmaps;
CREATE POLICY "select_own_roadmaps" ON roadmaps FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_roadmaps" ON roadmaps;
CREATE POLICY "insert_own_roadmaps" ON roadmaps FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_roadmaps" ON roadmaps;
CREATE POLICY "update_own_roadmaps" ON roadmaps FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_roadmaps" ON roadmaps;
CREATE POLICY "delete_own_roadmaps" ON roadmaps FOR DELETE
  TO authenticated USING (auth.uid() = user_id);
