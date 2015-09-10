var mongoose = require('mongoose');
var Promise = require("bluebird");
var _ = require('underscore-node');

var UserSchema = new mongoose.Schema({
  creationDate: {type:Date, default: Date.now},
  fbId: String
});

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
