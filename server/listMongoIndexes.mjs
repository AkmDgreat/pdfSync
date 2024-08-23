// a script to check indexes
// This is built to debug "E11000 duplicate key collection" error

import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
dotenv.config();
const MONGO_URI = process.env.MONGO_URI

async function listIndexes(databaseName, collectionName) {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);
    
    // Fetch indexes
    const indexes = await collection.indexes();
    console.log('Indexes:', indexes);
  } finally {
    await client.close();
  }
}

listIndexes('pdfSync', 'users').catch(console.error);

async function dropAllIndexes(databaseName, collectionName) {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const database = client.db('pdfSync');
    const collection = database.collection('users');
    const result = await collection.dropIndexes();
    console.log("Indexes dropped:", result);
  } 
  catch (error) {
    console.error("Failed to drop indexes", error);
  } 
  finally {
    await client.close();
  }
}

// dropAllIndexes('pdfSync', 'users').catch(console.error);