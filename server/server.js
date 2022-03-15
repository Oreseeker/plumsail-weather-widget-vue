const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');

const app = express();

const sitePath = path.join(__dirname, 'dist');

app.use(serveStatic(sitePath));

const port = process.env.PORT || 3000;
app.listen(port);