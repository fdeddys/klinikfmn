appControllers.controller('loginController', ['$scope','growl','AuthenticationService','$location','$rootScope','userFactory', 
    function($scope,growl,AuthenticationService,$location,$rootScope,userFactory){
	
	$scope.userId='';
	$scope.password='';
	AuthenticationService.ClearCredentials();
    $rootScope.isLogin=false;
    
	// $rootScope.isLogin=false;
	$scope.login = function () {        
		
        $rootScope.isLogin=true;          
        $location.path('#/'); 
        AuthenticationService.SetCredentials($scope.userId, "xxx");
        
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