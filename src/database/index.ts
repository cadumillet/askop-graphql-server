import { Collection, MongoClient } from "mongodb";

const url = process.env.MONGO_URL || "";
const dbName = process.env.DB_NAME || "";

export let Users: Collection;

export default async () => {
  const client = await MongoClient.connect(url);
  console.log("🚀  Connected to MongoDB");

  const db = client.db(dbName);

  Users = db.collection("users");

  return {
    Users,
  };
};
