import sqlite3 from "sqlite3";

const mixxxDB = new sqlite3.Database("./mixxxdb.sqlite");

export default mixxxDB;
