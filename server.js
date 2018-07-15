const http = require('http');
const express = require('express');
const app = express();
app.use(express.static('public')); //nodejs serves front end code so that front and back are in same domain, prevents CORS issues
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const bodyParser = require("body-parser"); //allows us to use .body without errors
const request = require('request');

///
///
/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
// read below links
// fetch api 
// https://expressjs.com/en/api.html#req
// https://expressjs.com/en/api.html#res


app.use(bodyParser.urlencoded({
    extended: true
}));

const tone_analyzer = new ToneAnalyzerV3({
  username: process.env.TONE_ANALYZER_USERNAME, //
  password: process.env.TONE_ANALYZER_PASSWORD,
  version_date: process.env.TONE_ANALYZER_VERSION_DATE
});

var analyzeTone = function(text, res){
  let params = {
    tone_input: text,
    content_type: 'text/plain',
    sentences: true
  };
  tone_analyzer.tone(params, function (error, response) {
    if (error) {
      console.log(error);
      res.send(JSON.stringify(error));
    } else {
      console.log(JSON.stringify(response, null, 2));
      res.send(JSON.stringify(response));
    }
  });
};
///
/// request to NEWS API
let getNewsHandler = function(req, res){
  let url = 'https://newsapi.org/v2/top-headlines?' +
  'country=us&apiKey=' +
  process.env.NEWS_API_KEY;
  console.log("url is ", url);
 
  request( url, { json: true }, (err, response, body) => {
    if (err) { return console.log(err); }
    // console.log("body is ", body);
    res.header("Content-Type", "text/json");
    res.send(JSON.stringify(body)); //returns an object, returns JSON, able to send to client to display in UI
  });
  
}




// use code below to get data from server, news api and return javascript object
// node request and repsonse objects
var newsAnalyzeHandler = function(req, res){
  analyzeTone(req.body.text, res); //function has text and response object to send to client
  console.log(req.body.text);
}
app.post('/analyzeNewsItem', newsAnalyzeHandler ); //if post has url, call function newsAnalyzeHandler

app.get('/getNews', getNewsHandler ); 

app.listen(3000, () => console.log('App listening on port 3000'));
