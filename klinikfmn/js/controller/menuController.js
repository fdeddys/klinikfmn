appControllers.controller('menuBarController', ['$scope','$rootScope','$location','$cookieStore', 
    function($scope,$rootScope,$location,$cookieStore){
    
    $scope.namaLogin="Sign in as ";

    $scope.$watch('isLogin',function(newVal,oldVal, scope){
        if(newVal!==oldVal){
            //alert(oldVal + '  berubah  ' + newVal );  
            if(newVal===true){
                //alert($rootScope.globals.currentUser.username);
                $scope.namaLogin=$rootScope.globals.currentUser.username;                
                //$scope.namaLogin=$cookieStore.globals.currentUser.username;                
            }
        }
    })

}]);