// Create web server
// npm install --save express
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

// Tell express to use body-parser's JSON parsing
app.use(bodyParser.json());

// Tell express to serve static files from the /public folder
app.use(express.static('public'));

// Create a route for GET /comments
app.get('/comments', function (req, res) {
    // Read the comments.json file
    fs.readFile('./comments.json', function (err, data) {
        if (err) {
            // If there was an error, send the error
            res.status(500).send(err);
        } else {
            // Otherwise send the data
            res.send(data.toString());
        }
    });
});

// Create a route for POST /comments
app.post('/comments', function (req, res) {
    // Read the comments.json file
    fs.readFile('./comments.json', function (err, data) {
        if (err) {
            // If there was an error, send the error
            res.status(500).send(err);
        } else {
            // Otherwise parse the file contents to JSON
            var comments = JSON.parse(data.toString());
            // Add the new comment to the array
            comments.push(req.body);
            // Write the comments back to the file
            fs.writeFile('./comments.json', JSON.stringify(comments), function (err) {
                if (err) {
                    // If there was an error, send the error
                    res.status(500).send(err);
                } else {
                    // Otherwise send a success status code
                    res.sendStatus(200);
                }
            });
        }
    });
});

// Start the web server on port 3000
app.listen(3000, function () {
    console.log('Web Server listening on port 3000');
});