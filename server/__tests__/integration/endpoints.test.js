const request = require('supertest')
const server = require('../../server');

describe('server endpoints', () => {
    let api;
    beforeAll(async () => {
        api = server.listen(5000, () => console.log('Test server running on port 5002'))
    });
    afterAll(done => {
        console.log('Gracefully stopping test server')
        api.close(done)
    })
    it('should be accessible on port 5002', async () => {
        const res = await request(api).get('/')
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual("hello world");
    })
    it('should return a list of currently created rooms', async () => {
        const res = await request(api).get('/rooms')
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([]) //change beforeAll to add dummy rooms
    })
});
