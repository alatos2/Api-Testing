import express from "express";
import User from "../controllers/userController";
// import users_signup from "../models/Users";
// import uuid from "uuid";
// import { request } from "http";

const router = express.Router();


//get all users
router.get("/users", (req, res) => {
    res.json(users_signup);
});

//get a single user
router.get("/users/:id", (req, res) => {
    const found = users_signup.some(user_signup => user_signup.id === parseInt(req.params.id));

    if(found){
        res.json(users_signup.filter(user_signup=>user_signup.id === parseInt(req.params.id)))
    } else {
        res.status(400).json(
            {
                msg: `user with the id ${req.params.id} does not exist`
            }
        );
    }
});

//create user
router.post("/auth/signup", User.signup);

//user signin
router.post("/auth/signin", User.signin);

//create user account
router.post("/accounts", User.createAccount);

// router.post("/auth/signup", (req, res) => {
//     const newUser = {
//         id: uuid.v4(),
//         email: req.body.email,
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         type: "client",
//         status: "active",
//         token: "45erkjherht45495783"
//     }

//     if(!newUser.firstName || !newUser.email){
//         return res.status(400).json({msg:"Please include name and email"});
//     }

//     users_signup.push(newUser);
//     res.json(users_signup);
// })

export default router;