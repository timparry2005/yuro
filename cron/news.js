#!/bin/env node

var mongoose = require("mongoose");
var request = require("request");
var parseString = require("xml2js").parseString;


var configDB = require("./config/database.js");

var configDBUrl = (process.env.OPENSHIFT_NODEJS_PORT !== undefined)? configDB.url : configDB.localUrl;

mongoose.connect(configDBUrl);

/*-------------------------------------*\
	* ADD NEWS ITEMS TO THE MONGODB *
\*-------------------------------------*/

var News = require("./models/News");


request({ url: "http://www.skysports.com/rss/0,20514,11095,00.xml"}, function(err, res, body) {
    if (err) process.exit(0);

    parseString(body, function (err, result) {
	if (err) process.exit(0);
		News.update({_id:"news"},{$set:{"news":result.rss.channel[0].item}}).exec(function(err,result){
			if(err) {
				console.log("not added news");
			}
			process.exit(0)
		})
	});
});
