const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
// require("dotenv").config();

const dbFile = "./data.db";

module.exports = open({
  filename: dbFile,
  driver: sqlite3.Database,
}).then(async (db) => {
  await db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    date TEXT,
    status TEXT
  )`);
  return db;
});