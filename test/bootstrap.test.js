var Sails = require('sails');
var dummyData = require(process.cwd() + "/test/fixtures/dummyData");
var request = require('supertest');

before(function (done) {
    process.env.NODE_ENV = 'test';
    process.env.PORT = 9999;

    Sails.lift({
        models: {
        }
    }, function (err, server) {
        sails = server;
        if (err) return done(err);

        sails.log.info('***** Starting tests... *****');
        console.log('\n');

        sails.dummyData = dummyData;

        done(null, sails);
    });
});

after(function (done) {
    sails.lower(done);
});