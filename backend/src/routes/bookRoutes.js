import express from "express";
import cloudinary from "../lib/cloudinary.js";
import Book from "../models/Book.js";
import protectRoute from "../middleware/auth.middleware.js";

// step128: now lets create a router ; which helps to maintain all the authentication routes in one place now here below. 
const router = express.Router();

// step129: lets have the route to send a POST request to "/api/books/" endpoint ; so since in index.js file we already have the "/api/books" there ; so just put a "/" now here below and it will make the call the endpoint "/api/books/" now.

// step153: so lets add a "middleware" here in between, that will check if the user is authenticated or not, and then only allow to run this function there now, thus here below.

// step154: see the next steps now in auth.middleware.js file now there ; and there, we can just name by .js , .middleware.js is not an extension ; but it is supported by react, so we put it there & it looks even cool as when we look at the filename there, it tells us now there ; that the file is a middleware and its related to authentication, thus here below.
router.post("/", protectRoute, async (req, res)=> {
    // step130: now when we create a book post, we will be uploading the image of the book on the "cloudinary" and then getting the image url from there ; so now we will be using the "req.body" to store the image url now here below.

    // step131: see the next steps in step132.txt file now there.
    try {
        // step139: lets get the details from the request body now here below, i.e. the data sent by the user, thus here below.
        const {title, caption, image, rating} = req.body; 

        // step140: lets first have the check if any of the fields is empty or not, thus here below.
        if(!title || !caption || !image || !rating){
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            })
        }
        
        // step141: now lets try to save the image to the cloudinay now here below, thus here below.

        // step142: Cloudinary SDK gives you functions like: cloudinary.uploader.upload(), cloudinary.api.delete_resources(), etc ; so this "cloudinary.uploader.upload()" is used to upload the image to the cloudinary now here below ; and send back the response in the variable, thus here below.
        const uploadResponse = await cloudinary.uploader.upload(image);

        // step143: now lets get the image url from cloudinary of the uploaded image on cloudinary here below ; uploadResponse is the object returned by Cloudinary after uploading an image ; secure_url is the HTTPS link to the uploaded image on Cloudinary ; so By doing this code here below, we are extracting that URL and storing it in imageUrl, thus here below.

        // step144: so now : After uploading the image, imageUrl now holds the public link we can use in your app or save to your database, thus here below.

        // step145: so this line gives us the secure url of the uploaded image to cloudonary, thus here below.
        const imageUrl = uploadResponse.secure_url;

        // step146: now lets store this url to the database, thus here below.

        // step147: lets create a new document in the Book model and there too inside the "books" collection ; that gets named as "books" i.e. plural form by mongoose there on mongodb.com, thus here below.
        const newBook = new Book({
            // step148: so lets add all these fields in the database from, thus here below.
            title: title,
            caption: caption,
            rating: rating,
            image: imageUrl,

            // step174: since we saw in protectRoute middleware that user is authenticated there and the user from database is saved and sent in "req" object ; so we can access its details using the "req" now thus here below.

            // step175: so lets get the owner of book's id from user saved in req.user ; as by rule this user came from database and in database every document's id is given using "_id" thus here below.
            user: req.user._id
        })

        // step149: now lest save this object to the database, using the "save()" method, thus here below.
        await newBook.save();

        // step150: finally, lets send back a response with the whole object that we created, thus here below.

        // step151: see the next steps in step152.txt file now there.
        res.status(201).json(newBook);
    } 
    catch (error) {
        console.log("Error in creating a new book", error);
        res.status(500).json({ // 500 error code means internal server error
            success: false,
            message: `Error in creating a new book due to some internal server error ${error.message}`
        })
    }
})

// step176: now lets make a endpoint to fetch all the books, thus here below.

// step177: so since we have these routes prefixed by "/api/books" in "index.js" file, so we can use "/api/books/" endpoint now here below to get a;; the books details and all these will be protected too using the protectRoute middleware, thus here below.
router.get("/", protectRoute, async (req, res)=> {
    try{

        // step184: now for this : "const response = await fetch("http://localhost:3000/api/books?page=1&limit=5");" that we saw in step183.txt file now there ; lets get the queries for "page" and "limit" now here below.

        // step185: so "req.query" is the object containing all the queries sent in the URL of the request by the user ; so if user requested at : "/api/books?page=3&limit=10" > then "req.query" will be : {page: 3, limit: 10} ; thus here below ; so we access the page and limit into the variables thus here below.

        // step186: if due to some reasons its undefiend, we dont want our server to crash, so lets set the page and limit to 1 and 5 by default value of them, thus here below.
        const page = req.query.page || 1;
        const limit = req.query.limit || 5;

        // step186: now : this below is the key formula for pagination in databases ; (page - 1) → calculates how many full pages we’ve already passed ; * limit → multiplies by how many items per page to find how many documents to skip ; in short it means : "Skip all items from the previous pages."

        // step187: Suppose your books collection has 20 books ; so -

        /* Page: 1 -> Limit: 5 -> show books 1-5 -> skip value = (1 - 1) * 5 = 0
           Page: 2 -> Limit: 5 -> show books 6-10 -> skip value = (2 - 1) * 5 = 5
           Page: 3 -> Limit: 5 -> show books 11-15 -> skip value = (3 - 1) * 5 = 10
           Page: 4 -> Limit: 5 -> show books 16-20 -> skip value = (4 - 1) * 5 = 15
        */

        // step188: so we see that it means if we have : Book.find().skip(10).limit(5) -> it means : skips the first 10 books and shows the next 5 (books 11–15), thus here below.

        const skip = (page - 1) * limit;

        // step178: now lets get all the books from the database : no filter sused i.e. we want to get all the books field from the database of the Book model, thus here below.

        // step179: lets sort the books array containing all the books in the descending order of created at i.e. keep the most recently added books of database at top there, thus here below.
        // const books = await Book.find().sort({createdAt: -1}); // -1 means descending order

        // step189: so now we do multiple chaining of all these methods when getting the book here below.

        // step190: so we sort in descending order and then using the above syntax learnt show only 5 books at a time and as user scrolls, changes the page number, thus here below.
        const books = await Book.find()
        .sort({createdAt: -1})
        .skip(skip) // initial skip(0) means dont skip anything at start later at anytime : skip(i) means skip the previous i books as we have scrolled and dont want to show them again; so skip them and grab 5 more as limit is 5

        // so the frontend will send these new page values as it scrolls or maybe on clicking next previous button there, thus here below.
        .limit(limit)

        // step191: now when we created the Book model, we stored them as an ID there that referenced the User model, thus here below ; so that id, didn't include the username profile image and all there ; but we want to show the user name and image at top of each post too, to know who made that post there.

        // step192: so if we do Book.find() : we will get -
        /*
            {
                title: "My Book",
                user: "6712a8c09f0d77be..." // just ObjectId
            }
        */


        // step193: but if we call : .populate("user", "username profileImage") : then the Mongoose automatically looks up the related user document from the User collection that we refernecd in the Book schema there.

        // step194: now in Book schema we had -
        /*
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        
        ; so : now we use the same name "user" here in the populate syntax before (,) comma ; so it tells mongoose to : go to the User collection and find the document that has the same id as the one stored in the user field of the Book document, thus here below.
        */

        // step195: so it fetches the whole user document of the related user id , but we just want its username and profile image to be displayed in book's post ; so we make it to have here in this file only the _id, username and profile image fields in the "user": {....} thus now here below ; It will not include sensitive data like password, email, etc.

        // step196: so now the overall : Mongoose automatically goes to the users collection, finds the document whose _id = "u1", and replaces that ID inside the book with user data ; so any document of Book collection will now look like -
        /*
            {
                "_id": "b1",
                "title": "Intro to AI",
                "caption": "Learn Artificial Intelligence",
                "image": "https://cloudinary.com/ai.jpg",
                "rating": 4.5,
                "user": {
                    "_id": "u1",
                    "username": "nischay",
                    "profileImage": "https://cloudinary.com/nischay.jpg"
                }
            }
        ; so now we can directly access the related user using : "book.user.username" and "book.user.profileImage" thus here below.
        */
        .populate("user", "username profileImage")

        const totalBooks = await Book.countDocuments(); // this function counts the total number of documents in the Book collection

        // step180: then we can send back the response with all the books, thus here below ; if no status code is sent, then by default it is 200, thus here below ; and "success" is true by default, thus here below.

        // step181: that "200" status code means "everything is fine and OK", thus here below.

        // step182: see the next steps in step182.txt file now there.
        // res.send(books)

        // step197: now lets not return only the whole books array, but also the current page we are on, then the number of books we have in the database and also send the total number of pages, thus here below.
        res.send({
            books,
            currentPage: page,
            totalBooks: totalBooks,

            // step198: this formula below will give the total number of pages as we have seen we have 5 books in 1 page and we have totalBooks in total ; so we have totalBooks as "totalPages * limit" as like example : total pages are 5 and limit is 5 ; so we have total 5 * 5 = 25 books in total ; thus here below.

            // step199: so using same formula, we get the total number of pages, thus here below.
            totalPages: Math.ceil(totalBooks / limit)
        })
    }
    catch(error){
        console.log("Error in getting all the books", error);
        res.status(500).json({ // 500 error code means internal server error
            success: false,
            message: `Error in getting all the books due to some internal server error ${error.message}`
        })
    }
})

// step218: now lets create a route to get all the books published by a user, on the profile page of that user, thus here below.
router.get("/user", protectRoute, async (req, res)=> {
    try{
        // step219: so we had got the authenticated user's id in req.params from protected route middleware ; so we use that id to get all the books of that id from the database and sort in descending order to show the latest books first there in descending order of createdAt time, thus here below.
        const books = await Book.find({ user: req.user._id }).sort({ createdAt: -1 }) // -1 means descending order

        // step220: then we can send all the books we got in the response back to the client / application, thus here below.

        // step221: see the next steps in index.js file now there.
        res.json(books)
    }
    catch(error){
        console.log("Error in getting all the books", error);
        res.status(500).json({ // 500 error code means internal server error
            success: false,
            message: `Error in getting all the books due to some internal server error ${error.message}`
        })
    }
})

// step200: now lets make the route to delete a book, thus here below ; and it will also be a protected route i.e. only logged in users can delete a book, thus here below.

// step201: we will use the "id" coming as a parameter in the url, thus here below ; and we access the url parameters using ":" , thats how we access the id, thus here below.

// step202: so its a dynamic route, which takes the "id" different everytime depending on the url , like if its "/api/books/1" then "id" will be "1" , if its "/api/books/2" then "id" will be "2" , thus here below.

// step203: however req.params.id also will have the value of id passed in url , but we use ":id" in route url and to access the value inside the function like to console log it, we can do it using "req.params.id" thus here below.
router.delete("/:id", protectRoute, async (req, res)=> {
    try{
        // step204: lets find the book using this id in the database, thus here below.

        // step205: req.params stores the parameters of url ; here we had :id so req.params.id will have that ; if it was "/api/books/1" then req.params.id will be "1" thus here below.

        // step206: name can be anything though, like if it was :hello then req.params.hello will be "1" thus here below.
        const book = await Book.findById(req.params.id);

        // step207: check if the book exists or not, thus here below.
        if(!book){
            return res.status(404).json({ // 404 error code means not found
                success: false,
                message: "Book not found"
            })
        }
        
        // step208: but if book is found, we check if the logged in user making the delete request is the owner of the book or not, thus here below.

        // step209: in the "book" document, we had a field called "user" containing id of the user who made that book ; but bok.user is not a simple string its a objectid object ; so compare to string first ; To compare them properly, you must convert both to strings first else may give errors.

        // step210: then we like saw earlier ; protectedRoute stored the authenticated user's id in req.params ; and that is again objectisd so convert to string first and then compare thus here ; and thus check if user deleting book is the owner of the book or not, thus here below.
        if(book.user.toString() !== req.user._id.toString()){
            return res.status(403).json({ // 403 error code means forbidden
                success: false,
                message: "You are not authorized to delete this book"
            })
        }

        // step212: first before deleting the document from database, lets delete the image stored of that book from cloudinary, thus here below.

        // step213: so we first chcek that the image exists in cloudinary, else making cloudinary call to delete can cause error ; also we ensure that the url of image has "cloudinary" term in it like : "https://cloudinary.com/....." ; else it may be some default image from other website and not of cloudinary so check that too, thus here below.
        if(book.image && book.image.includes("cloudinary")){
            try{
                // step214: first get the public id present at the very end in the cloudinary url like : https://res.cloudinary.com/de1rm4uto/image/upload/v1741568358/qyup61vejflxxw8v10.png ; thus here below.

                // step215: we split it based on "/" and get ["https", "cloudinary.com", "de1rm4uto", "image", "upload", "v1741568358", "qyup61vejflxxw8v10.png"] ; after that pop() removes and returns the last item i.e. "qyup61vejflxxw8v10.png" ; then we split it based on "." and get ["qyup61vejflxxw8v10", "png"] ; then we get the first item [0] i.e. "qyup61vejflxxw8v10" i..e the public id of image stored in cloudinary ; thus here below.
                const publicId = book.image.split("/").pop().split(".")[0];

                // step216: now we can use the below syntax to delete an image from cloudinary using this publicId we got from the link of cloudinary, thus here below ; it was because : Cloudinary stores every image using a public_id, and that’s what you need to delete a file, thus here below.
                await cloudinary.uploader.destroy(publicId);
            }
            // step217: error can be named anything, like deleteError just to make it readable like it was the error that was thrown / that came : while deleting from cloudinary, thus here below.
            catch(deleteError){
                console.log("Error in deleting image from cloudinary", deleteError);
            }
        }

        // step211: if all checks are successful, then we delete that "book" here below and send response back to the user, thus here below.
        await book.deleteOne();
        res.json({
            success: true,
            message: "Book deleted successfully!"
        })

    }
    catch(error){
        console.log("Error in deleting a book", error);
        res.status(500).json({ // 500 error code means internal server error
            success: false,
            message: `Error in deleting a book due to some internal server error ${error.message}`
        })
    }
})

export default router;