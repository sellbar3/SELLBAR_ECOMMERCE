import mongoose from "mongoose";
import cachedProducts from "@/config/products-cache.json";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://sellbar3_db_user:SwkiSitTUWtSeMBR@cluster0.foqbgdq.mongodb.net/sellbar?retryWrites=true&w=majority";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Backward compatibility helper for sitemap and static generators
export const db = {
  getRefurbishedProducts: () => (Array.isArray(cachedProducts) ? cachedProducts : []),
  getDeviceModels: () => [],
};

export default connectToDatabase;
