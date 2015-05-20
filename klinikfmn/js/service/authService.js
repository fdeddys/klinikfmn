

appServices.factory('AuthenticationService',
    ['Base64', '$http', '$cookieStore', '$rootScope', '$timeout','$rootScope','userFactory',
    function (Base64, $http, $cookieStore, $rootScope, $timeout, $rootScope, userFactory) {
        var service = {};
        var urlApi = $rootScope.pathServerJSON + '/master/user';

        service.loginAuth=function(nama, pass){
            var passkey=Base64.encode(nama + ':' + pass);
            var hasil=null;
            userFactory
                .getUserByUserNamePassword(nama, passkey)
                .success(function(data){
                    hasil=data;
                    
                    if(data==null || data===''){
                        // console.log(false);    
                        return false;
                        
                    }else{
                        // console.log(true);    
                        return true;
                    }
                })
                .error(function(data){

                });
        };

        service.Login = function (username, password, callback) {

             var response = { success: username === 'admin' && password === '' };
                if (!response.success) {                	
                    response.message = 'Username or password is incorrect';
                }
                callback(response);
        };

        service.SetCredentials = function (username) {
            //var authdata = Base64.encode(username + ':' + password);
            //alert('authentication u:'+username+' p:'+password);
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: 'rAhasIA'
                }
            };
            $rootScope.isLogin=true;

            //$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
            $cookieStore.put('isLogin', $rootScope.isLogin);

        };

        service.ClearCredentials = function () {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $rootScope.isLogin = {};
            $cookieStore.remove('isLogin');            
            //$http.defaults.headers.common.Authorization = 'Basic ';
        };

        
        return service;
    }]);