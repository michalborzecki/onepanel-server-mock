const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const router = require('./router');
const SessionController = require('./controllers/session');
const NodeController = require('./controllers/node');
const UsersController = require('./controllers/users');
const state = require('./states/opd');
const config = require('./config');

const app = express();
state.config = config;
const guiStaticPath = path.join(__dirname, 'gui_static');
const apiPath = '/api/v3/onepanel';

const controllers = {
  session: new SessionController(state),
  node: new NodeController(state),
  users: new UsersController(state),
};
const routerInstance = router(controllers, config);

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/', express.static(guiStaticPath));
app.use(apiPath, routerInstance);

app.listen(9443, () => console.log('Onepanel server mock listening on port 9443.'));
