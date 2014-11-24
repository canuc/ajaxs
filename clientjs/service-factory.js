var %%api.name%%Service = (function (angular){
    var API_ROOT  = "%%api.root%%";
    var API_NAME  = "%%api.name%%";
    var API_FUNCS = %%api.funcs%%;
    var API_TIMEOUT = 30 * 1000;
    
    return function (app) {
        
        app.factory(API_NAME,function($http) {

            // 
            // Initialize the transport layer.
            // 
            function sendAjaxCall( apiMethod, data ) {
                var requestUrl = [API_ROOT,API_NAME,apiMethod].join('/');
                data = data || [];
                var dataObj = {};

                dataObj.args  = data;
                dataObj.hasCb = true;

                return $http({
                    url: requestUrl,
                    data: JSON.stringify(dataObj),
                    timeout: API_TIMEOUT,
                    method: 'POST',
                    headers : {
                        "Content-Type": "application/json" 
                    }
                });
            }

            //
            // Process the argument array.
            //
            function getCallbackFromArgs( argumentList ) {
                var callbackObject = [];

                if ( argumentList && argumentList.length ) {
                    for ( var i in argumentList ) {
                        switch( typeof argumentList[i] ) {
                            case "function":
                                throw new Error()
                            case "object": 
                            case "number":
                            case "array":
                            default:
                                // this does not check for other functions within objects...
                                callbackObject.push(JSON.parse(JSON.stringify(argumentList[i])));
                                break;
                        }
                    }
                    
                }
                return callbackObject;
            }

            function initializeServiceClientAPIRequest(service) {

                return function clientAPIRequest(apiMethod) {

                    service[apiMethod] = function () {
                        var filteredArgs = getCallbackFromArgs(arguments);

                        return sendAjaxCall( apiMethod, filteredArgs );
                    };
                }
            }

            function initializeAPI( ) {
                var API = {};
                angular.forEach(API_FUNCS,initializeServiceClientAPIRequest(API));
                return API;
            }

            return initializeAPI();
        });
    }
})(angular);