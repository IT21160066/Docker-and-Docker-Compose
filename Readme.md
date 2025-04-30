## Docekr Network Creation with mongodb and mongo-express

---

## Running Manually with Docker

### Step 1: Create a Docker Network (Optional)

```bash
docker network create mongo-network
```

### Step 2: Start MongoDB Container

```bash
docker run -d -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  --name mongodb \
  --net mongo-network \
  mongo
```

### Step 3: Start Mongo Express Container

```bash
docker run -d -p 8081:8081 \
  -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
  -e ME_CONFIG_MONGODB_ADMINPASSWORD=password \
  -e ME_CONFIG_MONGODB_SERVER=mongodb \
  --name mongo-express \
  --net mongo-network \
  mongo-express
```

---

## Running with Docker Compose

### Step 1: Start All Services

```bash
docker-compose -f docker-compose.yaml up
```

This will start:

- MongoDB
- Mongo Express
- Your JS Application

### Step 2: Access Mongo Express

Open in your browser:  
[http://localhost:8081](http://localhost:8081)

### Step 3: Create a Database and Document

In **Mongo Express**, create:

- **Database:** `my-db`
- **Collection:** `my-collection`
- **Document:**
  ```json
  {
    "myid": 1,
    "data": "sample data"
  }
  ```

### Step 4: Access the Node.js App

Open in your browser:  
[http://localhost:3000](http://localhost:3000)
