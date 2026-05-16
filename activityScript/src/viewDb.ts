import { db } from "./db/sqlite.js";

const viewDb = db.prepare('Select * From activity_logs')

console.log(viewDb.all())
