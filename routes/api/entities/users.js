var router = require('express').Router();
var users = require('../../../app/controllers/users');
var currentUser = require('../../../middleware/currentUser');

/* ***********************/
/* M I D D L E W A R E
/* ***********************/

// Set current user in locals
router.use('/:id', currentUser);


/* ***********************/
/* C O N T R O L L E R S
/* ***********************/

router.get('/', users.query);
router.get('/:id', users.get);
router.post('/', users.create);
router.put('/:id', users.create);
router.delete('/:id', users.delete);


module.exports = router;
