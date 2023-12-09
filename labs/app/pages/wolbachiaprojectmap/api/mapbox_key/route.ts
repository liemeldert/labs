export async function GET(req: Request) {
    const key = process.env.MAPBOX_KEY;

    if (!key) {
        return new Response('Mapbox key not provided.', { status: 500 });
    }

    return new Response(key, { status: 200 });
}
