// step133: lets first import "v2" from cloudinary, which we rename as "cloudinary" to look readable as cloudinary.config instead of v2.config that looks even more confusing now there.

import {v2 as cloudinary} from "cloudinary"

// step135: to use variables from .env file, we need to impoer tdotenv file and use its config method, thus here below.
import dotenv from "dotenv"
dotenv.config();

// step134: cloudinary.config() is used to set your Cloudinary account credentials so that your server knows which Cloudinary account to upload files to ; It connects your server to your Cloudinary account ; Without this configuration, Cloudinary won’t know who you are, so uploads will fail ; It stores the secret keys in memory so the SDK (Software Development Kit) can use them whenever you call thos e methods using cloudinary, like : cloudinary.uploader.upload(), cloudinary.api.delete_resources(), etc ;  thus in simple words : cloudinary.config() = Login to your Cloudinary account from your backend code, thus here.
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// step136: now lets export this cloudinary file now, so that we can use it in other different files now there, thus here below.

// step137: so now using this object, we can upload images to cloudinary and can even delete them, thus here below.

// step138: see the next steps in bookRoutes.js file now there.
export default cloudinary