const uuid = require('uuid/v4');

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
    const user = this.state.users.filter(u => u.username === username)[0];
    if (user && user.password === password) {
      const session = {
        id: uuid(),
        userId: user.id,
        expires: new Date(Date.now() + this.config.sessionTimeout),
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
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  }
}

SessionController.prototype.getSession = function(req, res) {
  const cookieSessionId = req.cookies.sessionId;
  const session = this.state.sessions.filter(s => s.id === cookieSessionId)[0];
  if (!session) {
    res.sendStatus(404);
  } else {
    const user = this.state.users.filter(u => u.id === session.userId)[0];
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

module.exports = SessionController;
