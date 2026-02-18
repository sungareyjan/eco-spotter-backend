# levelup-eco-spotter
A platform to identify, track, and report environmental hotspots. Discover, monitor, and protect our environment with Eco-Spotter.

## Quick Guide: Node + Sequelize + MSSQL
### Install dependencies
npm install -g pnpm

pnpm install sequelize sequelize-cli tedious dotenv

### Configure environment variables

Create a .env file with your database credentials, port, and environment settings.

### Run Docker Compose Start your Docker containers:

docker-compose up -d

### Check that the MSSQL container is running:

docker ps
### Access docker
 if bash
docker exec -it eco-app sh

if powershell
 docker exec -it eco-app /bin/sh

### Create the database (if it doesn’t exist)
pnpm create

### Run migrations
pnpm migrate

### Seed the database
pnpm seed:all

### Verify setup
Open your browser or API client (postman) and check that the application is running. Confirm tables and seed data exist in your database.


# Unit test
Unit Testing (Backend)

This project uses Jest and Supertest for testing the Express API with Sequelize. All tests run against a separate test database (eco_spotter_test) to keep them isolated from development data.

### Ensure Docker is running

Make sure your Docker containers for Node and MSSQL are up:

docker compose up -d


Check that the MSSQL container is running:

docker ps

### Configure environment for tests

In your docker-compose.yml under the node-app service, you can specify the env file for testing:

env_file:
  # - .env         # development
  - .env.test      # uncomment when running tests


Development: Uncomment .env and comment .env.test.

Testing: Uncomment .env.test and comment .env.

This ensures the container uses the correct database and environment variables.

### Create the test database

Run the Sequelize CLI inside the Node container with NODE_ENV=test:

docker compose run -e NODE_ENV=test node-app npx sequelize-cli db:create


This will create the eco_spotter_test database.

### Run migrations

Apply the schema to the test database:

docker compose run -e NODE_ENV=test node-app npx sequelize-cli db:migrate

### Seed test data (optional)

If you have seed files for testing:

docker compose run -e NODE_ENV=test node-app npx sequelize-cli db:seed:all

### Run the tests

Finally, run your unit tests:

npm test