import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  // Replace the uri string with your connection string.
  const uri =
    "mongodb+srv://sajidcurious9:he5ookTWGxxga0HW@cluster0.diwq20h.mongodb.net/";

  const client = new MongoClient(uri);

  async function run() {
    try {
      const database = client.db("sajid");
      const movies = database.collection("inventory");

      // Query for a movie that has the title 'Back to the Future'
      const query = {};
      const movie = await movies.findOne(query);

      console.log(movie);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
  return NextResponse.json({ a: 34 });
}
