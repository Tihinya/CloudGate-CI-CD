# orchestration

This documentation will help you understand the architecture, setup, and usage of the movie streaming platform built using microservices infrastructure.

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Getting Started](#2-getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Initialization](#initialization)
   - [Run](#run)
   - [Stop](#stop)
3. [API Documentation](#3-api-documentation)
   - [API Gateway](#api-gateway)
   - [Inventory API](#inventory-api)
   - [Billing API](#billing-api)
4. [Docker Compose](#4-k3s)
5. [Project Organization](#5-project-organization)

## 1. Project Overview <a name="1-project-overview"></a>

The orchestrator implements a movie streaming platform with six microservices: `Inventory`, `Billing`, `RabbitMQ`, `API Gateway`, and 2 databases. The API Gateway manages communication between these services, using HTTP for `Inventory` and RabbitMQ for `Billing`. The project is organized into Kubernetes and Vagrant to make deployment simpler.

## 2. Getting Started <a name="2-getting-started"></a>

### Prerequisites <a name="prerequisites"></a>

Make sure you have the following installed on your machine:

- Kubectl
- Vagrant
- Docker

### Installation <a name="installation"></a>

1. Clone the repository:

   ```bash
   git clone https://01.kood.tech/git/StepanTI/orchestrator
   ```

2. Navigate to the project directory:

   ```bash
   cd orchestrator
   ```
### Initialization<a name="initialization"></a>

1. Creates required folders:

   ```bash
   mkdir -p ./k3s
   ```

2. Run vagrant:

   ```bash
   vagrant up
   ```
### Run<a name="run"></a>

1. Creates required folders:

   ```bash
   KUBECONFIG=./k3s/k3s.yaml kubectl apply -f ./manifests/
   ```
### Stop<a name="stop"></a>

1. Creates required folders:

   ```bash
    vagrant destroy -f
   ```

## 3. API Documentation <a name="3-api-documentation"></a>

### API Gateway <a name="api-gateway"></a>

The API Gateway routes requests between the `Inventory` and `Billing` services. It uses a proxy system to forward requests to the appropriate service. API documentation is available in the OpenAPI format. Refer to [http://192.168.56.10:3000/api-docs](http://192.168.56.10:3000/api-docs) for detailed API documentation.

### Inventory API <a name="inventory-api"></a>

The `Inventory` API is a CRUD RESTful API that provides information about movies. It uses a PostgreSQL database named `movies`. Endpoints include:

- `GET /api/movies`
- `GET /api/movies?title=[name]`
- `POST /api/movies`
- `DELETE /api/movies`
- `GET /api/movies/:id`
- `PUT /api/movies/:id`
- `DELETE /api/movies/:id`


### Billing API <a name="billing-api"></a>

The `Billing` API processes messages received through RabbitMQ. It parses JSON messages and creates entries in the `orders` database. Endpoints include:

- RabbitMQ Queue: `billing_queue`

## 4. k3s <a name="4-k3s"></a>

The project uses k3s to set up all microservices:

- `api-gateway-app`: API Gateway.
- `inventory-app`: `Inventory` API.
- `inventory-database`: Contains the `movies` database.
- `billing-app`: `Billing` API.
- `billing-database`: Contains the `orders` database.
- `rabbitmq`: Runs RabbitMQ service.

## 5. Project Organization <a name="5-project-organization"></a>

### Overall File Structure

```console
.
├── README.md
├── manifests
|   ├── ...
├── srcs
│   ├── api-gateway
│   │   ├── ...
│   ├── billing-app
│   │   ├── ...
│   └── inventory-app
│       ├── ...
├── postman-config
|   ├── ...
└── Vagrantfile
```