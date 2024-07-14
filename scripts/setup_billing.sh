#!/bin/bash
# cd "$(dirname "$0")"
# source ../.env
sudo apt-get update
sudo apt-get install -y postgresql postgresql-contrib
sudo -u postgres psql -c "CREATE USER billing WITH PASSWORD 'secret';"
sudo -u postgres psql -c "CREATE DATABASE orders;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE orders TO billing;"
sudo -u postgres psql -d orders -c "
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE orders (
    id VARCHAR UNIQUE NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR,
    number_of_items INTEGER NOT NULL,
    total_amount INTEGER NOT NULL
);"
sudo -u postgres psql -d orders -c "GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE orders TO billing;"
sudo apt-get install -y rabbitmq-server
sudo systemctl enable rabbitmq-server
sudo systemctl start rabbitmq-server
sudo rabbitmqctl add_user rabbitmq rabbitmq
sudo rabbitmqctl set_user_tags rabbitmq administrator
sudo rabbitmqctl set_permissions -p / rabbitmq ".*" ".*" ".*"
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install nodejs
cd /vagrant/srcs/billing-app
npm install --no-optional
sudo npm install pm2 -g
sudo pm2 start server.js --name billing-app
