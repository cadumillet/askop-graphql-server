"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const lowdb_1 = require("lowdb");
const node_1 = require("lowdb/node");
exports.db = new lowdb_1.Low(new node_1.JSONFile("database.json"), null);
