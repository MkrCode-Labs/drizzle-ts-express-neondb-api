
import "dotenv/config";
import { drizzle } from 'drizzle-orm/neon-http';

const databaseURL = process.env.DATABASE_URL
if (!databaseURL) {
    throw new Error("DATABASE_URL environment variable is required");
}

export const db = drizzle(databaseURL)