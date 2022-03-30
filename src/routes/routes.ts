import express from 'express';
import {InboundSMS,OutboundSMS} from '../controllers/controllers';

const router = express.Router();

router.post('/inbound/sms', InboundSMS);
router.post('/outbound/sms', OutboundSMS);

export = router;