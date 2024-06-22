"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = void 0;
const uuid_1 = require("uuid");
const index_1 = require("./index");
const createModel = (db, table) => ({
    findOne(filter = {}) {
        if (!filter) {
            db.get(table).head().value();
        }
        return db.get(table).find(filter).value();
    },
    findMany(filter) {
        if (!filter) {
            return db.get(table).orderBy(["createdAt"], ["desc"]).value();
        }
        return db
            .get(table)
            .filter(filter)
            .orderBy(["createdAt"], ["desc"])
            .value();
    },
    updateOne(filter, update) {
        const match = db.get(table).find(filter).value();
        db.get(table).find(filter).assign(update).write();
        return db.get(table).find({ id: match.id }).value();
    },
    remove(filter) {
        return db.get(table).remove(filter).write();
    },
    createOne(fields) {
        const item = Object.assign(Object.assign({}, fields), { createdAt: Date.now(), id: (0, uuid_1.v4)() });
        db.get(table).push(item).write();
        return db.get(table).find({ id: item.id }).value();
    },
    createMany(toCreate) {
        const manyToCreate = (Array.isArray(toCreate) ? toCreate : [toCreate]).map((item) => (Object.assign(Object.assign({}, item), { createdAt: Date.now(), id: (0, uuid_1.v4)() })));
        return db
            .get(table)
            .push(...manyToCreate)
            .write();
    },
});
exports.models = {
    User: createModel(index_1.db, "users"),
    Project: createModel(index_1.db, "projects"),
    Settings: createModel(index_1.db, "settings"),
};
