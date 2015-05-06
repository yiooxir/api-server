var mongoose = require('mongoose');
var BaseSchema = require('./abstractEntity');
extend = require('mongoose-schema-extend');
var Team = require('./team');
var _ = require('underscore');


var Project = BaseSchema.extend({
    name:         {
        type: String,
        unique: true,
        required: true
    },
    team: {
        type: Object,
        required: true
    },
    issuePrefix:  {
        type: String
    }
});

/* first letters */
function strategy1(name, letters) {
    var pref = name.substring(0, letters);
    return validate(pref);
}

/* 2 first one last */
function strategy2(name) {
    var pref = name.substring(0,2) + name.substr(name.length-1);
    return validate(pref);
}

/* hash */
function strategy3() {
    var pref = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for( var i=0; i < 4; i++ )
        pref += possible.charAt(Math.floor(Math.random() * possible.length));

    return validate(pref);
}

var prefs = [];

function validate(pref) {
    pref = pref.toUpperCase();

    return prefs.indexOf(pref) == -1 ? pref : null;
}

/* generate unique issue prefix by using different strategies */
Project.pre("save", function(next) {

    var self = this;
    var Project = require('./project');

    Project.find({team: self.team}, function(err, res) {
        if (err) console.error(err);
        prefs = _.pluck(res, 'issuePrefix');
        var e;

        function setIssuePrefix(e) {
            self.issuePrefix = e;
            next();
        }

        if (e = strategy1(self.name, 2)) {
            setIssuePrefix(e);
        }
        else if (e = strategy1(self.name, 3)){
            setIssuePrefix(e);
        }
        else if (e = strategy2(self.name)) {
            setIssuePrefix(e);
        }
        else if(e = strategy3(self.name)) {
            setIssuePrefix(e);
        }
    });
});

module.exports = mongoose.model('project', Project);
