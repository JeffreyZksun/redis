/**
Installation (If hiredis is installed, node_redis will use it by default. Otherwise, a pure JavaScript parser will be used.)
$ npm install hiredis redis

**/

var redis = require("redis");

var port = 6379;
var ip = "10.31.142.15";
var options = {};

var client = redis.createClient(port, ip, options);

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

client.on("error", function (err) {
    console.log("Error " + err);
});

var user = {
	"id": "33455403",
	"name": "Jeffrey",
	"age": 34,
	"level": 17
};

var Cache = {
	set: function(key, value, callback){
		client.set(key, JSON.stringify(value), callback);
	},
	get: function(key, callback){
		client.get(key, function(err, reply){
			callback(err, JSON.parse(reply));
		});
	}
}

Cache.set(user.id, user, function(err, reply){
	console.log(reply);
});
Cache.get(user.id, function(err, u){
	console.log(typeof u);
	console.log(JSON.stringify(u));

	client.quit();
});