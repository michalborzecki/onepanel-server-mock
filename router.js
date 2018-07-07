const express = require('express');
const delay = require('express-delay');

function router(controllers, config) {
  const router = express.Router();
  router.use(delay(config.responseDelay));

  router.route('/session')
    .get(
      delay(config.session.getSessionDelay),
      (...args) => controllers.session.getSession(...args)
    )
    .post(
      delay(config.session.createSessionDelay),
      (...args) => controllers.session.createSession(...args)
    )
    .delete(
      delay(config.session.deleteSessionDelay),
      (...args) => controllers.session.deleteSession(...args)
    );
  
  router.route('/node')
    .get(
      delay(config.node.getNodeDelay),
      (...args) => controllers.node.getNode(...args)
    );
  
  router.route('/users')
    .get(
      delay(config.users.getUsersDelay),
      (...args) => controllers.users.getUsers(...args)
    )
    .post(
      delay(config.users.createUserDelay),
      (...args) => controllers.users.createUser(...args)
    );
  
  return router;
}

module.exports = router;
