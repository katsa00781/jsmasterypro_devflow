// Mongoose könyvtár importálása a típusdefinícióval együtt
import mongoose, { Mongoose } from "mongoose";

// MongoDB kapcsolati URI beolvasása környezeti változóból
const MONGODB_URI = process.env.MONGODB_URI as string;

// Ellenőrizzük, hogy az URI be van-e állítva
if (!MONGODB_URI) {
  throw new Error("MongoDB URI is not defined. Please define it in .env.local");
}

// Interfész a Mongoose kapcsolat cache-eléséhez
// conn: aktív kapcsolat tárolása
// promise: függőben lévő kapcsolat promise-a
interface MongooseCashe {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// A globális névtér kiterjesztése a mongoose cache-el
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCashe;
}

// Cache referencia mentése lokális változóba
let cached = global.mongoose;

// Ha még nincs cache inicializálva, létrehozzuk üres értékekkel
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async (): Promise<Mongoose> => {
  // Ha már van kapcsolat, visszaadjuk azt
  if (cached.conn) {
    return cached.conn;
  }

  // Ha nincs kapcsolat, de van promise, visszaadjuk azt
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "devflow",
      })
      .then((result) => {
        console.log("MongoDB connected");
        return result;
      })
      .catch((error) => {
        console.error("MongoDB connection error:", error);
        throw error;
      });
  }
  // Visszaadjuk a promise-t
  cached.conn = await cached.promise;
  return cached.conn;
};

export default dbConnect;
