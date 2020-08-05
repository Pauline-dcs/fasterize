require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', require('./routes/index'));

const port = process.env.PORT || 3000;
const listener = app.listen(port, () => {
	console.log(`App started on : ${process.env.SITE_URL}:${port}`);
});

module.exports = app;
