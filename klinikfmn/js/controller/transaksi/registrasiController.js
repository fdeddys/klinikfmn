appControllers.controller('registrasiController', ['$scope','registrasiFactory','$filter','growl',
    function($scope, registrasiFactory, $filter, growl){
        

	$scope.registrasis=[];
 	
 	// Paging 
	$scope.totalItems;
	$scope.itemsPerPage= 8;
	$scope.currentPage = 1;     

	$scope.searchNama='';
	$scope.searchNoReg='';
	$scope.isTglReg=true;

	$scope.pageChanged=function(){
 		getAll($scope.currentPage); 		  
    };

    $scope.search=function(){
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
		if($scope.searchNoReg===''){
			kriteriaNoReg='--';
		}else{
			kriteriaNoReg=$scope.searchNoReg;
		};
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
		


		// if($scope.searchNama===''){
  //   		if($scope.isTglReg==false){
  //   			// search null isTgl null
		//     	registrasiFactory
		// 			.getAllByPage(halaman, $scope.itemsPerPage)
		// 			.success(function(data){					
		// 				$scope.registrasis=data.content;
		// 				$scope.totalItems = data.totalElements;						
		// 			})
		// 			.error(function(data){
		// 				growl.addWarnMessage('Error loading from server !!!');
		// 			})		
  //   		}else{
  //   			// search null isTgl true
  //   			var vTgl = $filter('date')($scope.tgl,'yyyy-MM-dd');
  //   			registrasiFactory
		// 			.getTglReg(vTgl, halaman, $scope.itemsPerPage)
		// 			.success(function(data){					
		// 				$scope.registrasis=data.content;
		// 				$scope.totalItems = data.totalElements;						
		// 			})
		// 			.error(function(data){
		// 				growl.addWarnMessage('Error loading from server !!!');
		// 			})	    			
  //   		}
  //   	}else{
  //   		if($scope.isTglReg==false){
  //   			// search true isTgl null

  //   		}else{
  //   			// search true isTgl true    
  //   			var vTgl = $filter('date')($scope.tgl,'yyyy-MM-dd');			
		//     	registrasiFactory
		// 			.getNameTglReg($scope.searchNama, vTgl, halaman, $scope.itemsPerPage)
		// 			.success(function(data){					
		// 				$scope.registrasis=data.content;
		// 				$scope.totalItems = data.totalElements;						
		// 			})
		// 			.error(function(data){
		// 				growl.addWarnMessage('Error loading from server !!!');
		// 			})		

  //   		}	

  //   	}

		
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

	$scope.gantiStatus=function(statusSekarang, idReg){
		if(statusSekarang==true){
			//alert('ganti false')
			registrasiFactory
				.openReg(idReg)
				.success(function(data){
					getAll(1);	
				})
				.error(function(data){
					growl.addWarnMessage('Error open status');	
				})
		}else{
			//alert('ganti true')
			registrasiFactory
				.closeReg(idReg)
				.success(function(data){
					getAll(1);	
				})
				.error(function(data){
					growl.addWarnMessage('Error open status');	
				})

		}
	}

	
	startModule();

}]);