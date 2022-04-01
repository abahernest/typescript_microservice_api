import request from 'supertest';
import app from '../src/app';

let outboundRequest, account; 

beforeAll( () => {
    outboundRequest = {
        from: '4924195509196',
        to: '441224459590',
        text: "Hello World"
    };
    account = {
        id:1,
        auth_id:"20S0KPNOIM",
        username:"azr1"
    }
    console.log("Created test data")
})

afterAll ( ()=>{
    outboundRequest={},account={};
    console.log("Destroyed test data...")
})

describe('Test Outbound SMS', () => {
    describe('Checking HTTP Request Type', () => {
        test('Should return 405 for HTTP GET request', async () => {
            const result = await request(app).get('/api/v1/outbound/sms').send(outboundRequest);
            
            expect(result.status).toEqual(405)
            expect(result.body.message).toEqual("rejected");
        })

        test('Should return 405 for HTTP DELETE request', async () => {
            const result = await request(app).delete('/api/v1/outbound/sms').send(outboundRequest);
            
            expect(result.status).toEqual(405)
            expect(result.body.message).toEqual("rejected");
        })

        test('Should return 405 for HTTP PATCH request', async () => {
            const result = await request(app).patch('/api/v1/outbound/sms').send(outboundRequest);
            
            expect(result.status).toEqual(405)
            expect(result.body.message).toEqual("rejected");
        })

        test('Should return 405 for HTTP PUT request', async () => {
            const result = await request(app).put('/api/v1/outbound/sms').send(outboundRequest);
            
            expect(result.status).toEqual(405)
            expect(result.body.message).toEqual("rejected");
        })
    })

    describe('Account Authorization', () => {
        test('Should return 403 for wrong account credentials', async () => {
            const result = await request(app).post('/api/v1/outbound/sms').auth("abcdef","abcdef").send(outboundRequest);
            
            expect(result.status).toEqual(403)
            expect(result.body.error).toEqual("authentication failed");
        })

        test('Should return 403 for empty account credentials', async () => {
            const result = await request(app).post('/api/v1/outbound/sms').send(outboundRequest)
            
            expect(result.status).toEqual(403)
            expect(result.body.error).toEqual("authentication failed");
        })

        test('Should return 200 for correct account credentials', async () => {
            const result = await request(app).post('/api/v1/outbound/sms').auth(account.username,account.auth_id).send(outboundRequest);
            
            expect(result.status).toEqual(200)
        })
    })

    describe('Request Body Validation', () => {
        test('Should return "from is invalid" when "from" parameter is too short', async () => {
            const result = await request(app)
            .post('/api/v1/outbound/sms')
            .auth(account.username,account.auth_id)
            .send({
                from:"3",
                to:outboundRequest.to,
                text:outboundRequest.text
            });
            
            expect(result.status).toEqual(412)
            expect(result.body.message).toEqual("from is invalid");
        })

        test('Should return "to is invalid" when "to" parameter is too long', async () => {
            const result = await request(app)
            .post('/api/v1/outbound/sms')
            .auth(account.username,account.auth_id)
            .send({
                from:outboundRequest.from,
                to:"1223356789009876543234098765432",
                text:outboundRequest.text
            });
            
            expect(result.status).toEqual(412)
            expect(result.body.message).toEqual("to is invalid");
        })

        test('Should return "text is missing" for missing "text" parameter', async () => {
            const result = await request(app)
            .post('/api/v1/outbound/sms')
            .auth(account.username,account.auth_id)
            .send({
                from:outboundRequest.from,
                to:outboundRequest.to
            });
            
            expect(result.status).toEqual(412)
            expect(result.body.message).toEqual("text is missing");
        })


        test('Should return "outbound sms ok" if request validation passes', async () => {
            const result = await request(app)
            .post('/api/v1/outbound/sms')
            .auth(account.username,account.auth_id)
            .send(outboundRequest);
            
            expect(result.status).toEqual(200)
            expect(result.body.message).toEqual("outbound sms ok");
        })

    })

    describe('Phone Number Verification', () => {
        test('Should return "from parameter not found" when phone number doesnt exist', async () => {
            const result = await request(app)
            .post('/api/v1/outbound/sms')
            .auth(account.username,account.auth_id)
            .send({
                from:"abcdefghijhi",
                to:outboundRequest.to,
                text:outboundRequest.text
            });
            
            expect(result.status).toEqual(404)
            expect(result.body.error).toEqual("from parameter not found");
        })

        test('Should return "outbound sms ok" if phone number is found', async () => {
            const result = await request(app)
            .post('/api/v1/outbound/sms')
            .auth(account.username,account.auth_id)
            .send(outboundRequest);
            
            expect(result.status).toEqual(200)
            expect(result.body.message).toEqual("outbound sms ok");
        })

    })
})