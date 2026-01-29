// step8: lets set up a basic express app first here below.
import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

// step9: now lets create a router ; which helps to maintain all the authentication routes in one place now here below.
const router = express.Router();

// step75: now lets create the function to generate token, here below.
const generateToken = (userId) => {
    // step76: now lets call the "sign" method of jsonwebtoken package to generate the token now here below.
    return jwt.sign(
        // step77: we first pass into this the userId : which can be used to tell that this jwt token belongs to which user, so lets have this userId as the unique identifier to know who is the owner of this jwt token, thus here below.
        {userId}, 

        // step78: then we pass the SECRET which can be any secret from the env variables to create this jwt token, thus here below ; this key ensures nobody can fake or modify your token ; Server uses the secret to sign the token ; Later, it uses the same secret to verify the token ; If the token is changed → verification fails → user is not allowed, thus here below.
        process.env.JWT_SECRET, 

        // step79: then we pass the expiration time of the token ; so this means that : The token will automatically expire in 15 days ; so : After 15 days → user must login again to get a new token ; if not we will auto logout OR lose our authentication to the server after 15days automatically ; so maximum we can stay continued logged in for 15 days ; because : A new token is created every time the user logs in ; and then user can stay logged in 15d maximum, as after that token will expire & the user will have to login again ; thus here below.
        {expiresIn: "15d"}
    );
}

// step10: now lets make the various endpoints here below.

// step11: can check it working on web browser by making them "get" for some time as only GET requets can be used to see response on web broswer, POST  is used to send data not fetch response ; and then since this file was mounted in "index.js" file on top of "/api/auth" endpoint, we can use "/register" and "/login" endpoints with it now : so it will show the following response, when we visit : http://localhost:3000/api/auth/register and http://localhost:3000/api/auth/login now there, thus here below.

// step12: see the next steps in step13.txt file now there.
router.post("/register", async (req, res)=> {
    // res.send('register')
    try{
        // step37: so the user will be sending many fields from the form to the server, which we will be collecting from the object, thus here below.

        // step38: but we will get these as undefined, because to use "req.body" , we need to use the middleware "express.json()" in the index.js file there, thus here below.

        // step39: By default, Express does NOT understand JSON sent in requests ; so the middleware : Parses the incoming JSON body ; Converts it into a JavaScript object and then Stores it in req.body so that now : Express can understand JSON sent from frontend or Postman, thus here below.

        // step40: without using the middleware, we will get undefined for req.body , even if you have sent some data to server from frontend there.

        // step41: example : without middleware : { "username": "Raj" } then : req.body = undefined ; but with middleware : { "username": "Raj" } then : req.body = { "username": "Raj" } thus here below.

        // step42: so see the next steps in index.js file now there.
        const {username, email, password} = req.body;

        // step45: now lets check if any of the fields is empty or not, thus here below.
        if(!username || !email || !password){

            // step46: so then we return from here itself to not execute remaining part of code ; and return with a status code of "400" which means error, thus here below.
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        // step47: now if password is not of length > 6 then also return a JSON format response, thus here below.
        if(password.length < 6){
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            })
        }

        // step48: also if the username is not of minimum 3 length then also return a JSON format response, thus here below.
        if(username.length < 3){
            return res.status(400).json({
                success: false,
                message: "Username must be at least 3 characters long"
            })
        }

        // step49: now if all these tests pass ; check if user already exists or not from database with the same email or username ; thus here below.

        // step50: so we use the "or" operator that is used to check if either conditions matches i.e. we check from our User model ; A Model represents a collection in MongoDB ; so we search the "users" collection if there any user already exists with the "email" or "username" sent/entered same as that by the user in the form, thus here below.
        // const existingUser = await User.findOne({$or : [{email: email}, {username: username}]});

        // step51: if yes then return out of function and not execute remaining part of code, thus here below.
        // if(existingUser){
        //     return res.status(400).json({
        //         success: false,
        //         message: "User already exists!"
        //     })
        // }

        // step52: but its better to send response telling that the username already exist or email already exist, thus here below ; so that user can know which of the both has been taken ; so that he can change accordingly the fields there, thus here below.

        // step53: so lets first check if the email entered has already been taken or not thus here below.
        const existingEmail = await User.findOne({email: email});
        if(existingEmail){
            return res.status(400).json({
                success: false,
                message: "Email already exists!"
            })
        }

        // step54: and then if username already taken, tell that here separately, thus here below.
        const existingUsername = await User.findOne({username: username});
        if(existingUsername){
            return res.status(400).json({
                success: false,
                message: "Username already taken!"
            })
        }

        // step60: lets have the API here below ; to get random avatar for different users randomly  by the API, thus here below.

        // step61: this happens because this website when you visit and choose any image there for usage : it gives unique names after ?seed=..... there in the URL ; if we enter any random characters after that seed=... there too ; it gives us random images there ; thats how this link below will be giving us random profile images for different users there, thus here below.
        const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`

        // step55: now after all of these checks passes, we can create the user document with the entered credentials thus here below.

        // step56: so we create a new document as per the User schema, in the Users collection using the syntax here below ; by the help of User model we created based on the User schema earlier there , thus here below.
        const user = new User({
            username: username,
            email: email,
            password: password,

            // step57: we now by default can leave the profile pic as nothing there if user didn't upload one, thus here below.
            // profileImage: ""

            // step58: OR we can put a default profile pic too for the users if its has not been uploaded by the user, thus here below.

            // step59: so for that we can visit : "https://www.dicebear.com/" > playground > drop down in left sidebar > "avataaars" > and lets have the API to randomly allocate from them to different users there ; so see the next steps above for the API there.

            // step62: so now have the profile image from the API allocated by default to user, thus here below.
            profileImage: profileImage
        })

        // step63: now lets save this document to the database using the "save()" method, thus here below.
        await user.save();

        // step64: see the next steps in step65.txt file now there.

        // step74: now lets call the function to generate token for a user using his id given by mongodb in database for every document as "_id" by rule, here below.

        // step80: now we store the "token" in this variable below , as the function returned the token, which we are assigning here below to the "token" variable, here below.

        // step81: but we know that the token is not stored in the database, but : generated and sent to frontend, where it stores it in : localStorage or cookies or in case of mobile application via react native , it stores it in AsyncStorage that acts same as localStorage of web apps, in react native, thus here below ; Then on each request, frontend sends token back → server verifies it, that the request was sent by the authenticated user OR is someone trying to fake his identity and send request and thus will not accept requets from un-authenticated users, thus here below.

        const token = generateToken(user._id);

        // step82: and by rule, server creates the token, but not saves it ; rather it sends it to frontend to save it there, thus here below.

        // step83: so lets send the token to the client/mobile app via response, thus here below, with status code of "201" which means that some resource was created successfully in the backend, thus here below.
        res.status(201).json({
            // step84: so lets send the token in response below.
            token,

            // step85: and send the user associated too, lets send the id only as sending whole "user" in response may disclose the password too there, thus here below.
            user:{
                id: user._id, // as this is how mongodb stores the id in database i.e. as "_id"
                username: user.username,
                email: user.email,
                profileImage: user.profileImage
            },

            // step86: can now test this on POSTMAN by creating a new workspace for "BookSera" there now, thus here below.

            // step87: so now we will be able to see the registered user on mongodb collections list there too now, thus here below.

            // step88: see the next steps in step89.txt file now there.
        })
    }
    catch(error){
        console.log("Error in registering user", error);
        res.status(500).json({ // 500 error code means internal server error
            success: false,
            message: "Error in registering user due to some internal server error"
        })
    }
})

router.post("/login", async (req, res)=> {
    // res.send('login')
    try{
        // step97: lets get the email and password from the request body sent by user's form there, thus here below.
        const {email, password} = req.body;

        // step98: then we can have the check here below.
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            })
        }

        // step99: now lets check if user exists or not, here below.
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({
                success: false,
                // BETTER NOT TO SAY "USER NOT EXISTS" AS WE DON'T WANT OTHER USERS TO KEEP INSERTING AND CHECKING IF THAT USER EXISTS OR NOT THERE, THUS HERE BELOW.
                message: "Invalid Credentials"
            })
        }

        // step100: now lets check for the password here below if the password entered is correct or not, using the function created in User.js file there now, thus here below.

        // step101: we do user.comparePassword() method, and not User.comparePassword() because we can use the functions defined in schema using instances like "user" only and not with the model "User" ; models are used just to search, insert, delete, update , etc there ; so with User model we can do : User.findOne() or User.create() or User.findById(), etc ; but to use the methods defined in the schema User.js , we need to have a "user" instance made there ; because : schema.methods > adds methods to instances only, not the model ; so : to use this comparePassword() method, we need to have a "user" instance made there and this "user" instance is like { username: "Test", email: "test@gmail.com", password: "hashedpwd" } : so user is one user document , that user is one user document, thus here below.

        // step102: so it will return true or false and tell if password entered by user is correct or not, thus here below.
        const isPasswordCorrect = await user.comparePassword(password)
        if(!isPasswordCorrect){
            return res.status(400).json({
                success: false,
                // message: "Password entered is incorrect!"

                // step103: here also : BETTER NOT TO SAY "PASSWORD ENTERED IS INCORRECT" AS WE DON'T WANT OTHER USERS TO KEEP INSERTING AND CHECKING IF THAT PASSWORD IS CORRECT OR NOT THERE, THUS HERE BELOW ; as we don't want to tell others which one is incorrect : email or password , rather just say that "Invalid Credentials" , so that : others like hackers or spammers or anyone else can't know which one is incorrect ; thus here below.
                message: "Invalid Credentials"
            })
        }

        // step104: finally lets generate the token for the logged in authenticated user, thus here below.
        const token = generateToken(user._id);

        // step105: now finally send a response to the client/mobile app with the token with user info just like we did in register ; no need to send password as it may be prone to attacks by hacker if hackers get access of the password in the response there, thus here below.
        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage
            }
        })
        // step106: again now we can test this on POSTMAN for this "http://localhost:3000/api/auth/login" endpoint now, by sending email and password ther ein raw > body ; remember to enable JSON in the dropdown there instead of Text there, thus here below.

        // step107: see the next steps in step108.txt file now there.
    }
    catch(error){
        console.log("Error in logging in the user", error);
        res.status(500).json({ // 500 error code means internal server error
            success: false,
            message: "Error in logging in the user due to some internal server error"
        })
    }
})

export default router;