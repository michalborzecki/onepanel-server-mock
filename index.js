const express = require('express');
const path = require('path');

const app = express();

const guiStaticPath = path.join(__dirname, 'gui_static');

app.use('/', express.static(guiStaticPath));

app.listen(9443, () => console.log('Onepanel server mock listening on port 9443.'));
