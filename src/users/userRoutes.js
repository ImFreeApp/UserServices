var userController = require('./userController');

module.exports = function(router){

  // setup post and get request routes to methods inside userController
  router.get('/', userController.getUsers);
  router.post('/', userController.logUserIn);
  router.get('/:fbId', userController.getUser);
  router.get('/:fbId/fields/:fields', userController.getUserByFields);
  router.post('/chatGetUserInfo', userController.chatGetUserInfo);
  router.post('/chatGetUsersInfo', userController.chatGetUsersInfo);

};
