const uuid = require('uuid/v4');

function SessionController(state) {
  this.state = state;
}

SessionController.prototype.createSession = function(req, res) {
  // one day
  const cookieMaxAge = 1000 * 3600 * 24;
  const authHeader = req.get('Authorization') || '';
  const authString = authHeader.split(' ')[1] || '';
  const decodedAuthString = Buffer.from(authString, 'base64').toString().split(':');
  let unauthorized = false;
  if (decodedAuthString.length !== 2) {
    unauthorized = true;
  } else {
    const [username, password] = decodedAuthString;
    const user = this.state.users.filter(u => u.username === username)[0];
    if (user && user.password === password) {
      const session = {
        id: uuid(),
        userId: user.id,
        expires: new Date(Date.now() + cookieMaxAge),
      }
      this.state.sessions.push(session);
      res.cookie(
        'sessionId',
        session.id,
        {
          expires: session.expires,
          httpOnly: true,
        }
      );
    } else {
      unauthorized = true;
    }
  }
  if (unauthorized) {
    res.sendStatus(401);
  }
  res.end();
}

SessionController.prototype.getSession = function(req, res) {
  const cookieSessionId = req.cookies.sessionId;
  const session = this.state.sessions.filter(s => s.id === cookieSessionId)[0];
  let notFound = false;
  if (!session) {
    notFound = true;
  } else {
    const user = this.state.users.filter(u => u.id === session.userId)[0];
    if (!user) {
      notFound = true;
    } else {
      res.json({
        sessionId: session.id,
        username: user.username,
      });
    }
  }
  if (notFound) {
    res.sendStatus(404);
  }
  res.end();
}

module.exports = SessionController;
