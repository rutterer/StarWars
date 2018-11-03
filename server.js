// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
// Express extends NODE HTTP objects
// express() calls the express function and gives us an application instance that we save to our app variable
// on the app object, now we can create routes such as http GET or POST requests
var app = express();
var PORT = 3000;

// =================== Sets up the Express app to handle data parsing ==================== //
// Middleware functions are functions added to the stack that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. 

// These functions are used to modify req and res objects for tasks like parsing request bodies, adding response headers, etc.

// express.urlencoded() provides middleware for automatically parsing forms with the content-type application/x-www-urlencoded and storing the result as a dictionary (object) in req.body
// The "extended" syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded. 
app.use(express.urlencoded({ extended: true }));

// This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
// A new body object containing the parsed data is populated on the request object after the middleware
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================
var characters = [
  {
    routeName: "yoda",
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000
  },
  {
    routeName: "darthmaul",
    name: "Darth Maul",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200
  },
  {
    routeName: "obiwankenobi",
    name: "Obi Wan Kenobi",
    role: "Jedi Master",
    age: 55,
    forcePoints: 1350
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
// Create a GET route for the root path
// callback function takes in a request and response object from express that we use the response object to send back HTML
app.get("/", function(req, res) {
  console.log(res)
  // Use express .sendFile method which takes the path of the file we want to serve to the client
  // The path.join() method joins all given path segments together
  // __dirname returns the path of the current application
  res.sendFile(path.join(__dirname, "view.html"));
  // res.sendFile(__dirname + "/view.html");
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

// Displays all characters
app.get("/api/characters", function(req, res) {
  return res.json(characters);
});

// Displays a single character, or returns false
app.get("/api/characters/:character", function(req, res) {
  var chosen = req.params.character;

  console.log(chosen);

  for (var i = 0; i < characters.length; i++) {
    if (chosen === characters[i].routeName) {
      return res.json(characters[i]);
    }
  }

  return res.json(false);
});

// Create New Characters - takes in JSON input
app.post("/api/characters", function(req, res) {
  // console.log(req)
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newcharacter = req.body;
  // console.log('REQ OBJECT: ', req)
  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();

  console.log(newcharacter);

  characters.push(newcharacter);

  res.json(newcharacter);
});

// Starts the server to begin listening
// =============================================================
// Bind our application to the TCP PORT to start listening
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
