import { MongoClient } from 'mongodb'

export async function GET(req: Request) {
    const client = new MongoClient(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    try {
        await client.connect()

        const db = client.db(process.env.DB_NAME)
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