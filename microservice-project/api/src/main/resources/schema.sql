CREATE SCHEMA IF NOT EXISTS "GraphVisualizer";

DROP TABLE IF EXISTS "GraphVisualizer".Graphs;

CREATE TABLE "GraphVisualizer".Graphs (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_user VARCHAR(255) NOT NULL,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE,
    adjacency_matrix JSONB NOT NULL,
    all_nodes JSONB NOT NULL
);

-- Insert a new graph into the Graphs table
INSERT IGNORE INTO "GraphVisualizer".Graphs (name, description, created_user, adjacency_matrix, all_nodes)
VALUES ('Graph A', 'Description for Graph A', 'UserA', 
    jsonb_build_array(
        jsonb_build_array(jsonb_build_object('weight', 0, 'highlighted', false), jsonb_build_object('weight', 2, 'highlighted', false), jsonb_build_object('weight', 1, 'highlighted', false), jsonb_build_object('weight', 0, 'highlighted', false)), 
        jsonb_build_array(jsonb_build_object('weight', 0, 'highlighted', false), jsonb_build_object('weight', 0, 'highlighted', false), jsonb_build_object('weight', 2, 'highlighted', false), jsonb_build_object('weight', 0, 'highlighted', false)), 
        jsonb_build_array(jsonb_build_object('weight', 0, 'highlighted', false), jsonb_build_object('weight', 0, 'highlighted', false), jsonb_build_object('weight', 0, 'highlighted', false), jsonb_build_object('weight', 0, 'highlighted', false))
    ), 
    jsonb_build_object('a', jsonb_build_object('x', 100, 'y', 100, 'index', 0, 'highlighted', false), 'b', jsonb_build_object('x', 171, 'y', 399, 'index', 1, 'highlighted', false), 'c', jsonb_build_object('x', 606, 'y', 265, 'index', 2, 'highlighted', false))
);

-- Insert another graph into the Graphs table
INSERT IGNORE INTO "GraphVisualizer".Graphs (name, description, created_user, adjacency_matrix, all_nodes)
VALUES ('Graph B', 'Description for Graph B', 'UserB', 
    jsonb_build_array(
        jsonb_build_array(jsonb_build_object('weight', 0, 'highlighted', false), jsonb_build_object('weight', 1, 'highlighted', false), jsonb_build_object('weight', 2, 'highlighted', false), jsonb_build_object('weight', -1, 'highlighted', false), jsonb_build_object('weight', 0, 'highlighted', false)), 
        jsonb_build_array(jsonb_build_object('weight', 0, 'highlighted', false), jsonb_build_object('weight', 0, 'highlighted', false), jsonb_build_object('weight', 0, 'highlighted', false), jsonb_build_object('weight', 0, 'highlighted', false), jsonb_build_object('weight', 0, 'highlighted', false)), 
        jsonb_build_array(jsonb_build_object('weight', 0, 'highlighted', false), jsonb_build_object('weight', 0, 'highlighted', false), jsonb_build_object('weight', 0, 'highlighted', false), jsonb_build_object('weight', 2, 'highlighted', false), jsonb_build_object('weight', 0, 'highlighted', false)), 
        jsonb_build_array(jsonb_build_object('weight', 0, 'highlighted', false), jsonb_build_object('weight', 0, 'highlighted', false), jsonb_build_object('weight', 2, 'highlighted', false), jsonb_build_object('weight', 0, 'highlighted', false), jsonb_build_object('weight', 0, 'highlighted', false))
    ), 
    jsonb_build_object('a', jsonb_build_object('x', 99, 'y', 99, 'index', 0, 'highlighted', false), 'b', jsonb_build_object('x', 561, 'y', 370, 'index', 1, 'highlighted', false), 'c', jsonb_build_object('x', 521, 'y', 129, 'index', 2, 'highlighted', false), 'd', jsonb_build_object('x', 192, 'y', 293, 'index', 3, 'highlighted', false))
);