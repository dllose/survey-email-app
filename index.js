const express = require('express');
const app = express();

//If the ENV variable PORT isn't defined, use 8080
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
	res.send({'banjoerz': 'nioggyniog'});
}).listen(PORT);
