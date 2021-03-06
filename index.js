/**
 * Created by Matthias Gattermeier on 11/12/14.
 * www.gattermeier.net
 */
"use strict";

var request = require("request");
var url = "https://www.govtrack.us/api/v2/role?current=true&limit=600";
var fs = require('fs');
var twitterhandles = '';
var exporturl = process.argv[2];
var roletype = '';

if (!exporturl) {
    console.log('Please specify output file name: node index.js target.csv');
} else {
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            extractTwitter(body);
        }
    });
}

function extractTwitter(body) {
    var obj = body.objects;
    Object.keys(obj).forEach(function(key) {
        if (obj[key].person.twitterid !== null) {
            twitterhandles = twitterhandles + '@'+obj[key].person.twitterid+'\n';
        }

    });
    writeTwitterCSV(exporturl, twitterhandles);
}


function writeTwitterCSV(exporturl, twitterhandles) {
    fs.writeFile(exporturl, twitterhandles, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Twitter handles saved to: "+exporturl);
        }
    });
}

