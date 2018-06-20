var assert = require('assert');
var users = [];
var request = require('supertest');
var should = require('should');

describe('UsersController', function() {

    before(function (done) {
        done(null, sails);
    });
    it("should get users and send the emails", function(callback) {
        request(sails.hooks.http.app)
        .get("/users")
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return callback(err);
          }
          should.exist(res.body);
          callback();
        });
  });
});