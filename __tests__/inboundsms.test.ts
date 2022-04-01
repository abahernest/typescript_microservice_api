import request from 'supertest';
import app from '../src/app';

const InboundSMS = {
    from: '367347882',
    to: '73849667',
    text: "OK"
};

describe('Test Inbound SMS', () => {
    it('Should return 403 for unauthenticated request', async () => {
        const result = await request(app).post('/api/v1/inbound/sms').send(InboundSMS);
        
        expect(result.status).toEqual(403)
        expect(result.body.error).toEqual("authentication failed");
    })
})