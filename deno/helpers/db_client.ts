import { MongoClient, Database } from "npm:mongodb@6.1.0";
import "jsr:@std/dotenv/load";

let db: Database;

export function connect() {
    const client = new MongoClient();

    client.connectWithUri(`mongodb+srv://Deno.env.get('MONGO_DB_NAME'):Deno.env.get('MONGO_DB_PASSWORD')@cluster0.5xgasid.mongodb.net/`)
    db = client.database('todo-app');
}

export function getDb() {
    return db;
}



