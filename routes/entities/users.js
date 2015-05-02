var router = require('express').Router();
var users = require('../../app/controllers/users');


router.get('/', users.query);
router.get('/:id', users.get);
//router.post('/auth/signup', users.create);
router.put('/:id', users.create);
router.delete('/:id', users.delete);


module.exports = router;
