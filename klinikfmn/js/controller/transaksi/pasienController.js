appControllers.controller('pasienController', ['$scope','pasienFactory','growl','$location','$filter',
    function($scope, pasienFactory, growl, $location, $filter){
 

 	$scope.pasiens=[];
 	
 	// untuk checkbox apakah pilih tanggal lahir
 	$scope.isTglLahir=false;
 	// Paging 
	$scope.totalItems;
	$scope.itemsPerPage= 8;
	$scope.currentPage = 1; 
	$scope.searchNama='';    

	$scope.pageChanged=function(){
 		getAll($scope.currentPage); 		  
    }

    $scope.search=function(){
    	getAll(1);
    }
	
	function getAll(halaman){
		if($scope.searchNama==='' ){
			
			if( $scope.isTglLahir==false ){
				// tidak ada search nama
				// tidak ada search tgl lahir
				console.log('no search no tgl lahir');
				pasienFactory
				.getAllByPage(halaman, $scope.itemsPerPage)
				.success(function(data){					
					$scope.pasiens=data.content;
					$scope.totalItems = data.totalElements;						
				})
				.error(function(data){
					growl.addWarnMessage('Error loading from server !!!');
				})				
			}else{
				// tidak ada search nama
				// ada search tgl lahir

				// subroutine belum ada
				console.log('no search but tgl lahir');

			}
			
		}else{
			if( $scope.isTglLahir==false ){
				// ada search nama
				// tidak ada search tgl lahir
				console.log(' search name not tgl lahir');
				pasienFactory
					.getByName($scope.searchNama, halaman, $scope.itemsPerPage)
					.success(function(data){					
						$scope.pasiens=data.content;
						$scope.totalItems = data.totalElements;						
					})
					.error(function(data){
						growl.addWarnMessage('Error loading from server !!!');
					})				
			}else{
				// ada search nama
				// ada search tgl lahir
				console.log(' search name and tgl lahir');
				var vTgl = $filter('date')($scope.tgl,'yyyy-MM-dd');
				pasienFactory
					.getByNameTglLahir(vTgl, $scope.searchNama, halaman, $scope.itemsPerPage)
					.success(function(data){					
						$scope.pasiens=data.content;
						$scope.totalItems = data.totalElements;						
					})
					.error(function(data){
						growl.addWarnMessage('Error loading from server !!!');
					})								
			}			
		}		
	}

	$scope.tambah=function(idPasien){
		$location.path('/pasienDetil/0')
	};

	$scope.edit=function(noPass){
		$location.path('/pasienDetil/'+noPass)	
	};

	$scope.registrasi=function(noPass){
		$location.path('/registrasiDetil/'+noPass)	
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