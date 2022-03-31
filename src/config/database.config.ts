require("dotenv").config();
import {Sequelize} from "@sequelize/core";

const { DB_HOST,DB_USER,DB_PASSWORD,DB_NAME } = process.env;

const sequelize = new Sequelize(DB_NAME||"",DB_USER||"",DB_PASSWORD||"", {
    host: DB_HOST,
    dialect:'postgres',
    logging:false
}
);

export default sequelize; 


