#!/bin/bash
# cd "$(dirname "$0")"
# source ../.env
sudo apt-get update
sudo apt-get install -y postgresql postgresql-contrib
sudo -u postgres psql -c "CREATE USER inventory WITH PASSWORD 'secret';"
sudo -u postgres psql -c "CREATE DATABASE movies;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE movies TO inventory;"
sudo -u postgres psql -d movies -c "
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE movies (
    transaction_id VARCHAR UNIQUE NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT
);"
sudo -u postgres psql -d movies -c "GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE movies TO inventory;"
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
cd /vagrant/srcs/inventory-app
npm install --package-lock-only
npm install
sudo npm install -g pm2
sudo pm2 start server.js --name inventory-app