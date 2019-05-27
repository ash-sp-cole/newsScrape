var express = require("express");

var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var expressHandlebars =require("express-handlebars")
// set tools for scraping

var axios = require("axios");
var cheerio = require("cheerio");


// set up database (Models) and Port


var router = express.Router();
var PORT = 3000;


// start express
var app = express();

// set up middleware

app.use(express.static(__dirname + "/views"));

app.engine("handlebars", expressHandlebars ({
defaultLayout: "main"
}));
app.set("view engine", "handlebars")
;


app.use(bodyParser.urlencoded({
extended:false

}));

app.use(router);

// deploy link for mongo db

var db = process.env.MONGODB_URL || "mongodb://localhost/newsScrapedb";

// routes 

require("./config/routes.js")(router);





// conection to Mongo DB

mongoose.connect(db,function(error){
if (error) {
    console.log(error)
}
else {

    console.log("Connection to mongoose successful")
}

});


// ROUTES ---------------------------------------------------------------------------------------------


// get route for initial scrape

// app.get("/scrape", function(req, res) {
    
//     axios.get("https://www.nytimes.com/").then(function(response) {
    
//       var $ = cheerio.load(response.data);
  
    
//       $("article h2").each(function(i, element) {
//         // Save an empty result object
//         var result = {};
  
       
//         result.title = $(this)
//           .children("a")
//           .text();
//         result.link = $(this)
//           .children("a")
//           .attr("href");
  
    
//         db.Article.create(result)
//           .then(function(dbArticle) {
//             // View the added result 
//             console.log(dbArticle);
//           })
//           .catch(function(err) {
      
//             console.log(err);
//           });
//       });
  
//       // Send to the client
//       res.send("Scrape Complete");
//     });
//   });
  
// // -------

// // Route for getting all Articles from the db
// app.get("/articles", function(req, res) {

//     db.Article.find({})
//       .then(function(dbArticle) {
     
//         res.json(dbArticle);
//       })
//       .catch(function(err) {
   
//         res.json(err);
//       });
//   });

// // -------

// app.get("/articles/:id", function(req, res) {

// // route for getting article by specific ID
// db.Article.findOne({ _id: req.params.id })
// // ..and populate all of the notes associated with it
// .populate("note")
// .then(function(dbArticle) {
//   // If we were able to successfully find an Article with the given id, send it back to the client
//   res.json(dbArticle);
// })
// .catch(function(err) {
//   // If an error occurred, send it to the client
//   res.json(err);
// });

// })


// // -------


// app.post("/articles/:id", function(req,res) {

// // POST for saving article to the DB
// db.Note.create(req.body)
// .then(function(dbNote) {
//   // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
//   // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
//   // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
//   return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
// })
// .then(function(dbArticle) {
//   // If we were able to successfully update an Article, send it back to the client
//   res.json(dbArticle);
// })
// .catch(function(err) {
//   // If an error occurred, send it to the client
//   res.json(err);
// });


// })


app.listen(PORT, function() {

console.log(" ----------- NewsScrape is now listening on port:   " +  PORT + "   Enjoy ------------")

})