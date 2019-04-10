import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import moment from "moment";
import dotenv from "dotenv";
import uuid from "uuid";

const salt = bcrypt.genSaltSync(10);
const secret = "alive";

dotenv.config();

class UserController{
    static signup(req, res){
        const newUser = {
            id: uuid.v4(),
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            // password: bcrypt.hashSync(req.body.password, salt),
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            type: 'user',
            registered: moment().format(),
            isAdmin: false
          }

        if(!newUser.firstname){
            return res.status(400).json({
                status: 400,
                msg:"First name is required"
            });
        }

        if(!newUser.lastname){
            return res.status(400).json({
                status: 400,
                msg:"Last name is required"
            });
        }
        
        if(!newUser.email){
            return res.status(400).json({
                status: 400,
                msg:"Email is required"
            });
        }
                
        if(!newUser.password){
            return res.status(400).json({
                status: 400,
                msg:"Password is required"
            });
        }
        
        if (newUser.password !== newUser.confirmPassword) {
            return res.status(400).json({
              status: 400,
              msg: 'Passwords do not match',
            });
          }

        const token = jwt.sign({
            id: newUser.id,
            email: newUser.email,
            isAdmin: newUser.isAdmin
        }, secret);

       res.status(200).json({
           status:200,
           data:{
               token,
               id: newUser.id,
               firstname: newUser.firstname,
               lastName: newUser.lastname,
               email: newUser.email
           }
       });
    };

    static signin(req, res) {
        const user = {
            id: uuid.v4(),
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            // password: bcrypt.hashSync(req.body.password, salt),
            password: req.body.password
        }

        if(!user.email){
            res.status(400).json({
                status: 400,
                msg: "Email is required"
            })
        } else if(!user.password){
            res.status(400).json({
                status: 400,
                msg: "Password is required"
            })
        } else {
            const token = jwt.sign({
                id: user.id
                // email: user.email,
                // isAdmin: newUser.isAdmin
            }, secret);

        res.status(200).json({
            status:200,
            data:{
                token,
                id: user.id,
                firstname: user.firstname,
                lastName: user.lastname,
                email: user.email
                
                }
            });
        }
    };

    static createAccount(req, res){
        const newAccount = {
            id: uuid.v4(),
            accountNumber: req.body.accountNumber,
            createdOn: moment().format(),
            owner: req.body.owner,
            type: req.body.type,
            
        }
    }
}

export default UserController;