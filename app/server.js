const express = require("express");
const path = require("path");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");

const app = express();
const { MONGO_DB_USERNAME: DB_USER, MONGO_DB_PWD: DB_PASS } = process.env;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

const mongoUrlDockerCompose = `mongodb://${DB_USER}:${DB_PASS}@mongodb`;
const mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const databaseName = "my-db";
const collectionName = "my-collection";

app.get("/fetch-data", async (req, res) => {
  try {
    const client = await MongoClient.connect(
      mongoUrlDockerCompose,
      mongoClientOptions
    );
    const db = client.db(databaseName);
    const result = await db.collection(collectionName).findOne({ myid: 1 });
    res.send(result || {});
    client.close();
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => console.log("App listening on port 3000!"));
