# Creating database

Make sure your PostgreSQL is installed.

Then, use the following command to create database and tables. **Make sure to put your username.**

1. `createdb park_share`
2. `psql -U username -d park_share -a -f database/schema.sql`

And you should be set!