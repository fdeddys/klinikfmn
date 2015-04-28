var myApp = angular.module('appAccrual',[
	'ngRoute',
	'appControllers',
    'appServices',	
	'ngCookies',
	'angular-growl',	
	'ui.bootstrap'
]);



myApp.run(['$window', '$rootScope', '$location', '$cookieStore', '$http', function($window, $rootScope, $location, $cookieStore, $http){

	// buat hidden menu nya
	// kalo masuk form LOGIN sembunyikan
	// tapi logo nyo masih ado koq cumen bar menu bae yang ilang aaa
// coba
	$rootScope.isLogin=false;

	// Pindahkan scroll selalu ke paling atas => efek dari animasi
	$rootScope.$on('$viewContentLoaded', function(){ window.scrollTo(0, 0); });

	// Path server database
	//$rootScope.pathServerJSON='http://127.0.0.1:8080/AccrualBasisDB';
	$rootScope.pathServerJSON='http://localhost:8081';


	// refresh masih tetep login brooo
    $rootScope.globals = $cookieStore.get('globals') || {};    
    if ($rootScope.globals.currentUser) {
        //$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }
    $rootScope.isLogin = $cookieStore.get('isLogin') || {};

    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        // redirect to login page, soalnya $rootScope blm login
        if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
            $location.path('/login');
        }
    });

}]);

myApp.config(['$routeProvider','$locationProvider','growlProvider',function($routeProvider,$locationProvider,growlProvider){
	
	// $locationProvider.html5Mode(true);
	growlProvider.globalTimeToLive(5000);

	$routeProvider.
		when('/',{
			templateUrl:'partials/utama.html'				
		}).
		when('/login',{
			templateUrl:'partials/login.html',
			controller:'loginController'
		}).
		when('/groupTindakan',{
			templateUrl:'partials/master/groupTindakan.html',
		    controller:'groupTindakanController'
		}).					
        otherwise({
			redirectTo:'/'
		});

}]);

