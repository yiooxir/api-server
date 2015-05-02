var db = require('./vendor/db');
//var should = require('should');
var Team = require('../app/models/team');



describe('team model', function() {
    before(function(done) {
        db.clear(function(err) {
            if (err) throw new Error('clear db error');
            console.log('collections is cleared');
            done();
        });
    });

    describe('should create a new team', function() {
        var team = new Team({
            name: 'testName',
            descriptions: ''
        });

        it('should ok', function(done) {
            team.save(function(err, team) {
                team.should.have.property('name', 'testName');
                done();
            });
        });
        it('unique field name. should raise the error.', function(done) {
            var team = new Team({
                name: 'testName',
                descriptions: ''
            });
            team.save(function(err) {
                err.should.not.equal(null);
                done();
            });
        })
    })
});

