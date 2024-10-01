# cloud-designing

This documentation will guide you through the architecture, setup, and use of the movie streaming platform developed with a microservices infrastructure.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
3. [API Documentation](#api-documentation)
   - [API Gateway](#api-gateway)
   - [Inventory API](#inventory-api)
   - [Billing API](#billing-api)
4. [EKS](#eks)

## 1. Project Overview <a name="project-overview"></a>

The cloud design project involves deploying and managing a microservices-based application on the Amazon Web Services (AWS) cloud platform. The application and its associated services are deployed using Terraform, while app management is handled by the ELK stack.

## 2. Getting Started <a name="getting-started"></a>

### Prerequisites <a name="prerequisites"></a>

Make sure you have the following installed on your machine:

- Terraform 
- AWS account
- AWS CLI

### Installation <a name="installation"></a>

1. Clone the repository:

   ```bash
   git clone https://01.kood.tech/git/StepanTI/cloud-design.git
   ```

2. Navigate to the project directory:

   ```bash
   cd cloud-design
   ```

3. Initialize cluster:
    ```bash
    terraform init
    ```

3. Create the cluster: 
    ```bash
    terraform apply
    ```

4. Update config to allow your user to access the cluster.
    ```bash
    aws eks update-kubeconfig --region $(terraform output -raw region) --name $(terraform output -raw cluster_name)
    ```

5. Start the cluster: 
    ```bash
    kubectl apply -f ./manifests/
    ```

6. To get the link to the app use: 
    ```bash
    echo "$(kubectl get svc api-gateway-app-service -o=jsonpath='{.status.loadBalancer.ingress[0].hostname}'):$(kubectl get svc api-gateway-app-service -o=jsonpath='{.spec.ports[0].targetPort}')/api-docs"
    ```

7. To delete the deployment use: 
    ```bash
    kubectl delete -f ./manifests/
    ```
     ```bash
    terraform destroy
    ```

## 3. API Documentation <a name="api-documentation"></a>

### API Gateway <a name="api-gateway"></a>

The API Gateway routes requests between the Inventory and Billing services using a proxy system to forward them to the correct service. API documentation is provided in the OpenAPI format. For detailed information, visit <generated-link>.

### Inventory API <a name="inventory-api"></a>

The Inventory API is a CRUD RESTful API that provides information about movies, utilizing a PostgreSQL database called "movies." The available endpoints are:

- `GET /api/movies`
- `GET /api/movies?title=[name]`
- `POST /api/movies`
- `DELETE /api/movies`
- `GET /api/movies/:id`
- `PUT /api/movies/:id`
- `DELETE /api/movies/:id`

### Billing API <a name="billing-api"></a>

The Billing API processes messages received from RabbitMQ. It parses JSON messages and creates entries in the orders database. The relevant endpoint is the RabbitMQ queue: billing_queue.

## 4. EKS <a name="eks"></a>

The project uses EKS to set up all microservices:

- `api-gateway-app`: API Gateway.
- `inventory-app`: `Inventory` API.
- `inventory-database`: Contains the `movies` database.
- `billing-app`: `Billing` API.
- `billing-database`: Contains the `orders` database.
- `rabbitmq`: Runs RabbitMQ service.
