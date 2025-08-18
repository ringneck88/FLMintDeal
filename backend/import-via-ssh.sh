#!/bin/bash

# Create the SQL content as a string and execute it via psql
psql $DATABASE_URL << 'EOF'
-- Import admin roles
INSERT INTO admin_roles (id, document_id, name, code, description, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (1, 'znfev6n5d8ajm03nprydgs45', 'Super Admin', 'strapi-super-admin', 'Super Admins can access and manage all features and settings.', '2025-08-15T01:06:06.650Z', '2025-08-15T01:06:06.650Z', '2025-08-15T01:06:06.650Z', NULL, NULL, NULL);
INSERT INTO admin_roles (id, document_id, name, code, description, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (2, 'tdrlizvvgol0l8stxk0fc7rt', 'Editor', 'strapi-editor', 'Editors can manage and publish contents including those of other users.', '2025-08-15T01:06:06.670Z', '2025-08-15T01:06:06.670Z', '2025-08-15T01:06:06.670Z', NULL, NULL, NULL);
INSERT INTO admin_roles (id, document_id, name, code, description, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (3, 'mh0xg6f0j1vyqd2egfvfm5f1', 'Author', 'strapi-author', 'Authors can manage the content they have created.', '2025-08-15T01:06:06.684Z', '2025-08-15T01:06:06.684Z', '2025-08-15T01:06:06.684Z', NULL, NULL, NULL);

-- Import admin users  
INSERT INTO admin_users (id, document_id, firstname, lastname, username, email, password, reset_password_token, registration_token, is_active, blocked, prefered_language, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (1, 'l814i4qxb7uaxyp3tsyq1u9v', 'Kelly', 'Sharp', NULL, 'kelly@phiti.com', '$2a$10$TK/HZYMmPBH243G2VGeon.qpOmim6h/Qw3OmdGQecchLQqsWmeNse', NULL, NULL, true, false, NULL, '2025-08-15T01:25:42.280Z', '2025-08-15T01:25:42.280Z', '2025-08-15T01:25:42.282Z', NULL, NULL, NULL);

-- Import deals
INSERT INTO deals (id, document_id, title, description, price, original_price, discount, category, featured, slug, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (1, 'u9enk9onkgyvksrjxpejq43g', 'Gaming Laptop Deal', 'High-performance gaming laptop with RTX graphics card', 899.99, 1299.99, 30, 'Electronics', true, NULL, '2025-08-15T17:24:38.533Z', '2025-08-15T17:52:57.690Z', NULL, NULL, 1, NULL);
INSERT INTO deals (id, document_id, title, description, price, original_price, discount, category, featured, slug, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (3, 'k9c3ft6lmzrau50r7suqu01u', 'Wireless Headphones', 'Premium noise-canceling wireless headphones', 149.99, 249.99, 40, 'Electronics', false, NULL, '2025-08-15T17:24:38.566Z', '2025-08-15T17:24:38.566Z', NULL, NULL, NULL, NULL);
INSERT INTO deals (id, document_id, title, description, price, original_price, discount, category, featured, slug, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (4, 'k9c3ft6lmzrau50r7suqu01u', 'Wireless Headphones', 'Premium noise-canceling wireless headphones', 149.99, 249.99, 40, 'Electronics', false, NULL, '2025-08-15T17:24:38.566Z', '2025-08-15T17:24:38.566Z', '2025-08-15T17:24:38.576Z', NULL, NULL, NULL);
INSERT INTO deals (id, document_id, title, description, price, original_price, discount, category, featured, slug, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (5, 'urrzoy1wq1nsbesdc5inyov5', 'Smart Watch', 'Fitness tracking smart watch with heart rate monitor', 199.99, 299.99, 33, 'Electronics', true, NULL, '2025-08-15T17:24:38.596Z', '2025-08-15T17:24:38.596Z', NULL, NULL, NULL, NULL);
INSERT INTO deals (id, document_id, title, description, price, original_price, discount, category, featured, slug, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (6, 'urrzoy1wq1nsbesdc5inyov5', 'Smart Watch', 'Fitness tracking smart watch with heart rate monitor', 199.99, 299.99, 33, 'Electronics', true, NULL, '2025-08-15T17:24:38.596Z', '2025-08-15T17:24:38.596Z', '2025-08-15T17:24:38.604Z', NULL, NULL, NULL);
INSERT INTO deals (id, document_id, title, description, price, original_price, discount, category, featured, slug, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (7, 'u9enk9onkgyvksrjxpejq43g', 'Gaming Laptop Deal', 'High-performance gaming laptop with RTX graphics card', 899.99, 1299.99, 30, 'Electronics', true, NULL, '2025-08-15T17:24:38.533Z', '2025-08-15T17:52:57.690Z', '2025-08-15T17:52:57.700Z', NULL, 1, NULL);

-- Update sequences to prevent ID conflicts
SELECT setval('admin_users_id_seq', (SELECT MAX(id) FROM admin_users));
SELECT setval('admin_roles_id_seq', (SELECT MAX(id) FROM admin_roles));  
SELECT setval('deals_id_seq', (SELECT MAX(id) FROM deals));
EOF

echo "Data import completed!"