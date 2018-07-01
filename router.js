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
  
  return router;
}

module.exports = router;
