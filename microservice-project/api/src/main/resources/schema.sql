CREATE SCHEMA IF NOT EXISTS "GraphVisualizer";

CREATE TABLE IF NOT EXISTS "GraphVisualizer".Graphs (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_user VARCHAR(255) NOT NULL,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE,
    adjacency_matrix JSON NOT NULL,
    all_nodes JSON NOT NULL
);

-- Insert a new graph into the Graphs table
INSERT INTO "GraphVisualizer".Graphs (name, description, created_user, adjacency_matrix, all_nodes)
VALUES ('Graph A', 'Description for Graph A', 'UserA', JSON_ARRAY(JSON_ARRAY(JSON_OBJECT('weight', 0, 'highlighted', false), JSON_OBJECT('weight', 2, 'highlighted', false), JSON_OBJECT('weight', 1, 'highlighted', false), JSON_OBJECT('weight', 0, 'highlighted', false)), JSON_ARRAY(JSON_OBJECT('weight', 0, 'highlighted', false), JSON_OBJECT('weight', 0, 'highlighted', false), JSON_OBJECT('weight', 2, 'highlighted', false), JSON_OBJECT('weight', 0, 'highlighted', false)), JSON_ARRAY(JSON_OBJECT('weight', 0, 'highlighted', false), JSON_OBJECT('weight', 0, 'highlighted', false), JSON_OBJECT('weight', 0, 'highlighted', false), JSON_OBJECT('weight', 0, 'highlighted', false))), JSON_OBJECT('a', JSON_OBJECT('x', 100, 'y', 100, 'index', 0, 'highlighted', false), 'b', JSON_OBJECT('x', 171, 'y', 399, 'index', 1, 'highlighted', false), 'c', JSON_OBJECT('x', 606, 'y', 265, 'index', 2, 'highlighted', false)));

-- Insert another graph into the Graphs table
INSERT INTO "GraphVisualizer".Graphs (name, description, created_user, adjacency_matrix, all_nodes)
VALUES ('Graph B', 'Description for Graph B', 'UserB', JSON_ARRAY(JSON_ARRAY(JSON_OBJECT('weight', 0, 'highlighted', false), JSON_OBJECT('weight', 1, 'highlighted', false), JSON_OBJECT('weight', 2, 'highlighted', false), JSON_OBJECT('weight', -1, 'highlighted', false), JSON_OBJECT('weight', 0, 'highlighted', false)), JSON_ARRAY(JSON_OBJECT('weight', 0, 'highlighted', false), JSON_OBJECT('weight', 0, 'highlighted', false), JSON_OBJECT('weight', 0, 'highlighted', false), JSON_OBJECT('weight', 0, 'highlighted', false), JSON_OBJECT('weight', 0, 'highlighted', false)), JSON_ARRAY(JSON_OBJECT('weight', 0, 'highlighted', false), JSON_OBJECT('weight', 0, 'highlighted', false), JSON_OBJECT('weight', 0, 'highlighted', false), JSON_OBJECT('weight', 2, 'highlighted', false), JSON_OBJECT('weight', 0, 'highlighted', false)), JSON_ARRAY(JSON_OBJECT('weight', 0, 'highlighted', false), JSON_OBJECT('weight', 0, 'highlighted', false), JSON_OBJECT('weight', 2, 'highlighted', false), JSON_OBJECT('weight', 0, 'highlighted', false), JSON_OBJECT('weight', 0, 'highlighted', false))), JSON_OBJECT('a', JSON_OBJECT('x', 99, 'y', 99, 'index', 0, 'highlighted', false), 'b', JSON_OBJECT('x', 561, 'y', 370, 'index', 1, 'highlighted', false), 'c', JSON_OBJECT('x', 521, 'y', 129, 'index', 2, 'highlighted', false), 'd', JSON_OBJECT('x', 192, 'y', 293, 'index', 3, 'highlighted', false)));