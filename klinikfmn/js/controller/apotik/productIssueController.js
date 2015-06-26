appControllers.controller('productIssueController', ['$scope', 'growl','$location',
	function($scope,growl,$location){

		//VARIABEL
	$scope.produkIssues=[];
	$scope.searchSupplier="";

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
		console.log("Masuk penerimaan controlle");	
		$scope.today();		
		$scope.isTgl=true;
		getAll(1);		
	};

	function getAll(hal){
		var kriteriaSupplier="--";
		var kriteriaTgl1="--";
		var kriteriaTgl2="--";
		var vTgl1 = $filter('date')($scope.tgl1,'yyyy-MM-dd');
		var vTgl2 = $filter('date')($scope.tgl2,'yyyy-MM-dd');

		if($scope.searchSupplier!==""){
			kriteriaSupplier=$scope.searchSupplier;
		};

		if($scope.isTgl==true){
			kriteriaTgl1=vTgl1;
			kriteriaTgl1=vTgl2;
		};

		penerimaanBarangFactory
			.getAll(kriteriaTgl1, kriteriaTgl2, kriteriaSupplier,hal, $scope.itemsPerPage)
			.success(function(data){
				$scope.penerimaans=data.content;
				$scope.totalItems = data.totalElements;		
			})
			.error(function(data){
				growl.addWarnMessage('Error loading from server !!!');
			})
	};

	$scope.baru=function(){
		$location.path('/penerimaanApotikDetil/0');
	};

	$scope.ubah=function(id){
		$location.path('/penerimaanApotikDetil/'+id);
	};

	$scope.searchAll=function(){
		getAll(1);
	}
	
	startModule();


	
}])