var express = require('express');
var teams = require('../../app/controllers/teams');
var currenTeam = require('../../middleware/currentTeam');
var entities = require('./entities');
var router = express.Router();

/* ***********************/
/* M I D D L E W A R E
/* ***********************/

// Set current team in locals
router.use('/:id', currenTeam);


/* ***********************/
/* E N T Y T Y
/* ***********************/

/* entity route entry point */
router.use('/:id', entities);


/* ***********************/
/* C O N T R O L L E R S
/* ***********************/

// Get all teams
router.get('/', teams.query);
// Get team by id
router.get('/:id', teams.get);
// Create team
router.post('/', teams.create);
// Update team by id
router.put('/:id', teams.update);
// Remove team by id
router.delete('/:id', teams.delete);

module.exports = router;
