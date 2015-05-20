var db = require('./vendor/db');
var async = require('async');
var lApi = require('../app/services/lowApi');
var Team = require('../app/models/team');
var Project = require('../app/models/project');
var Issue = require('../app/models/issue');
var User = require('../app/models/user');
var should = require('should');
var utils = require('../app/utils');
var toId = utils.toId;


var mock = {
    user1: function() {return new User({username: 'user1', password: '123'}).save},
    user2: function() {return new User({username: 'user2', password: '123'}).save},
    team1: function() {return new Team({name: 'team1'}).save},
    team2: function() {return new Team({name: 'team2'}).save},
    project1: function() {return new Project({name: 'proj1', team: mock.team1._id}).save},
    project2: function() {return new Project({name: 'proj2', team: mock.team1._id}).save},
    issue1: function() {return new Issue({name: 'issue1', team: mock.team1._id, _parent: mock.project1._id}).save},
    issue2: function() {return new Issue({name: 'issue2', project: mock.team1._id}).save}
};

describe('low API', function() {
    before(function(done) {
        db.clear(function(err) {
            if (err) throw new Error('clear db error');

            async.eachSeries(Object.keys(mock), function(m, cb) {
                mock[m]()(function(err, res) {
                    if (err) console.error(err);
                    mock[m] = res;
                    cb();
                })
            }, done);
        });
    });

    describe('#isSuperuser()', function() {
        before(function(done) {
            async.parallel([
                function(callback) {
                    mock.user1.shareTeam({teamId: mock.team1._id, superuser: true, username: 'userSpec1'}, callback)
                },
                function(callback) {
                    mock.user2.shareTeam({teamId: mock.team1._id, superuser: false, username: 'userSpec2'}, callback)
                }
            ], done);

        });

        it('should be a superuser', function(done) {
            lApi.isSuperuser(mock.user1, mock.team1, function(err, res) {
                if (err) console.error(err);
                res.should.be.true;
                done()
            })
        });

        it('should not be a superuser', function(done) {
            lApi.isSuperuser(mock.user2, mock.team1, function(err, res) {
                if (err) console.error(err);
                res.should.be.false;
                done()
            })
        });

        it('should not be a superuser', function(done) {
            lApi.isSuperuser(mock.user1, mock.team2, function(err, res) {
                if (err) console.log(err);
                should(res).be.undefined;
                done()
            })
        })
    });

    describe('#getTeamName()', function() {
        before(function(done) {
            async.parallel([
                function(callback) {
                    mock.user1.shareTeam({teamId: mock.team1._id, superuser: true, username: 'userSpec1'}, callback)
                },
                function(callback) {
                    mock.user2.shareTeam({teamId: mock.team1._id, superuser: false, username: 'userSpec2'}, callback)
                }
            ], done);

        });

        it('username should be a userSpec1', function(done) {
            lApi.getTeamName(mock.user1, mock.team1, function(err, res) {
                if (err) console.error(err);
                res.should.be.equal('userSpec1');
                done()
            })
        });

        it('username should not be a userSpec2', function(done) {
            lApi.getTeamName(mock.user2, mock.team1, function(err, res) {
                if (err) console.error(err);
                res.should.be.equal('userSpec2');
                done()
            })
        });

        it('username should not be an undefined', function(done) {
            lApi.getTeamName(mock.user1, mock.team2, function(err, res) {
                if (err) console.log(err);
                should(res).be.undefined;
                done()
            })
        })
    });

    describe('#setRule', function() {

        it('should add new rule', function(done) {
            var rule = utils.blanks.rightRuleObject;
            rule.entity = 'issue';
            rule.field = '_parent';
            rule.value = toId(mock.project1);
            rule.right = 1;

            lApi.setRule(mock.user1, rule, function(err, res) {
                if (err) console.error(err);
                mock.user1.rights.length.should.be.equal(1);
                mock.user1.rights[0].should.have.properties(rule);
                done()
            })
        });

        it('try to delete not an existing rule. it should be return -1 (not found)', function(done) {
            var ruleId = mock.user1.rights[0].id;

            lApi.deleteRule(mock.user2, ruleId, function(err, res) {
                res.should.be.equal(-1);
                done()
            })
        });

        it('try to delete existing rule. it should be return 0', function(done) {
            var ruleId = mock.user1.rights[0].id;

            lApi.deleteRule(mock.user1, ruleId, function(err, res) {
                res.should.be.equal(0);
                done()
            })
        });
    });

    describe('#getObjectRights', function() {
        /* share */
        before(function(done) {
            var rule = utils.blanks.rightRuleObject;
            rule.entity = 'issue';
            rule.field = '_parent';
            rule.value = toId(mock.project1);
            rule.right = 1;

            lApi.setRule(mock.user1, rule, done)
        });

        it('should has rights', function(done) {
           lApi.getObjectRights(mock.user1, mock.issue1, function(err, res) {
               if (err) console.error(err);
               //console.log(111111111, res);
               done()
           })
        })
    })
});

