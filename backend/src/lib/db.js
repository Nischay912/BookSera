// step14: lets import mongoose pacakge that will help to connect to the database now here below.
import mongoose from "mongoose";

// step18: import the dotenv package and call the config method to use the environment variables from the .env file now here below.
import dotenv from "dotenv";
dotenv.config();

// step15: now lets write a function to be able to connect to our database ; which we will be using in different files ; so lets export it here below first, here below.
export const connectDB = async () => {
    try{
        // step17: now lets connect to the database now here below using the connection string from the .env file now here below.
        const conn = await mongoose.connect(process.env.MONGO_URI);

        // step18: ${conn.connection.host} prints the server host address ; example : mongodb://127.0.0.1:27017 , etc. thus here below.

        // step19: see the next steps in "index.js" file now there.
        console.log(`Connected to MongoDB ${conn.connection.host}`);
    }
    catch(error){
        console.log("Error in connecting to MongoDB", error);

        // step16: exit with status code 1 which means error, and status code 0 if there means "success", thus here below.
        process.exit(1);
    }
}