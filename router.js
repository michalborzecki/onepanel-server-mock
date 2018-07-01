const express = require('express');

function router(controllers) {
  const router = express.Router();

  router.route('/session')
    .get((...args) => controllers.session.getSession(...args))
    .post((...args) => controllers.session.createSession(...args));
  
  return router;
}

module.exports = router;
