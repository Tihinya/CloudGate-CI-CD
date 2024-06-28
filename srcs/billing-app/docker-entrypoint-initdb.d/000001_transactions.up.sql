CREATE TABLE IF NOT EXISTS orders (
    id character varying UNIQUE NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id character varying,
    number_of_items integer NOT NULL,
    total_amount integer NOT NULL
);