var db = require('./vendor/db');
var User = require('../app/models/user');
var Team = require('../app/models/team');
var async = require('async');



describe('User model', function() {
    before(function(done) {
        db.clear(function(err) {
            if (err) throw new Error('clear db error');
            done();
        });
    });

    describe('#create()', function() {

        it('should create a new user', function(done) {
            new User({username: 'testName',password: '123456'}).save(function(err, user) {
                user.should.have.property('username', 'testName');
                done();
            });
        });

        it('username is unique. should raise the error', function(done) {
            //user = new User({username: '',password: '123456'});
            new User({username: 'testName',password: '123456'}).save(function(err, user) {
                err.should.has.not.null;
                done()
            })
        });

        it('username is empty. should raise the error', function(done) {
            new User({username: '',password: '123456'}).save(function(err) {
                err.should.has.not.null;
                done()
            })
        });

        it('password is empty. should raise the error', function(done) {
            new User({username: 'test',password: ''}).save(function(err, user) {
                err.should.has.not.null;
                done()
            })
        })
    });

    describe('User methods ', function() {

        //set test data
        var user, team1, team2;

        before(function(done) {
            async.waterfall([
                function(callback) {
                    new User({username: 'testUser', password: '123123'}).save(callback)
                },
                function(_user, num, callback) {
                    user = _user;
                    return new Team({name: 'testTeamName'}).save(callback)
                },
                function(_team, num, callback) {
                    team1 = _team;
                    return new Team({name: 'testTeamName2'}).save(callback)
                },
                function(_team, num, callback) {
                    team2 = _team;
                    return callback()
                }
            ], function(err) {
                if (err) throw new Error(err);
                done()
            });
        });


        describe('#addToTeam()', function() {
            it('should has method addToTeam', function() {
                user.should.has.property('shareTeam');
            });
            it('should add user to the team', function(done) {
                user.shareTeam({teamId: team1._id}, function(res) {
                    user.teams[0].should.have.properties({
                        superuser: false,
                        username: 'testUser',
                        teamId: team1._id.toString()
                    });
                    done()
                });
            });

            it('should change existing team rights of user to the superuser && username to the teamUserName', function(done) {
               user.shareTeam({
                   teamId: team1._id,
                   username: 'teamUserName',
                   superuser: true
               }, function(err, res) {
                   user.teams.length.should.be.equal(1);
                   user.teams[0].should.have.properties({
                       superuser: true,
                       username: 'teamUserName',
                       teamId: team1._id.toString()
                   });
                   done()
               })
            });

            it('should share new team for current user', function(done) {
                user.shareTeam({
                    teamId: team2._id.toString()
                }, function(err, res) {
                    user.teams.length.should.be.equal(2);
                    user.teams[1].should.have.properties({
                        teamId: team2._id.toString()
                    });
                    done()
                });
            })
        });

        describe('#unshareTeam()', function() {
            it('should remove team from shared teams (user.teams)', function(done) {
                user.unshareTeam(team2._id, function(err, res) {
                    user.teams.length.should.be.equal(1);
                    done();
                })
            })
        })

    })
});

