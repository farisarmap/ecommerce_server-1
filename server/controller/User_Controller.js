const { User } = require('../models/index')
const { generateToken } = require('../helper/jwt')
const { comparePassword } = require('../helper/bcrypt')
// console.log('masuk login controller');

class UserController {
    static async login(req,res, next){
        // console.log('masuk login controller after login');
        try {
            const payload = {
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            }
            // console.log(req.body, "req.body");
            console.log(payload, 'payload user login');
            const user = await User.findOne({
                where: {
                    email: payload.email
                }
            })

            console.log(user, '<<< user');
            if(!user){
                res.status(401).json({
                    msg: "Invalid email/password"
                })
            } else if (!comparePassword(payload.password, user.password)){
                res.status(401).json({
                    msg: "Invalid email/password"
                })
            }
             else {
                 const access_token = generateToken({
                     id: user.id,
                     email: user.email,
                     role: user.role
                 })
                 res.status(200).json({
                     access_token
                 })
            }
        } 
        catch (err) {
            next(err)
        }
    }
    static async googleLogin(req,res,next){
        let { google_access_token } = req.body
        const client = new OAuth2Client(process.env.CLIENT_ID)
        let email = ''
   
        client.verifyIdToken({
            idToken: google_access_token,
            audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
         
        }).then(ticket => {
            const payload = ticket.getPayload();
            email = payload.email
            console.log(payload, "<<< ini payload dari data google");
            return User.findOne({
                where: { email }
            })
        
        }).then(user => {
            if (user) {
           
                return user
            } else {
                let objUser = {
                    email, 
                    password: "random"
                }
                return User.create(objUser)
            }
        })
            .then(dataUser => {
                let access_token = signToken({ id: dataUser.id, email: dataUser.email })
                return res.status(200).json(access_token)
            })
            .catch(err => {
                next(err);
            })
    }
}

module.exports = UserController