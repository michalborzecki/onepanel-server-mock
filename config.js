module.exports = {
  responseDelay: 50,
  session: {
    sessionTimeout: 1000 * 3600 * 24,
    getSessionDelay: 0,
    createSessionDelay: 0,
    deleteSessionDelay: 0,
  },
  node: {
    getNodeDelay: 0,
  },
  users: {
    availableRoles: ['regular', 'admin'],
    usernameRegex: /^[a-zA-Z0-9]{4,}$/,
    passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    getUsersDelay: 0,
    createUserDelay: 0,
  }
};
