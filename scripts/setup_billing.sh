#!/bin/bash

# Install PostgreSQL
sudo apt-get update
sudo apt-get install -y postgresql postgresql-contrib

# Setup PostgreSQL
sudo -u postgres psql -c "CREATE USER ${POSTGRES_USER} WITH PASSWORD '${POSTGRES_PASSWORD}';"
sudo -u postgres psql -c "CREATE DATABASE ${ORDERS_DB};"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE ${ORDERS_DB} TO ${POSTGRES_USER};"

# Create orders table
sudo -u postgres psql -d ${ORDERS_DB} -c "
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE orders (
    id VARCHAR UNIQUE NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR,
    number_of_items INTEGER NOT NULL,
    total_amount INTEGER NOT NULL
);"

# Install RabbitMQ
sudo apt-get install -y rabbitmq-server
sudo systemctl enable rabbitmq-server
sudo systemctl start rabbitmq-server

# Install Node.js and npm
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install project dependencies
cd /vagrant/srcs/billing-app
npm install

# Start the Billing API using PM2
sudo npm install pm2 -g
sudo pm2 start server.js --name billing-app
