/**
 * Created by sergey on 06.03.15.
 */

var util = require('util');
var http = require('http');

// ошибки для выдачи посетителю
function HttpError(status, name, message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, HttpError);

    this.status = status;
    this.name = name || 'HttpError';
    this.message = message || http.STATUS_CODES[status] || "Error";
}

util.inherits(HttpError, Error);


/* HttpError
see: https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%BA%D0%BE%D0%B4%D0%BE%D0%B2_%D1%81%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D1%8F_HTTP
* ----------*/

exports.HttpError = HttpError;


/* 401 Unauthorized error
* ----------------------*/

exports.Unauthorized = function(message) {
    return new HttpError(401, 'notLoggedInError', message || "You're not logged in");
};


/* 403 Forbidden error
* --------------------*/

exports.Forbidden = function(message) {
    return new HttpError(403, 'ForbiddenError', message || 'Forbidden');
};

exports.BadToken = function(message) {
    return new HttpError(403, 'ForbiddenError', message || "You token is bad");
};


/* 404 not found error
* --------------------*/

exports.notFoundError = function(message) {
    return new HttpError(404, 'notFound', message || 'notFoundError');
};

exports.routNotFound = function() {
    return new HttpError(404, 'RouteNotFoundError', 'Unknown rout');
};


/* 422 Unprocessable Entity
* -------------------------*/

exports.notFoundError = function(message) {
    return new HttpError(422, 'UnprocessableEntity', message || 'Unprocessable entity');
};


/* 500 Internal Server Error
* --------------------------*/

exports.serverError = function(message) {
    return new HttpError(500, 'InternalServerError', message || 'Internal Server Error');
};


/* 501 Not Implemented  */
