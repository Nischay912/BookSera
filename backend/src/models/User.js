// step22: now we create our first model here below ; named user , by rule model's name always starts with capital letters, like done for this there : User.js , thus here below.
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

// step23: lets first try to create a schema thus here below ; A schema defines the structure of documents in a MongoDB collection ; so it will tell : Blueprint / Design / Template of how data should look.
const userSchema = new mongoose.Schema({
    // step24: so we put here below ; what every user will have thus here below.
    username: {
        // step25: we also define the rules for each field below ; like "username" will be a string, which will be required and also must be unique, thus here below.
        type: String,
        required: true,
        unique: true
    },
    // step26: similarly every user will also have an email and password with the following rules, thus here below.
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },

    // step27: similarly, the profile image entered by user will also be a "string" ; but : If the user does not upload an image, this field will automatically be set to an empty string.
    profileImage: {
        type: String,
        default:""
    }
},
// step109: the second object of this can now be the timestamps of when the documents were made in the database there, thus here below.
{
    // step110: so now whenever we will signup, it will add this times field there in MONGODB database i.e. the "createdAt" and "updatedAt" fields ; updatedAt → automatically changes every time the document is edited/updated, thus here below.

    // step111: see the next steps in index.js file now there.
    timestamps: true
}
);

// step66: lets now hash/encrypt the password before saving it to the database, thus here below.

// step67: we will use the "pre" middleware of mongoose that allows us to run some code before saving the document to the database, using the "save" method below ; and so it will run the function we wrote below, before saving the document to the database, thus here below.
userSchema.pre("save", async function(next){

    // step68: this → refers to the current user document being saved ; First check if password is being changed by the user or not ; if user is not changing password anytime after creating an account, then no need to hash his password again as it woul be waste of time obviously ; so here : this.isModified("password") → checks if the password was changed ; return next() tells to continue saving the document without modifying the password ; thus : This prevents re-hashing an already hashed password when updating other fields, thus here below.
    if(!this.isModified("password")){
        return next();
    }

    // step69: now : bcrypt.genSalt(10) → generates a salt for hashing the password ; A salt is extra random data added to your password before hashing -- it prevent attackers from using precomputed tables (rainbow tables) to guess passwords ; example: password"123456" , salt ="a1b2c3d4" ; hashing produces something like : "hash("mypassword" + "a1b2c3d4")" and produces something like 5f4dcc3b5aa765d61d8327deb882cf99 ; thus benefit of this is that since "salt" produced is random "10" strength salt everytime, so : Even if two users have the same password, each will have different salts, so their hashes look different ; So : we choose a number "10" in it , which is the strength of password ; more its value more secure the password , but increases time taken o hash too ; so 10 is a very balanced and secure strength to be used, thus here below.
    const salt = await bcrypt.genSalt(10);    

    // step70: this → refers to the current user document being saved ; so below we replace the current password with the hashed password using the generated salt from the "bcryptjs" package thus here below.
    this.password = await bcrypt.hash(this.password, salt);

    // step71: now this "next()" tells that : I’m done with the pre-save work, now continue saving the document ; so : when we wrote the code : "const user = new User({username, email, password}); and after that : await user.save() > so this "pre("save")" middleware runs before this save() i.e. it encrypts the password before saving the data to the database ; and when "next()" runs in this middleware , it tells all good ; now tells Mongoose to finish the save there, thus here below.

    // step72: see the next steps in step73.txt file now there.
    next();
})

// step90: now lets make a function to compare passwords here below ; that will help during LOGIN there, thus here below.

// step91: This allows us to add custom functions (methods) to the Mongoose model ; So any user document created using this schema will have access to these methods, thus here below.

// step92: then we have the name of function as "comparePassword" which takes the password that the user typed in the login form as input parameter in it, thus here below.
userSchema.methods.comparePassword = async function(userPassword){
    // step93: now we had used "bcryptjs" to save the password in the database by hashing, so we will use it again to decrypt it correctly and compare the password, thus here below.

    // step94: so we compare the password sent by user from login page with the password in the "user" document represented by "this" below ; "this" refers to the current user document stored in the database that has same email entered by user in login page , and then compares with his saved password in database ; to tell if password entered by user is correct or not ; thus here below.

    // step95: it returns boolean value i.e. returns "true" if password entered by user is correct and "false" if not ; thus here below.

    // step96: see the next steps in authRoutes.js file now there.
    return await bcrypt.compare(userPassword, this.password);
}

// step28: now based on the above schema, lets create a model now here below.

// step29: A model is based upon a particular schema ; it is the object that we use to interact with the database ; like here with the User object we can "insert, create, find, update, delete" the data in the database ; so basically : "model" is the Actual tool used to interact with database.

// step30: By convention in mongoose ; Model names always start with Capital Letter.

// step31: Mongoose automatically converts the model name to a plural and lowercase name for the actual MongoDB collection ; so in database , the collection name will be "users" thus here below ; and in that collection, each document will be of the form of the "userSchema" created above, thus here below.

// step32: so if the name mentioned below was "Animal" ; then the collection name will be "animals" and each document will be of the form of the "animalSchema" created above, thus here below.

// step33: so overall the below line : creates a User Model based on the userSchema, which will be stored in the database under the users collection, thus here below.
const User = mongoose.model("User", userSchema);

// step34: now lets export this User model so that it can be used in other files ; and now we will be using it in toher files whenever we will want to interact with the User model, thus here below.

// step35: see the next steps in step36.txt file now there.
export default User