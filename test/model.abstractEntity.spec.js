var db = require('./vendor/db');
var Team = require('../app/models/team');



describe('team model', function() {
    before(function(done) {
        db.clear(function(err) {
            if (err) throw new Error('clear db error');
            console.log('collections is cleared');
            done();
        });
    });
});


