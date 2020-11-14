const {User} = require('../models/index')

async function authorization(req, res, next) {
    console.log('authorize');
    try {
        const user = await User.findByPk(req.loggedInUser.id)
        console.log(user, '<<< user Authorize');
        if(user.role === 'Admin') {
            next()
        } else {
            throw{name: "Not Authorize", status: 401}
        }
    }
    catch (err) {
        next(err)
    }
}

module.exports = authorization