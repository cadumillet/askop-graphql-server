import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

export const db = new Low(new JSONFile("database.json"), null);
