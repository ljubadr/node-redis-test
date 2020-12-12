import * as redis from 'async-redis';
import { gzip } from 'node-gzip';

let client = redis.createClient({
    host: 'localhost',
    port: 6381
});

(async () => {
    const compressed = await gzip('test-string', { level: 9 });

    // @ts-ignore
    await client.setex('compressed', 3600, compressed);
    await client.setex('compressed-toString', 3600, compressed.toString());

    client.end(true);
})();