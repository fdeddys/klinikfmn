appControllers.controller('transaksiController', ['$scope','registrasiFactory','$location','transaksiFactory',
    function($scope, registrasiFactory, $location, transaksiFactory){
        
    var noReg;
    $scope.registrasis=[];
    $scope.transaksiHds;

    $scope.isCollapsed = true;

    // untuk tampilan tambahan di detil
    $scope.selectedNama;
    $scope.selectedRM;
    $scope.selectedNoReg;
 	
 	// Paging 
	$scope.totalItems;
	$scope.itemsPerPage= 8;
	$scope.currentPage = 1;   
	$scope.pageChanged=function(){
 		getAll($scope.currentPage); 		  
    };  

	// Paging Detil
	$scope.totalItems2;
	$scope.itemsPerPage2= 5;
	$scope.currentPage2 = 1;     
	$scope.pageChanged2=function(){
 		getDetilAll($scope.currentPage2); 		  
    };

    $scope.proses=function(id){    	
    	$location.path('/transaksiDetil/'+id+'/status/new')
    };

    $scope.viewPanelDetil=function(noreg, norm, nama){
    	noReg = noreg;
		$scope.selectedNama = "No Reg : " + noreg;
		$scope.selectedRM = "No RM : " + norm;
		$scope.selectedNoReg= "Nama : " + nama;
		//alert($scope.selectedNama);	
    	getDetilAll(1);

    	$scope.isCollapsed = false;
    }
	
    function getDetilAll(halaman){
    	transaksiFactory
    		.getByNoRegPage( noReg ,halaman, $scope.itemsPerPage2)
    		.success(function(data){
    			$scope.transaksiHds	=data.content;
    			$scope.totalItems2 = data.totalElements;		

    			
    		})
    		.error(function(data){

    		})
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

	
	startModule();
}]);