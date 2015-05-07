appControllers.controller('assessmentPerawatController', ['$scope','registrasiFactory','$location',
    function($scope, registrasiFactory, $location){
        
    $scope.registrasis=[];
 	
 	// Paging 
	$scope.totalItems;
	$scope.itemsPerPage= 8;
	$scope.currentPage = 1;     

	$scope.pageChanged=function(){
 		getAll($scope.currentPage); 		  
    }
	
	function getAll(halaman){
		registrasiFactory
			.getAllByPage(halaman, $scope.itemsPerPage)
			.success(function(data){					
				$scope.registrasis=data.content;
				$scope.totalItems = data.totalElements;						
			})
			.error(function(data){
				growl.addWarnMessage('Error loading from server !!!');
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

	$scope.assessmentDetil=function(noPass){
		$location.path('/assesmentPerawatDetil/'+noPass)
	};

	
	startModule();

}]);