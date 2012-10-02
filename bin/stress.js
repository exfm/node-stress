#!/usr/bin/env node
"use strict";

var program = require("commander");

program
    .version("0.0.1");

program
    .command("list")
    .description("List all available services to load test")
    .action(function(){
        // do something
   });

program
    .command("test <service> <host> <rps>")
    .description("Stress test a server")
    .action(function(service, host, rps){
        var nl = require('nodeload'),
            loadtest;
        if (service === "albumart"){
                loadtest = nl.run({
                host: host,
                port: 80,
                timeLimit: 480,
                targetRps: rps,
                requestGenerator: function(client) {
                    var request = client.request('GET', "/song/w100-h100/" + makeid() + ".jpg");
                    request.end();
                    return request;
                }
            });
            loadtest.on('end', function() { console.log('Load test done.'); });
        }



   });

function makeid()
{
    var text = "",
        possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        i;
    for(i=0; i < 5; i++ ){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

program.parse(process.argv);

