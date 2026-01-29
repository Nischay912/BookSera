// step2: lets create a basic express app first here, thus below.
import express from "express"

// step4: we need to use the dotenv package and use its config method to use the environment variables from the .env file now here below.
import dotenv from "dotenv"
dotenv.config();
import authRoutes from "./routes/authRoutes.js"
import bookRoutes from "./routes/bookRoutes.js";
import { connectDB } from "./lib/db.js";
// step340: now lets import the cron.js file now here below.
import job from "./lib/cron.js"

// step222: lets import the "cors" package here in order to use it , to allow cross-origin requests i.e. if we are making a request from one port of frontend to another port of backend , we can use the "cors" package to allow that there, thus now here below.
import cors from "cors"

const app = express();

// step3: lets get the port number from the .env file now here below ; and then if there is some error in getting the port number, lets also hardcode it here below to 3000.
const PORT=process.env.PORT || 3000;

// step341: and just as server starts before it at top only do : jon.start() so that : the function to send GET request to the API_URL every 14 minutes will be called automatically when the server starts now there ; we keep it at top : so the cron job runs immediately, independently, and does not depend on Express starting successfully ; as work of CRON job is to run server every 14 minutes , so it should run everything in server from top when job.start() executes every 14 minutes ; so thats why kept at top so that nothing / no function defined here , is missed at top of it above it ; thus here below.

// step342: so thus here at top : job.start() activates the cron job like turning ON an alarm clock — without calling it, the cron job will never run, thus here below.

// step343: see the next steps in step344.txt file now there.
job.start();

// step223: and here add before making call to the request below , the : that "cors" middleware to allow cross-origin requests i.e. if we are making a request from one port of frontend to another port of backend , we can use the "cors" package to allow that there, thus now here below.

// step224: see the next steps in step225.txt file now there.
app.use(cors());

// step43: lets now include the middleware before the routes so that we can use the middleware to parse the JSON body of the request now there ; and make the req.body to now not be undefined, thus here below ; and also we must place this before the routes so that before sending the request at endpoint, the middleware should be there to convert the JSON body of the request into a JavaScript object to get proper definded data in req.body for the server, thus here below.

// step44: see the next steps in authRoutes.js file now there.
app.use(express.json());


app.get('/api/health', (req,res) => {
    res.status(200).json({status: "ok"})
})

// step6: lets create a route here below for authentication, whose content will be coming from a file called "authRoutes.js" now here below.

// step7: now see the next steps in authRoute.js file now here.
app.use("/api/auth", authRoutes);

// step112: now lets make the route for things related to books here below.

// step113: see the next steps in Book.js file now there.
app.use("/api/auth", bookRoutes);

// step5: now we can use the PORT variable instead of the hardcoded value now, thus here below.
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} : http://localhost:${PORT}`);

    // step20: now lets call the function to connect to the database now here below.

    // step21: see the next steps in User.js file now there.
    connectDB();
})