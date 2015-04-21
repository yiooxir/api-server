/**
 * Created by sergey on 02.04.15.
 */

module.exports = function(req, res, next) {
    req.user = res.locals.user = null;

    app.set('CURRENT_URL', req.protocol + '://' + req.get('host') + req.originalUrl);
    next();
    console.info('req.session.userID: ', req.session.user)
    if (!req.session.user) return next();

    User.findById(req.session.user, function(err, user) {
        if (err) return next(err);

        console.info('AUTH: user save to res.locals.user', user.username);
        req.user = res.locals.user = user;
        next();
    });
};
