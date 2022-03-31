
const { DB_HOST,DATABASE_URL } = process.env;

import {Sequelize} from "sequelize-typescript";
const sequelize = new Sequelize(DATABASE_URL||"", {
    host: DB_HOST,
    dialect:'postgres',
    models: [__dirname+'/models']
}
);

export default sequelize; 


