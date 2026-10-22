import jwt from "jsonwebtoken";
import User from "../model/user.models.js";
import HttpError from "./httpError.js";



const auth = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");


        console.log("auth header", authHeader)

        if (!authHeader) {
            next(new HttpError("auth header is required", 400));
        }

        const token = authHeader.replace("Bearer ", "");

        console.log("token", token)

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        console.log("decode", decode)

        const user = await User.findOne({
            _id: decode._id,
            "tokens.token": token,
        });

        console.log("user",user)

        if(!user)
        {
             next(new HttpError("unauthorize access", 401));
        }

        req.user=user;

        req.token = token;

        next();

        
    } catch (error) {
        next(new HttpError("authentication failed", 500));
    }
}

export default auth;