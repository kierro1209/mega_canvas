# station_app
Production application for Station, only commit code that you have tested and runs correctly!
SAAS template used: https://github.com/ixartz/SaaS-Boilerplate?tab=readme-ov-file

Run code from this directory if you want to test application without a python endpoint (AI models, apis, certain databases)
How to run non-python application (Docker, recommended):
1. Copy .env.local.example into a new file .env.local. Update .env.local with Clerk and Stripe (as needed) secret keys.
2. docker build -t station_app .
3. docker run -p 3000:3000 station_app

How to run non-python application (Node):
1. Copy .env.local.example into a new file .env.local. Update .env.local with Clerk and Stripe (as needed) secret keys.
2. npm install
3. npm run dev