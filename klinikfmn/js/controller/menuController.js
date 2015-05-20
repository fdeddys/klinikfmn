appControllers.controller('menuBarController', ['$scope','$rootScope','$location','$cookieStore', 
    function($scope,$rootScope,$location,$cookieStore){
    
    $scope.namaLogin="Sign in as ";
    $scope.isLogin=false;

    $rootScope.$watch('isLogin',function(newVal,oldVal, scope){
        //if(newVal!==oldVal){
            console.log(oldVal + '  berubah  ' + newVal );  
            if(newVal===true){
                console.log($rootScope.globals.currentUser.username);
                $scope.namaLogin=$rootScope.globals.currentUser.username;                
                $scope.isLogin=true;

                //$scope.namaLogin=$cookieStore.globals.currentUser.username;                
            }else{
                $scope.namaLogin="Sign in as ";                
                $scope.isLogin=false;                
            }
        //}
    })

}]);