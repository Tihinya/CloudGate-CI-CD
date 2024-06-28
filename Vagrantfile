# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  # Load environment variables from .env file
  # require 'dotenv'
  # Dotenv.load
  config.env.enable
  # API Gateway VM
  config.vm.define "gateway-vm" do |gateway|
    gateway.vm.box = "ubuntu/bionic64"
    gateway.vm.network "private_network", ip: ENV['GATEWAY_VM_IP']
    gateway.vm.provision "shell", path: "scripts/setup_gateway.sh"
  end

  # Inventory VM
  config.vm.define "inventory-vm" do |inventory|
    inventory.vm.box = "ubuntu/bionic64"
    inventory.vm.network "private_network", ip: ENV['INVENTORY_VM_IP']
    inventory.vm.provision "shell", path: "scripts/setup_inventory.sh"
  end

  # Billing VM
  config.vm.define "billing-vm" do |billing|
    billing.vm.box = "ubuntu/bionic64"
    billing.vm.network "private_network", ip: ENV['BILLING_VM_IP']
    billing.vm.provision "shell", path: "scripts/setup_billing.sh"
  end

end