var User = require('./userModel');
var _ = require('underscore-node');

module.exports = {
  logUserIn: function(req, res, next){
    var token = req.body.token,
        userData = req.body.userData;

    if (!userData || !token) {
      res.sendStatus(400);
      return;
    }

    User.findOne({ fbId: userData.id })
      .then(function(user){
        if(user){
          // retrieved existing user
          res.status(200).send(user.fbId);
          next(user)
        }else{
          // expand schema
          var userDataFormatted = _.extend(_.omit(userData, 'id'), {
            token: token,
            fbId: userData.id
          });

          User.parseUserData(userDataFormatted);

          // create new user
          new User(userDataFormatted).save()
            .then(function(newUser){
              res.status(201).send(newUser.fbId);
              next(newUser);
            });
        }
      }.bind(this)).catch(function(err){
        res.status(500).send(err);
        next(err)
      });
  },

  getUser: function(req, res, next){
    var fbId = req.params.fbId;

    User.findOne({ fbId: fbId })
      .then(function(user){
        res.status(200).send(user);
        next(user);
      });
  },

  getUserByFields: function(req, res, next){
    var fbId = req.params.fbId;
    var fields = req.params.fields.split(',');

    User.findOne({ fbId: fbId })
      .then(function(user){
        var userFiltered = _.pick(user._doc, fields);
        res.status(200).send(userFiltered);
        next(userFiltered);
      });
  },

};
