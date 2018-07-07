const uuid = require('uuid/v4');

function UsersController(state) {
  this.state = state;
  this.config = state.config.users;
}

UsersController.prototype.createUser = function(req, res) {
  const {
    username,
    password,
    userRole,
  } = req.body;
  if (
    !this.config.usernameRegex.test(username) ||
    !this.config.passwordRegex.test(password) ||
    this.config.availableRoles.indexOf(userRole) === -1
  ) {
    res.sendStatus(400);
  } else {
    const user = {
      id: uuid(),
      username,
      password,
      role: userRole,
    };
    this.state.user.push(user);
    res.sendStatus(204);
  }
}

UsersController.prototype.getUsers = function(req, res) {
  const role = req.query.role;
  let users = this.state.user;
  if (role) {
    users = users.filter(user => user.role === role);
  }
  res.json({
    usernames: users.map(user => user.username),
  });
}

module.exports = UsersController;
