import http from 'http';
import express, { Express } from 'express';
require("dotenv").config();

//Import DB
import sequelize from "./config/database.config";

//Import router
import routes from './routes/routes';

const router: Express = express();

/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Handle JSON data */
router.use(express.json());

/** RULES OF OUR API */
router.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST');
        return res.status(200).json({});
    }
    next();
});

/** Routes */
router.use('/api/v1/', routes);

/** Error handling */
router.use((req, res, next) => {
    return res.status(405).json({
        message: "rejected",
        error:""
    });
});

/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 3000;
httpServer.listen(PORT, async() => {
    await sequelize.authenticate().then(()=>{
        console.log("database connected")
    }).catch(e=>{throw e})
    console.log(`server is running on port ${PORT}`)
});