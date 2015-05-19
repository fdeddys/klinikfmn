appControllers.controller('pembayaranController', ['$scope','registrasiFactory','$location','growl','$filter',
    function($scope, registrasiFactory, $location, growl, $filter){
        
	$scope.registrasis=[];
 	
 	// Paging 
	$scope.totalItems;
	$scope.itemsPerPage= 8;
	$scope.currentPage = 1;  


	$scope.isTglReg=true;
    $scope.searchNama='';   

	$scope.pageChanged=function(){
 		getAll($scope.currentPage); 		  
    }
	
    $scope.getAll=function(){
    	getAll(1);
    };

	function getAll(halaman){
		var kriteriaNama, kriteriaNoReg, kriteriaTgl;

		var vTgl = $filter('date')($scope.tgl,'yyyy-MM-dd');
		if($scope.searchNama===''){
			kriteriaNama='--';
		}else{
			kriteriaNama=$scope.searchNama;
		};
		
		kriteriaNoReg='--';
		
		if($scope.isTglReg==false){
			kriteriaTgl='--';
		}else{
			kriteriaTgl=vTgl;
		}

		registrasiFactory
			.getAllByNamaNoRegTglPage(kriteriaNama, kriteriaNoReg, kriteriaTgl, halaman, $scope.itemsPerPage)
			.success(function(data){					
				$scope.registrasis=data.content;
				$scope.totalItems = data.totalElements;						
			})
			.error(function(data){
				growl.addWarnMessage('Error loading from server !!!');
			})	

		// registrasiFactory
		// 	.getAllByPage(halaman, $scope.itemsPerPage)
		// 	.success(function(data){					
		// 		$scope.registrasis=data.content;
		// 		$scope.totalItems = data.totalElements;						
		// 	})
		// 	.error(function(data){
		// 		growl.addWarnMessage('Error loading from server !!!');
		// 	})		
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

	$scope.bayar=function(idBayar){
		
		$location.path('/pembayaranDetil/'+idBayar)
	}
	
	startModule();
	    	
}]);