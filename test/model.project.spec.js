var db = require('./vendor/db');
var Project = require('../app/models/project');
var Team = require('../app/models/team');
var async = require('async');



describe('project model', function() {

    var team;

    before(function(done) {
        async.waterfall([
            function (callback) {
                return db.clear(callback);
            },
            function (callback) {
                return new Team({name: 'testTeam'}).save(callback);
            },
            function (res, n, callback) {
                team = res;
                callback()
            }
        ], done);
    });

    describe('#create()', function() {
        it("should create new project named 'test project' with issuePrefix = 'TE'. (first strategy)", function(done) {

            new Project({name: 'test project', team: team._id}).save(function(err, res) {
                if (err) console.error(err);
                res.should.have.property('issuePrefix', 'TE');
                done();
            })
        });

        it("should create new project named 'test project 2' with issuePrefix = 'TES'. (first strategy)", function(done) {

            new Project({name: 'test project 2', team: team._id}).save(function(err, res) {
                if (err) console.error(err);
                res.should.have.property('issuePrefix', 'TES');
                done();
            })
        });

        it("should create new project named 'test project 3' with issuePrefix = 'TE3'. (strategy2)", function(done) {

            new Project({name: 'test project 3', team: team._id}).save(function(err, res) {
                if (err) console.error(err);
                res.should.have.property('issuePrefix', 'TE3');
                done();
            })
        });

        it("should create new project named 'project' with issuePrefix = 'PR'. (first strategy)", function(done) {

            new Project({name: 'project', team: team._id}).save(function(err, res) {
                if (err) console.error(err);
                res.should.have.property('issuePrefix', 'PR');
                done();
            })
        });
    })
});


