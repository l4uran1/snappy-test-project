 /**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var actionUtil = require("sails/lib/hooks/blueprints/actionUtil");
var async = require('async');
var SMTPClient = require("../services/SMTPClient.js");

module.exports = {
  getUserById: function(req, res) {
    var users = sails.config.usersList;
    var error = new Error();

    //get email configuration
    let configurationObj = SMTPClient.getEmailDataFromConfig();
    configurationObj.subject = 'Snappy test';
    configurationObj.html = "<h1>It Works</h1>";

    sails.log.debug("Getting a user data");
    _.each(users, function(user) {
        Users.findOne({
            userId: user
        }).exec(function(err, fuser) {
            if (err) {
              return res.serverError(err);
            }

            //user not found
            if (fuser === undefined) {
              console.log('This user is not found ' + user);
            }

            //print the data
            console.log('user', fuser);
            
            //send the email
            sails.log.debug("Sending an email to " + fuser.email);
            configurationObj.receiver = fuser.email;
            SMTPClient.sendEmail(configurationObj, function(error, response){
                if (error) {
                  console.log('500');
                  response.serverError(error);
                }
                console.log('200')
                response.ok();
              });

        });
    });
    res.ok();
  }
};
