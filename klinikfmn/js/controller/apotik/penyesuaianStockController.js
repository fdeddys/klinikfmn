appControllers.controller('penyesuaianStockController', ['$scope', '$filter', 'adjustmentStockFactory', 'growl','$location',
	function($scope,$filter, adjustmentStockFactory, growl,$location){

	//VARIABEL
	$scope.adjustments=[];	

	// PAGING
	$scope.totalItems;
	$scope.itemsPerPage= 8;
	$scope.currentPage = 1;   
	$scope.pageChanged=function(){
 		getAll($scope.currentPage); 		  
    }; 
	// END PAGING

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

	function startModule(){	
		
		$scope.today();		
		$scope.isTgl=true;
		getAll(1);		
	};

	function getAll(hal){
		
		var kriteriaTgl1="--";
		var kriteriaTgl2="--";
		var vTgl1 = $filter('date')($scope.tgl1,'yyyy-MM-dd');
		var vTgl2 = $filter('date')($scope.tgl2,'yyyy-MM-dd');

		if($scope.isTgl==true){
			kriteriaTgl1=vTgl1;
			kriteriaTgl2=vTgl2;
		};

		adjustmentStockFactory
			.getByDate(kriteriaTgl1, kriteriaTgl2, $scope.itemsPerPage, hal)
			.success(function(data){
				$scope.adjustments=data.content;
				$scope.totalItems = data.totalElements;		
			})
			.error(function(data){
				growl.addWarnMessage('Error loading from server !!!');
			})
	};

	$scope.baru=function(){
		$location.path('/adjustmentStockDetil/0');
	};

	$scope.ubah=function(id){
		$location.path('/adjustmentStockDetil/'+id);
	};

	$scope.searchAll=function(){
		getAll(1);
	}
	
	startModule();

}])