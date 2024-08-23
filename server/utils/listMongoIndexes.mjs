// a script to check indexes
// This is built to debug E11000 duplicate key error collection

import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI

import { MongoClient } from 'mongodb';

async function listIndexes() {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const database = client.db('pdfSync');
    const collection = database.collection('users');
    
    // Fetch indexes
    const indexes = await collection.indexes();
    console.log('Indexes:', indexes);
  } finally {
    await client.close();
  }
}

listIndexes().catch(console.error);
