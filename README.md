# levelup-eco-spotter
A platform to identify, track, and report environmental hotspots. Discover, monitor, and protect our environment with Eco-Spotter.


## Quick Guide: Node + Sequelize + MSSQL

### Install dependencies
pnpm install sequelize sequelize-cli tedious dotenv

### Configure environment variables

Create a .env file with your database credentials, port, and environment settings.

### Run Docker Compose

Start your Docker containers:

docker-compose up -d

### Set up Sequelize configuration

Configure Sequelize to use your environment variables to connect to the database.

### Create the database (if it doesn’t exist)
pnpm sequelize-cli db:create

### Run migrations
pnpm sequelize-cli db:migrate

### Seed the database
pnpm sequelize-cli db:seed:all

### Build the application
pnpm build


Make sure your package.json has a build script (e.g., tsc for TypeScript or bundler for JavaScript).

### Run the application
pnpm start


or, for development with auto-reload:

pnpm dev


Ensure your package.json has start and dev scripts defined.

### Verify setup
Open your browser or API client (postman) and check that the application is running. Confirm tables and seed data exist in your database.