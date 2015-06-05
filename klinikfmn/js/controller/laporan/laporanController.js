appControllers.controller('laporanController', ['$scope','$sce','$routeParams', 'fieldGroupFactory', '$filter', '$rootScope',
    function($scope, $sce, $routeParams, fieldGroupFactory, $filter, $rootScope){
    
    var idxLaporan='-';
    // 0 :
    // 1 : Jumlah Pasien
    // 2 : Jumlah Tindakan

    $scope.floors=[];
 	$scope.selectedFloor;

    $scope.namaLaporan='Laporan ...';

    $scope.preview=function(){
    	var vTgl1 = $filter('date')($scope.tgl1,'yyyy-MM-dd');	
    	var vTgl2 = $filter('date')($scope.tgl2,'yyyy-MM-dd');	
    	var lantai = $scope.selectedFloor;
    	//console.log(lantai);

    	switch(idxLaporan){
    		case '1': 	$scope.alamatReport= $sce.trustAsResourceUrl(
    				    $rootScope.pathServerJSON + '/registration/report/tgl1/'+vTgl1+'/tgl2/'+vTgl1+'/status/true/floor/'+lantai);
    					break;
    		case '2': 	$scope.alamatReport= $sce.trustAsResourceUrl(
    					$rootScope.pathServerJSON + '/transaction/hdr/report/tgl1/'+vTgl1+'/tgl2/'+vTgl2+'/floor/'+lantai);    
    					break;    					
    	}
    	
    };

    function startModule(){
    	idxLaporan=$routeParams.idxlaporan;

    	switch(idxLaporan){
    		case '1': 	$scope.namaLaporan='Laporan Jumlah Pasien';
    					break;
    		case '2': 	$scope.namaLaporan='Laporan Jumlah Tindakan';
    					break;    					
    	};

    	getAllFloor();
    	$scope.today();	
    };

    function getAllFloor(){
		fieldGroupFactory
 			.getAllFloor()
 			.success(function(data){ 				 			 	
				$scope.floors=data;
				$scope.selectedFloor=data[0];			
 			})
 			.error(function(data){
 				growl.addWarnMessage("Error loading data floor from server ");
 			})
	};

	// tanggal
		$scope.today = function() {
	    	$scope.tgl1 = new Date();
	    	$scope.tgl2 = new Date();
		};		

		$scope.open1 = function($event) {
		    $event.preventDefault();
		    $event.stopPropagation();
		    $scope.opened1 = true;		    
		};

		$scope.open2 = function($event) {
		    $event.preventDefault();
		    $event.stopPropagation();
		    $scope.opened2 = true;		    
		};

		$scope.dateOptions = {
			formatYear: 'yy',
			startingDay: 1
		};
	// END tanggal  


    startModule();
    
}]);