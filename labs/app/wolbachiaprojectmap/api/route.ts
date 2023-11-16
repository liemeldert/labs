import { MongoClient } from 'mongodb'

export async function GET(req: Request) {
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.DB_NAME;

    if (!uri || !dbName) {
        return new Response('Database URI or dbName not provided in server config', { status: 500 });
    }

    const client = new MongoClient(uri);

    try {
        await client.connect()

        const db = client.db(dbName)
        const collection = db.collection('wolbachiaprojectdata')

        const data = await collection
            .find({
                entry_link: { $exists: true, $ne: "" },
                entry_title: { $exists: true, $ne: "" },
                wolbachia_presence: { $exists: true, $ne: "" },
                location_lon: { $exists: true, $ne: "" },
                location_lat: { $exists: true, $ne: "" },
            })
            .project({
                entry_link: 1,
                entry_title: 1,
                wolbachia_presence: 1,
                location_lon: 1,
                location_lat: 1,
            })
            .toArray()

        return Response.json(data)
    } catch (error) {
        return new Response('Unable to connect to database', {status: 500})
    } finally {
        await client.close()
    }
}
