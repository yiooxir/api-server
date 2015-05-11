var issue = require('../app/models/issue');
var db = require('./vendor/db');
var utils = require('../app/utils');

var issue1 = null;

describe('utils', function() {
    before(function(done) {
        new issue({name: 'issue1'}).save(function(err, res) {
            if (err) console.error(err);
            issue1 = res;
            done()
        });
    });

    describe('#toId', function() {
        it('should be string', function() {
            utils.toId(issue1).should.be.equal(issue1._id.toString());
            utils.toId(issue1._id).should.be.equal(issue1._id.toString());
            utils.toId(issue1._id.toString()).should.be.equal(issue1._id.toString());
        })
    })
});

