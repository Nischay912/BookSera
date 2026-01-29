// step155: first see the theory part in step156.txt file now there.

// step157: lets import the "jwt" package first here below.
import jwt from "jsonwebtoken";

// step158: also lets get the "User" model now here below.
import User from "../models/User.js";

// step159: now lets try to build the function here below.
const protectRoute = async (req,res,next) => {
    try{
        // step160: now this below is an example that shows that we can send a POST request to backend from our application like this below, with the title and caption for the post of book to be posted ; and send it in req.body ; but wr can also have "headers" which is the extra information sent with the request ; so we send the token stored in frontend too, to the server as by rule tokens are stored in frontedn and not server ; and whenever user sends a requets to server, app sends this token along with that , so that server knows that the user sending the request is authenticated and allows that.

        // step161: The word “Bearer” is part of an HTTP Authorization header that follows this format : Authorization: Bearer <token> ; where : Bearer → a type of authorization method ; <token> → the actual access token (like a JWT – JSON Web Token) there ; so "Bearer" is a standard we use to tell that this is token based authentication coming from the authorization headers there, and then we can take this token coming from "Authorization" headers thus there when needed ; so overall when user loggs in, server sends the jwt token to frontedn that saves it and then whenever user sends a request to server, app sends this token along with that request, so that server knows that the user sending the request is authenticated and allows that.

        // const response = await fetch(`http://localhost:3000/api/books`, {
        //     method: "POST",
        //     body: JSON.stringify({
        //         title,
        //         caption
        //     }),
        //     headers: { Authorization: `Bearer ${token}` }
        // });

        // step162: so lets grab the token coming from "Authorization" headers, thus here below ; so the req.header("Authorization") will give us : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6..." that was sent in headers named "Authorization" ; and we replace the "Bearer " with nothing as we just want the token id from there, thus here below.
        const token = req.header("Authorization").replace("Bearer ","");
        
        // step163: then check if token exists or not, thus here below ; where status code 401 means "unauthorized" status thus here below.
        if(!token){
            return res.status(401).json({
                success: false,
                message: "No authentication token found, access denied!"
            })
        }

        // step164: but if we have the token, then we need to verify it thus here below ; we use the same secret we used to generate the token in authRoutes.js file so we will use the same token to decode and verify the token ; thus here below.
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // step165: now in the authROutes.js file, we saw that we used userId to generate the token ; so upon decoding, we will get the userId in the decoded variable ; so lets use the userId to find the user in the database, thus here below.

        // step166: so we find the user using the userId field in the decoded variable & select all the fields corresponding to the user except the password from the database and store below ; as we don't want to take risk of password being leaked or so there , thus here below.
        const user = await User.findById(decoded.userId).select("-password");

        // step167: if user is not found there, then we will show the error message, thus here below.
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User not found, Token is invalid!"
            })
        }

        // step168: if user is found, then we will attach the user to the request object thus here below ; so now this "user" variable will be available in the protectRoute function in bookRoutes.js file now there.

        // step169: now when we call this middleware there ; it saves the user we accessed from the database in the req object under "user" ; and now we had in bookRoutes.js as : router.post("/", protectRoute, async (req, res)=> {....} -> so : now this middleware runs first there ; if everything goes well , it will store the user we got from user in "req" object and now pass it to the function there ; so there in (req,res) : we can access this user using "req.user" there.
        req.user = user;

        // step170: now we have : router.post("/", protectRoute, async (req, res)=> {....} in bookRoutes.js file ; so after this middleware runs , this next() will be called to call the function written after it there i.e. the async(....) and all function that is written after it there ; and so we wont be trapped in this middleware, but will run the function there fater this middleware function ends, thus here below.

        // step171: If user turns out to be null, next() will not (and should not) be called, because that means authentication failed — and we don’t want to let an unauthenticated person continue to protected routes ; and so in the if else block above we return from there itself with res 401 error there ; and this next function line never gets executed as it returned from there only and never runs the code written below it from there, thus here below.
        next();
    }
    catch(error){
        console.log("Error in protectRoute middleware", error);
        res.status(500).json({ // 500 error code means internal server error
            success: false,
            message: "Token is invalid due to some internal server error"
        })
    }
}

// step172: finally lets export this middleware function, so that it can be imported and used in other files now here below.

// step173: see the next steps in bookRoutes.js file now there.
export default protectRoute