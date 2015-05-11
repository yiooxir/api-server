/* provide objects to test
// help: 1-read, 2-write, 3-create, 4-delete
 * users:
 *  user1:
 *  user2:
 *
 *  Team1: #user1=superuser; #user2=user
 *      Project1
 *
 *  Team2: #user1=user; #user2 has no rights
 *      Project2
 *      Project3
 *
 *  Project1 #user1=r3 #user2=r4
 *     issue1
 *     issue2
 *
 *  Project2 #user1=r3 #user2 has no right
 *     issue3
 *     issue4
 *
 *  Project3 #user1=r1 #user2=r4
 *     issue5
 *     issue6
 * */

var db = require('../vendor/db');
var Team = require('../../app/models/team');
var Project = require('../../app/models/project');
var Issue = require('../../app/models/issue');
var async = require('async');



