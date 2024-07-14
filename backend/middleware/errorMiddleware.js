const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // To handle a specific error(CastError) with a weird msg is sometimes thrown from mongoose if u try to get the user within ObjectId that doesnt exist! 

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = "Resource not Found!";
    }

    res.status(statusCode)
        .json({
            message,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        })
}

export { notFound, errorHandler }