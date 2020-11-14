const { verifyToken } = require('../helper/jwt')
const { User } = require('../models/index')

async function authentication(req, res, next) {
    const { token } = req.headers
    console.log(token, "token");
    try {
        if (!token) {
            throw {
                msg: "Authentication Failed", status: 401
            }
        } else {
            const decoded = verifyToken(token)
            const user = await User.findOne({
                where: {
                    email: decoded.email
                }
            })
            if (!user) {
                throw {
                    msg: "Authentication Failed", status: 401
                }
            } else {
                req.loggedInUser = decoded
                next()
            }
        }
    }
    catch (err) {
        next(err)
    }
}


module.exports = authentication