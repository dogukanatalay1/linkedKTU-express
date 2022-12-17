const ApiError = require('../../scripts/responses/error/api-error');
const httpStatus = require('http-status');

const controlQueryResult = (array, next, msg) => {
    return new Promise(function (resolve, reject) {
        if (array[0].length === 0) {
            next(
                new ApiError(
                    msg || 'There have been an error!',
                    httpStatus.BAD_REQUEST
                )
            );
            reject();
        }

        resolve();
    });
};

module.exports = { controlQueryResult };
