# API Infrastructure

This project sets up an infrastructure for an inventory and billing system using Vagrant and multiple VMs.

## Prerequisites

- Vagrant
- VirtualBox

## Setup

1. Clone the repository.
2. Create a `.env` file at the root of the project with the required environment variables (refer to the provided `.env` example).
3. Run `vagrant up` to start all the VMs.

## Accessing the VMs

- **Gateway VM**: `vagrant ssh gateway-vm`
- **Inventory VM**: `vagrant ssh inventory-vm`
- **Billing VM**: `vagrant ssh billing-vm`

## API Endpoints

### Inventory API

- Base URL: `http://<INVENTORY_VM_IP>:8080/api/movies`
- Endpoints:
  - `GET /api/movies`
  - `GET /api/movies?title=[name]`
  - `POST /api/movies`
  - `DELETE /api/movies`
  - `GET /api/movies/:id`
  - `PUT /api/movies/:id`
  - `DELETE /api/movies/:id`

### Billing API

- RabbitMQ queue: `billing_queue`
- Expected message format:
  ```json
  {
    "user_id": "3",
    "number_of_items": "5",
    "total_amount": "180"
  }
