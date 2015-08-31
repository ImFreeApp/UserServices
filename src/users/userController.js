var User = require('./userModel');
var _ = require('underscore-node');

module.exports = {

  // retrieves dynamic user information (such as first name and profile picture) from mongoDB for a single user, information used for conversation or messages display. 
  chatGetUserInfo: function(req, res, next) {
    var userID = req.body.userID;
    if(!userID) {
      res.sendStatus(400);
      return;
    }
    // Finds the user in database using userID as reference. then sends back response to Mobile Facade and Mobile Client
    User.findOne({ fbId: userID })
      .then(function(user) {
        if(user){
          var userObject = JSON.parse(JSON.stringify(user));
          var userFullName = userObject.name;
          var userProfileImage = userObject.picture.data.url;
          var userFirstName = userFullName.substr(0, userFullName.indexOf(' '));
          chatUserInfo = {
            firstName: userFirstName,
            userID: userID,
            profileImage: userProfileImage
          }
          res.status(200).send(chatUserInfo);
          next(user);
        } 
      }.bind(this)).catch(function(err) {
        res.status(500).send(err);
        next(err);
      });
  },  

  // retrieves dynamic user information (such as first name and profile picture) from mongoDB for multiple users, information used for conversation or messages display. 
  chatGetUsersInfo: function(req, res, next) {
    var userID = req.body.userID;
    if(!userID) {
      res.sendStatus(400);
      return;
    }
    var userInfoObject = {};
    // Finds the user in database using userID as reference. then sends back response to Mobile Facade and Mobile Client
    User.find({
        'fbId': { $in: userID}
    })
    .then(function(user) {
      for (var i = 0 ; i < user.length; i++) {
        currUser = user[i];
        var userObject = JSON.parse(JSON.stringify(currUser));
        var userFullName = userObject.name;
        var userProfileImage = userObject.picture.data.url;
        var userID = userObject.fbId;
        var userFirstName = userFullName.substr(0, userFullName.indexOf(' '));
        chatUserInfo = {
          firstName: userFirstName,
          userID: userID,
          profileImage: userProfileImage
        }
        userInfoObject[userID] = chatUserInfo;
      }
      res.status(200).send(userInfoObject);
    }.bind(this)).catch(function(err) {
          console.log('resulted in error');
          res.status(500).send(err);
          next(err);
    });
  },  

  // Saves user data retrieved from facebook upon user log in.
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
          res.status(200).send(user);
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
              res.status(201).send(newUser);
              next(newUser);
            });
        }
      }.bind(this)).catch(function(err){
        res.status(500).send(err);
        next(err)
      });
  },

  // Get a list of users from database
  getUsers: function(req, res, next){
    User.find().then(function(users){
      res.status(200).send(users);
    });
  },

  // retrieve the data for a single user
  getUser: function(req, res, next){
    var fbId = req.params.fbId;

    User.findOne({ fbId: fbId })
      .then(function(user){
        res.status(200).send(user);
        next(user);
      });
  },

  // retrieves certain attributes of user data
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

// leave extra line at end
