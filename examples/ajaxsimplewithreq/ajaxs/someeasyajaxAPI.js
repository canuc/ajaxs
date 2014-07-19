
exports.doSomeAction = function(req,inputObject,callback) {
	callback(req.url);
}

//
// This property bieng true means that instead of doSomeAction( inputObject, callback) 
// it will be called with the form doSomeAction( req, inputObject, callback)
//
exports.needRequest = true;

// 
// This property can be set on your API object to allow
// you to increase the timeout
//
exports.timeout = 100 * 1000;

//
// Enforce the number of arguments accepted, if it does 
// not match than an error will be dispatched in the response.
//
exports.enforceArity = true;