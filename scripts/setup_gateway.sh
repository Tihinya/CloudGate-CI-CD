#!/bin/bash
# cd "$(dirname "$0")"
# source ../.env
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install nodejs
cd /vagrant/srcs/api-gateway
npm install --no-optional
sudo npm install pm2 -g
sudo pm2 start server.js --name api-gateway
