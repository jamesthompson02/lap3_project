const request = require('supertest')
const server = require('../../server');

describe('server endpoints', () => {
    let api;
    beforeAll(async () => {
        api = server.listen(5000, () => console.log('Test server running on port 5000'))
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
    it('should return a list of currently created rooms, which is empty to begin with', async () => {
        const res = await request(api).get('/rooms')
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([]) //change beforeAll to add dummy rooms
    })
    it('should return a list of currently active rooms', async () => {
        const res = await request(api).get('/rooms/active')
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([]) //change beforeAll to add dummy rooms
    })
    it('should return a list of current room data objects', async () => {
        const res = await request(api).get('/rooms/data')
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([]) //change beforeAll to add dummy rooms
    })
    it('should create a new room when a post request is made', async () => {
        const res = await request(api).post('/rooms/create')
        .set('Content-type', 'application/json')
        .send({roomid: "testRoom", settings: {
            category: 9,
            numberOfQuestions: 10,
            difficulty: "medium",
            questionType: "multiple"
        }})
        expect(res.status).toEqual(201)
        expect(res.text).toEqual("Room successfully created : testRoom")
    })
    it('should reject a room creation if said room already exists', async ()=>{
        const res = await request(api).post('/rooms/create')
        .set('Content-type', 'application/json')
        .send({roomid: "testRoom", settings: {
            category: 9,
            numberOfQuestions: 10,
            difficulty: "medium",
            questionType: "multiple"
        }})
        expect(res.status).toEqual(401)
        expect(res.text).toEqual("room already exists, pick a new name")
    })
    it('should return a list of currently created rooms, which now includes the new room', async () => {
        const res = await request(api).get('/rooms')
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(["testRoom"]) //change beforeAll to add dummy rooms
    })

});
