var db = require('./vendor/db');
var User = require('../app/models/user');



describe('team model', function() {
    before(function(done) {
        db.clear(function(err) {
            if (err) throw new Error('clear db error');
            console.log('collections is cleared');
            done();
        });
    });

    describe('#create()', function() {

        it('should ok', function(done) {
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
            //user = new User({username: '',password: '123456'});
            new User({username: '',password: '123456'}).save(function(err) {
                err.should.has.not.null;
                done()
            })
        });

        it('password is empty. should raise the error', function(done) {
            //user = new User({username: '',password: '123456'});
            new User({username: 'test',password: ''}).save(function(err, user) {
                console.log(err, user);
                err.should.has.not.null;
                done()
            })
        })
    })
});

