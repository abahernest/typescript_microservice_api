import {DataTypes} from "@sequelize/core"
import sequelize from "../config/database.config"

const PhoneNumber = sequelize.define('phone_number',{
    number: {type:DataTypes.STRING,allowNull:false},
    account_id: {type:DataTypes.INTEGER,allowNull:false}
},{
    freezeTableName:true,
    timestamps:false,
})

// PhoneNumber.sync()

export default PhoneNumber;