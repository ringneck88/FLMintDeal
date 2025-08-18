-- Drop all existing tables that might have permission issues
DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;

-- Grant all privileges to the fly-user
GRANT ALL PRIVILEGES ON SCHEMA public TO "fly-user";
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO "fly-user";
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO "fly-user";

-- Set default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO "fly-user";
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO "fly-user";

-- Make sure the user can create tables
ALTER USER "fly-user" CREATEDB;