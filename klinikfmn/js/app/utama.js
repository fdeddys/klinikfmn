var myApp = angular.module('appKlinikFMN',[
	'ngRoute',
	'appControllers',
    'appServices',	
	'ngCookies',
	'angular-growl',	
	'ngFileUpload',
	'ui.bootstrap'
]);



myApp.run(['$window', '$rootScope', '$location', '$cookieStore', '$http', function($window, $rootScope, $location, $cookieStore, $http){

	// buat hidden menu nya
	// kalo masuk form LOGIN sembunyikan
	// tapi logo nyo masih ado koq cumen bar menu bae yang ilang
	$rootScope.isLogin=false;

	// Pindahkan scroll selalu ke paling atas => efek dari animasi
	$rootScope.$on('$viewContentLoaded', function(){ window.scrollTo(0, 0); });

	// Path server database	
    $rootScope.pathServerJSON='http://10.1.0.11:8080/fmn-clinic-server/api';
	//$rootScope.pathServerJSON='http://localhost:8080/fmn-clinic-server/api';



	// refresh masih tetep login brooo
    $rootScope.globals = $cookieStore.get('globals') || {};    
    if ($rootScope.globals.currentUser) {
        //$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        $rootScope.$broadcast('isLogin');
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
		when('/tindakan',{
			templateUrl:'partials/master/tindakan.html',
		    controller:'tindakanController'
		}).
		when('/bank',{
			templateUrl:'partials/master/bank.html',
		    controller:'bankController'
		}).		
		when('/dokter',{
			templateUrl:'partials/master/dokter.html',
		    controller:'dokterController'
		}).		
		when('/agama',{
			templateUrl:'partials/master/agama.html',
		    controller:'agamaController'
		}).		
		when('/pekerjaan',{
			templateUrl:'partials/master/pekerjaan.html',
		    controller:'pekerjaanController'
		}).		
		when('/pendidikan',{
			templateUrl:'partials/master/pendidikan.html',
		    controller:'pendidikanController'
		}).
		when('/floor',{
			templateUrl:'partials/master/floor.html',
		    controller:'floorController'
		}).
		when('/header',{
			templateUrl:'partials/master/header.html',
		    controller:'headerController'
		}).		
		when('/pasien',{
			templateUrl:'partials/transaksi/pasien.html',
		    controller:'pasienController'
		}).
		when('/pasienDetil/:noPass',{
			templateUrl:'partials/transaksi/pasienDetil.html',
		    controller:'pasienDetilController'
		}).
		when('/registrasi',{
			templateUrl:'partials/transaksi/registrasi.html',
		    controller:'registrasiController'
		}).
		when('/registrasi/info',{
			templateUrl:'partials/transaksi/detilInfo.html',
			controller:'MyCtrl'		    
		}).
		when('/registrasiInfo/:idReg',{
			templateUrl:'partials/transaksi/registrasiInfo.html',
			controller:'registrasiInfoController'		    
		}).
		when('/registrasiDetil/:noPass',{
			templateUrl:'partials/transaksi/registrasiDetil.html',
		    controller:'registrasiDetilController'
		}).
		when('/assesmentPerawat',{
			templateUrl:'partials/transaksi/assesmentPerawat.html',
		    controller:'assessmentPerawatController'
		}).
		when('/assesmentPerawatDetil/:noReg',{
			templateUrl:'partials/transaksi/assesmentPerawatDetil.html',
		    controller:'assessmentPerawatDetilController'
		}).
		when('/assesmentDokter',{
			templateUrl:'partials/transaksi/assesmentDokter.html',
		    controller:'assessmentPerawatController'
		}).		
		when('/assesmentDokterDetil/:noReg',{
			templateUrl:'partials/transaksi/assesmentDokterDetil.html',
		    controller:'assessmentPerawatDetilController'
		}).		
		when('/transaksi',{
			templateUrl:'partials/transaksi/transaksi.html',
		    controller:'transaksiController'
		}).	
		when('/transaksiDetil/:idReg/status/:statusRec',{
			templateUrl:'partials/transaksi/transaksiDetil.html',
		    controller:'transaksiDetilController'
		}).						
		when('/pembayaran',{
			templateUrl:'partials/transaksi/pembayaran.html',
		    controller:'pembayaranController'
		}).
		when('/pembayaranDetil/:idReg/status/:statusRec',{
			templateUrl:'partials/transaksi/pembayaranDetil.html',
		    controller:'pembayaranDetilController'
		}).
		when('/penerimaanApotik',{
			templateUrl:'partials/apotik/penerimaanBarang.html',
		    controller:'penerimaanBarangController'
		}).
		when('/penerimaanApotikDetil/:idTerima',{
			templateUrl:'partials/apotik/penerimaanBarangDetil.html',
		    controller:'penerimaanBarangDetilController'
		}).
		when('/productIssue',{
			templateUrl:'partials/apotik/productIssue.html',
		    controller:'productIssueController'
		}).

		when('/laporan/:idxlaporan',{
			templateUrl:'partials/laporan/laporan.html',
		    controller:'laporanController'
		}).
		when('/user',{
			templateUrl:'partials/utility/user.html',
		    controller:'userController'
		}).			
        otherwise({
			redirectTo:'/'
		});

}]);

