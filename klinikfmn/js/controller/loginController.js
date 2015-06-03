appControllers.controller('loginController', ['$scope','growl','$location','$rootScope','userFactory', 'Base64','$cookieStore','$rootScope',
    function($scope,growl,$location,$rootScope,userFactory, Base64, $cookieStore, $rootScope){
	
	$scope.userId='tes';
	$scope.password='123';	
    $rootScope.isLogin=false;
    ClearCredentials();
    
    function ClearCredentials () {
        $rootScope.globals = {};
        $cookieStore.remove('globals');
        $rootScope.isLogin = {};
        $cookieStore.remove('isLogin');            
        //$http.defaults.headers.common.Authorization = 'Basic ';
    };

	// $rootScope.isLogin=false;
	$scope.login = function () {        
		
        // $rootScope.isLogin=true;          
        // $location.path('#/'); 

        if( $scope.userId=='' || $scope.password==''){
            growl.addWarnMessage('User or password is null');
            return null;
        }

        var passkey=Base64.encode($scope.userId + ':' + $scope.password);
    
        userFactory
            .getUserByUserNamePassword($scope.userId, passkey)
            .success(function(data){
                hasil=data;
                
                if(data==null || data===''){
                    // console.log(false);    
                    growl.addErrorMessage('Invalid user name or password ! ');  
                    
                }else{
                    // console.log(true);    
                    $rootScope.globals = {
                        currentUser: {
                            username: $scope.userId,
                            authdata: 'rAhasIA'
                        }
                    };
                    $rootScope.isLogin=true;

                    //$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
                    $cookieStore.put('globals', $rootScope.globals);
                    $cookieStore.put('isLogin', $rootScope.isLogin);
                    $location.path('#/');
                }
            })
            .error(function(data){
                 growl.addErrorMessage('Error get Auth from server ! ');  
            });

        // AuthenticationService
        //     .loginAuth($scope.userId, $scope.password)
        //     .success(function(data){
        //         isAuth=data;
        //         if(isAuth==true){
        //             AuthenticationService.SetCredentials($scope.userId);    
        //             $location.path('#/'); 
        //         }else{
        //             growl.addErrorMessage('Invalid user name or password ! ');        
        //         }
        //     })
        //     .error(function(data){
        //         growl.addErrorMessage('Error koneksi ke server ');    
        //     })

        
        
        
        // AuthenticationService
        //     .loginAuth($scope.userId, $scope.password)
        //     .success(function(data){
        //         growl.addWarnMessage(data);
        //         if ( data==='true') {
        //             var idUser=0 ; 
        //             userFactory
        //                 .getIdByUserName($scope.userId)
        //                 .success(function(data){
        //                     // idUser=data;
        //                     AuthenticationService.SetCredentials($scope.userId, data);
        //                    //alert('direct')      
        //                     $rootScope.isLogin=true;          
        //                     $location.path('#/'); 
        //                     //$scope.parent.isLoginMenu=true;                           
        //                 });
                    
        //         } else {
        //             //alert('error login');                
        //             growl.addErrorMessage('Invalid user or password ');
        //             // $scope.error = response.message;                
        //         }    
        //     })
        //     .error(function(data){
        //         growl.addWarnMessage('Error get Auth from Server !' );       
        //     })

    };

	
}])