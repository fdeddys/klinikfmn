appControllers.controller('pasienController', ['$scope','pasienFactory','growl',
    function($scope, pasienFactory, growl){
 

 	$scope.pasiens=[];
 	
 	// Paging 
	$scope.totalItems;
	$scope.itemsPerPage= 8;
	$scope.currentPage = 1;     

	$scope.pageChanged=function(){
 		getAll($scope.currentPage); 		  
    }
	
	function getAll(halaman){
		pasienFactory
			.getAllByPage(halaman, $scope.itemsPerPage)
			.success(function(data){					
				$scope.pasiens=data.content;
				$scope.totalItems = data.totalElements;						
			})
			.error(function(data){
				growl.addWarnMessage('Error loading status vouchers from server !!!');
			})		
	}

	// tanggal
		$scope.today = function() {
	    	$scope.tgl = new Date();
		};		

		$scope.open = function($event) {
		    $event.preventDefault();
		    $event.stopPropagation();
		    $scope.opened = true;		    
		};

		$scope.dateOptions = {
			formatYear: 'yy',
			startingDay: 1
		};
	// END tanggal  

	function startModule(){
		getAll(1);
		$scope.today();				
	};

	startModule();

}]);