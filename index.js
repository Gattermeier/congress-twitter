/**
 * Created by matthias on 11/12/14.
 */

var request = require("request");
var url = "https://www.govtrack.us/api/v2/role?current=true&limit=600";
var fs = require('fs');
var twitterhandles = '';
var exporturl = 'rep-twitter-handles.csv';

request({
    url: url,
    json: true
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        extractTwitter(body);
    }
});


function extractTwitter(body) {
    var obj = body.objects;
    Object.keys(obj).forEach(function(key) {
        if (obj[key].person.twitterid != 'null') {
            twitterhandles = twitterhandles + ', @'+obj[key].person.twitterid;
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

