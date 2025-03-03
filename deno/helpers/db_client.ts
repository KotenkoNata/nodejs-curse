import { MongoClient, Database } from "npm:mongodb@6.1.0";
import "https://deno.land/std@0.224.0/dotenv/load.ts";



let db: Database;

const MONGO_DB_NAME=Deno.env.get('MONGO_DB_NAME');
const MONGO_DB_PASSWORD = Deno.env.get('MONGO_DB_PASSWORD');

const mongoUri = `mongodb+srv://${MONGO_DB_NAME}:${MONGO_DB_PASSWORD}@cluster0.5xgasid.mongodb.net/?retryWrites=true&w=majority&tls=true`;


console.log(`Connected to mongodb server`, mongoUri);

export async function connect() {
    const client = new MongoClient(mongoUri);

    await client.connect();
    db = client.database('todo-app');
}

export function getDb() {
    return db;
}



