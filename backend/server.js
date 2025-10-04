import connectDB from "./config/db.js";
import express from "express";

import dotenv from "dotenv";
dotenv.config({ //must need to config to use dotenv in import format
    path: './env'
})

connectDB()































































// const app = express();

// ( async() => {
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error", (error) => {
//             console.log("ERROR:- Our database is connected but our express  application is not able to talk to the Database:- ", error);
//             throw error;
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`App is listening on port ${process.env.PORT}`);
//         })
//     }
//     catch(error){
//         console.error("Error: ", error);
//         throw error;
//     }
// })()