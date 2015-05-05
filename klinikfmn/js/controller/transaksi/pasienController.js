appControllers.controller('pasienController', ['$scope','pasienFactory','growl','$location',
    function($scope, pasienFactory, growl, $location){
 

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
				growl.addWarnMessage('Error loading from server !!!');
			})		
	}

	$scope.tambah=function(idPasien){
		$location.path('/pasienDetil/0')
	};

	$scope.edit=function(noPass){
		$location.path('/pasienDetil/'+noPass)	
	};

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