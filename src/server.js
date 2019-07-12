// from https://medium.com/@ryanchenkie_40935/angular-cli-deployment-host-your-angular-2-app-on-heroku-3f266f13f352
const express = require('express');
const app = express();
const ROOT = "/dist";

// Run the app by serving the static files
// in the dist directory

app.use(express.static(__dirname + ROOT));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('*', function(req, res) {
    res.sendFile('index.html', {root: __dirname + ROOT})
});

// Start the app by listening on the default
// Heroku port

app.listen(process.env.PORT || 8080);