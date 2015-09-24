var mongoose = require('mongoose');
var Promise = require("bluebird");
var _ = require('underscore-node');

// setup User schema to store user information in mongoDB
var UserSchema = new mongoose.Schema({
  creationDate: {type:Date, default: Date.now},
  fbId: String
});

// create new schema key based on user information retrieved from facebook
UserSchema.statics.parseUserData = function(userData){
  var schemaTypePairs = {};
  _.each(userData, function(val, key, userData){
    if(! this.schema.path(key)){
      schemaTypePairs[key] = typeof val === 'object' ? mongoose.Schema.Types.Mixed : typeof val;
    }
  }, this);
  this.schema.add(schemaTypePairs);
};

module.exports = mongoose.model('User', UserSchema);

// leave extra line at end
