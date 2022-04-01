import app from "./app";
require("dotenv").config();

//Import DB
import sequelize from "./config/database.config";

/** Server */
const PORT: any = process.env.PORT ?? 3000;

app.listen(PORT, async() => {
    await sequelize.authenticate().then(async()=>{
        await sequelize.sync();
        console.log("database connected")
    }).catch(e=>{throw e})
    console.log(`server is running on port ${PORT}`)
});
