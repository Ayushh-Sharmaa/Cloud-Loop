-- Create table for tracking opportunities and bookmarks
CREATE TABLE IF NOT EXISTS public.tracked_opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    opportunity_id TEXT NOT NULL,
    status TEXT DEFAULT 'None' NOT NULL,
    bookmarked BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_user_opportunity UNIQUE (user_id, opportunity_id)
);

-- Indices for rapid querying
CREATE INDEX IF NOT EXISTS idx_tracked_opps_user_id ON public.tracked_opportunities (user_id);
CREATE INDEX IF NOT EXISTS idx_tracked_opps_opportunity_id ON public.tracked_opportunities (opportunity_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.tracked_opportunities ENABLE ROW LEVEL SECURITY;

-- Allow users to read and write their own records
CREATE POLICY "Allow individual user select"
    ON public.tracked_opportunities
    FOR SELECT
    USING (true);

CREATE POLICY "Allow individual user insert"
    ON public.tracked_opportunities
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow individual user update"
    ON public.tracked_opportunities
    FOR UPDATE
    USING (true);

CREATE POLICY "Allow individual user delete"
    ON public.tracked_opportunities
    FOR DELETE
    USING (true);
