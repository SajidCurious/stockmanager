import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  // Replace the uri string with your connection string.
  const uri =
    "mongodb+srv://sajidcurious9:he5ookTWGxxga0HW@cluster0.diwq20h.mongodb.net/";

  const client = new MongoClient(uri);

  try {
    const database = client.db("sajidStocks");
    const inventory = database.collection("inventory");

    // Query for a movie that has the title 'Back to the Future'
    const query = {};
    const allProducts = await inventory.find(query).toArray();

    console.log(movie);
    return NextResponse.json({ allProducts });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

export async function POST(request) {
  // Replace the uri string with your connection string.

  let body = await request.json();
  const uri =
    "mongodb+srv://sajidcurious9:he5ookTWGxxga0HW@cluster0.diwq20h.mongodb.net/";

  const client = new MongoClient(uri);

  try {
    const database = client.db("sajidStocks");
    const inventory = database.collection("inventory");

    // Query for a movie that has the title 'Back to the Future'
    const product = await inventory.insertOne(body);

    return NextResponse.json({ product, ok: true });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
