#!/bin/bash

# Install PostgreSQL
sudo apt-get update
sudo apt-get install -y postgresql postgresql-contrib

# Setup PostgreSQL
sudo -u postgres psql -c "CREATE USER ${POSTGRES_USER} WITH PASSWORD '${POSTGRES_PASSWORD}';"
sudo -u postgres psql -c "CREATE DATABASE ${MOVIES_DB};"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE ${MOVIES_DB} TO ${POSTGRES_USER};"

# Create movies table
sudo -u postgres psql -d ${MOVIES_DB} -c "
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE movies (
    transaction_id VARCHAR UNIQUE NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT
);"

# Install Node.js and npm
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install project dependencies
cd /vagrant/srcs/inventory-app
npm install

# Start the Inventory API using PM2
sudo npm install pm2 -g
sudo pm2 start server.js --name inventory-app
