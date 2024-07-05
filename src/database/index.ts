import { Collection, MongoClient } from "mongodb";
import { Project } from "../types/resolvers";

const url = process.env.MONGO_URL || "";
const dbName = process.env.DB_NAME || "";

export let Users: Collection;
export let Projects: Collection<Omit<Project, "_id">>;

export default async () => {
  const client = await MongoClient.connect(url);
  console.log("🚀  Connected to MongoDB");

  const db = client.db(dbName);

  Users = db.collection("users");
  Projects = db.collection("projects");

  return {
    Users,
  };
};
