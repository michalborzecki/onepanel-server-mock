const uuid = require('uuid/v4');

const getModel = require('../utils/getModel');

function SessionController(state) {
  this.state = state;
  this.config = state.config.session;
}

SessionController.prototype.createSession = function(req, res) {
  const authHeader = req.get('Authorization') || '';
  const authString = authHeader.split(' ')[1] || '';
  const decodedAuthString = Buffer.from(authString, 'base64').toString().split(':');
  if (decodedAuthString.length !== 2) {
    res.sendStatus(401);
  } else {
    const [username, password] = decodedAuthString;
    const user = getModel(this.state, 'user', {
      username,
      password,
    });
    if (user) {
      const session = {
        id: uuid(),
        userId: user.id,
        expires: new Date(Date.now() + this.config.sessionTimeout),
      }
      this.state.session.push(session);
      res.cookie(
        'sessionId',
        session.id,
        {
          expires: session.expires,
          httpOnly: true,
        }
      );
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  }
}

SessionController.prototype.getSession = function(req, res) {
  const cookieSessionId = req.cookies.sessionId;
  const session = getModel(this.state, 'session', cookieSessionId);
  if (!session) {
    res.sendStatus(404);
  } else {
    const user = getModel(this.state, 'user', session.userId);
    if (!user) {
      res.sendStatus(404);
    } else {
      res.json({
        sessionId: session.id,
        username: user.username,
      });
    }
  }
}

SessionController.prototype.deleteSession = function(req, res) {
  const cookieSessionId = req.cookies.sessionId;
  const session = getModel(this.state, 'session', cookieSessionId);
  this.state.session = this.state.session.filter(s => s !== session);
  res.sendStatus(204);
}

module.exports = SessionController;
