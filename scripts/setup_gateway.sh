#!/bin/bash

# Install Node.js and npm
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install project dependencies
cd /vagrant/srcs/api-gateway
npm install

# Start the API gateway using PM2
sudo npm install pm2 -g
sudo pm2 start server.js --name api-gateway
