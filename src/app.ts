import express from 'express';

//Import router
import routes from './routes/routes';

const app = express();

/** Parse the request */
app.use(express.urlencoded({ extended: false }));
/** Handle JSON data */
app.use(express.json());

/** RULES OF OUR API */
app.use((req, res, next) => {
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
app.use('/api/v1/', routes);

/** Error handling */
app.use((req, res, next) => {
    return res.status(405).json({
        message: "rejected",
        error:""
    });
});

export default app;