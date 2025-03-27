CREATE TABLE public.space_group (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    day DATE NOT NULL,
    plant INTEGER NOT NULL,
    type VARCHAR(255) NOT NULL,
    spaces INTEGER NOT NULL,
    used_spaces INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'),
    updated_at TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'),
    CONSTRAINT unique_day_plant_type UNIQUE (day, plant, type)
);