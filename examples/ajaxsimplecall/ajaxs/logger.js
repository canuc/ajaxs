
exports.log = function(logline,callback) {
	callback = callback || function() {};
	console.log(logline);
	callback();
}