var userController = require('./userController');

module.exports = function(router){

  router.post('/', userController.logUserIn);

  router.get('/', userController.getUsers);

  router.get('/:fbId', userController.getUser);

  router.get('/:fbId/fields/:fields', userController.getUserByFields);

};
