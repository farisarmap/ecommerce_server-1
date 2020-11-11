async function errorHandler(err, req, res, next) {
    let status = err.status || 500
    let msg = err.message || 'Internal Server Error'

    // console.log(err, 'err.name');

    if (err.name) {
        switch (err.name) {
            case 'SequelizeValidationError':
                let errors = []
                err.errors.forEach(error => {
                    errors.push(error.message)
                })
                status = 400
                msg = errors.join(', ')
                break;
            case 'Invalid email/password' :
                msg = 'Invalid email/password'
                status = 401
                break;
            default:
                console.log('==== Error Table ====');
                console.log('This type of error is unhandled')
                console.log(err.name, '<< Error name <<')
                console.log(err)
                console.log('=====================');
                break;
        }
    }

    res.status(status).json({ message: msg })
}

module.exports = errorHandler