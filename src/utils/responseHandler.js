const sendResponse = (res, statusCode, success, message, data, error,) => {
    return res.status(statusCode).json({
        statusCode, success, message, data, error
    })
}

export const successResponse = (res, message, data = null, statusCode = 200) =>
    sendResponse(res, statusCode, true, message, data);

export const errorResponse = (res, message, error = null, statusCode = 400) =>
    sendResponse(res, statusCode, false, message, error); 