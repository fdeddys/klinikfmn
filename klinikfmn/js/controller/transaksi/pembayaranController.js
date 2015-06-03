appControllers.controller('pembayaranController', ['$scope','registrasiFactory','$location','growl','$filter','pembayaranFactory',
    function($scope, registrasiFactory, $location, growl, $filter, pembayaranFactory){
        
	$scope.registrasis=[];
	$scope.payments=[];

	var noReg;
 	
 	// Paging 
	$scope.totalItems;
	$scope.itemsPerPage= 8;
	$scope.currentPage = 1;  


	$scope.isTglReg=true;
    $scope.searchNama='';   

    $scope.isCollapsed=true;

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
	};

	function getByNoReg(halaman){
		pembayaranFactory
			.getByNoRegPage(noReg,halaman, $scope.itemsPerPage2)
			.success(function(data){					
				$scope.payments=data.content;
				$scope.totalItems = data.totalElements;						
			})
			.error(function(data){
				growl.addWarnMessage('Error loading from server !!!');
			})	
	}	

	// Paging Detil
	$scope.totalItems2;
	$scope.itemsPerPage2= 5;
	$scope.currentPage2 = 1;     
	$scope.pageChanged2=function(){
 		getDetilAll($scope.currentPage2); 		  
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

	$scope.bayar=function(idReg,isClose){
		if(isClose==true){
			growl.addWarnMessage('Registrasi telah di tutup, silahkan buka di menu Registrasi !!');
		}else{
			$location.path('/pembayaranDetil/'+idReg+'/status/new')
		}
	};

	$scope.viewPanelDetil=function(noreg, norm, nama){
    	noReg = noreg;
		$scope.selectedNama = "No Reg : " + noreg;
		$scope.selectedRM = "No RM : " + norm;
		$scope.selectedNoReg= "Nama : " + nama;
		//alert($scope.selectedNama);	
    	getByNoReg(1);

    	$scope.isCollapsed = false;
    };
	
	startModule();
	    	
}]);