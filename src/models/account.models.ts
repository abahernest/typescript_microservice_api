require("dotenv").config;
import {DataTypes} from "@sequelize/core"
import sequelize from "../config/database.config"

const Account = sequelize.define('account',{
    username: {type:DataTypes.STRING,allowNull:false},
    auth_id: {type:DataTypes.STRING,allowNull:false}
},{
    freezeTableName:true,
    timestamps:false
});

// (async()=>{
//     await Account.sync();
// })();

export default Account;