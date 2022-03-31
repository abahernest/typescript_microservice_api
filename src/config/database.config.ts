require("dotenv").config();
import {Sequelize} from "@sequelize/core";

const { DB_HOST,DB_USER,DB_PASSWORD,DB_NAME, DATABASE_URL } = process.env;

const sequelize = new Sequelize(DATABASE_URL||"", {
    dialect:'postgres',
    logging:false,
    ssl: false,
}
);

export default sequelize; 


