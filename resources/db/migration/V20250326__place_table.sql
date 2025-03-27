CREATE TABLE public.space_group (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    day DATE NOT NULL,
    floor INTEGER NOT NULL,
    type VARCHAR(255) NOT NULL,
    spaces INTEGER NOT NULL,
    used_spaces INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'),
    updated_at TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'),
    CONSTRAINT unique_day_floor_type UNIQUE (day, floor, type)
);