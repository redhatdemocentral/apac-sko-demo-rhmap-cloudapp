var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var request = require('request');

function fisRoute() {
  var fis = new express.Router();
  fis.use(cors());
  fis.use(bodyParser());

  fis.get('/', function(req, res) {
    console.log(req);
  });

  // POST REST endpoint - note we use 'body-parser' middleware above to parse the request body in this route.
  // This can also be added in application.js
  // See: https://github.com/senchalabs/connect#middleware for a list of Express 4 middleware
  fis.post('/', function(req, res) {
   console.log("fis POST: " + JSON.stringify(req.body));

// var url='http://fuse-forum-prod.cloudapps.forum.rhtechofficelatam.com/rest/book';
var url=process.env.FUSE_URL || 'http://fusetravelagency-apac-destinasia-travel.192.168.223.196.xip.io/rest/book';
//------------------------

   console.log("URL: "+url);

   //this is for actual SKO demo, not required for normal demo
   // var dashboard_url=process.env.DASHBOARD_URL || "http://socket-rest-wohshon.44fs.preview.openshiftapps.com/events";
   // var dashboard_url=process.env.DASHBOARD_URL || "http://192.168.223.130:8081/events";
    //var dashboard_url="http://socket-wohshon.44fs.preview.openshiftapps.com/events";
    //var dashboard_url=process.env.DASHBOARD_URL || "http://socket-dashboard.cloudapps.forum.rhtechofficelatam.com/events";
/**
   console.log("DASHBOARD URL: "+dashboard_url);
    request({
      json : true,
      method: 'POST',
      url : dashboard_url,
      //body: '{"name":"'+display+'","age":123}',
      body: req.body.bookReq,
      headers : {

        'Content-Type' : 'application/json'
      }
    }, function(err, response, body){
      if (err || !body){
        console.log(res.status());
        return res.status(500).json(err || "error");
      }

      console.log(body);
    });

**/

//-------------------------

  console.log("+++++++++++++++++");
  console.log(req.body.bookReq);
  console.log("+++++++++++++++++");


  request.post({
    url:url,
    json:req.body.bookReq
  },function(error, response, body){
    if(error) {
        console.log("FIS ERROR: " + error);
    } else {
        console.log(response.statusCode, body);
        res.json(body);
}
});

  });

  return fis;
}

module.exports = fisRoute;
