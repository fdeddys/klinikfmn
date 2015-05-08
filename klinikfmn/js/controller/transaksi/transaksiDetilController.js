appControllers.controller('transaksiDetilController', ['$scope','transaksiFactory','registrasiFactory','$routeParams','growl','groupTindakanFactory','transaksiFactory', 
    function($scope, transaksiFactory, registrasiFactory, $routeParams, growl, groupTindakanFactory, transaksiFactory){
        
    //untuk temp tarif group yg sudah di pilih    
    $scope.tarifGroupSelected ;
    $scope.tariffgroups;
    $scope.selected = undefined;

	// $scope.dateOptions = {
	// 		formatYear: 'yy',
	// 		startingDay: 1
	// 	};

	function getAllGroupTindakan(){
		groupTindakanFactory
			.getAll()
			.success(function(data){
				$scope.tariffgroups=data;
			})
			.error(function(data){

			});
	};

    $scope.registrasi={
    	idRegistration: null,
		registrationNo: null,
		patient: null,
		registrationDate: null,
		registrationTime: null,
		isVoid: null,
		usrUpdate: null,
		lastUpdate: null
    };

    $scope.transaksiHd={    	
		idTransactionHdr: null,
		transactionNo: null,
		registration: null,
		transactionDate: new Date(),
		isApprove: null,
		isVoid: 0,
		isPaid: 0,
		total: 0,
		usrUpdate: null,
		lastUpdate: null
    };

    $scope.simpan=function(data){
    	if($scope.transaksiHd.idTransactionHdr=='' || $scope.transaksiHd.idTransactionHdr==null){
    		$scope.transaksiHd.registration = $scope.registrasi;
    		transaksiFactory
    			.insert($scope.transaksiHd)
    			.success(function(data){
    				$scope.transaksiHd 	= data;
    			})	
    			.error(function(data){
    				growl.addWarnMessage("Error save data !!");
    			})
    	}
    }

	function startModule(){
		
		var idReg = $routeParams.idReg;
		var statusRec = $routeParams.statusRec;
		if(statusRec==='new'){
			// new transaksi
			if(!isNaN(parseFloat(idReg)) && isFinite(idReg)){			
				registrasiFactory
					.getById(idReg)	
					.success(function(data){
						$scope.registrasi=data;		
						growl.addWarnMessage('Success loading !!!');				
					})
					.error(function(data){
						growl.addWarnMessage('Error loading !!!');			
					})		
			}else{
				growl.addWarnMessage("Error Loading data pasien !!");
			}	
		}else{
			// Edit transaksi
			if(statusRec==='edit'){
				transaksiFactory
					.getById(idReg)
					.success(function(data){
						$scope.transaksiHd=data;
						$scope.registrasi=data.registration;	
						growl.addWarnMessage('Success loading !!!');										
					})	
					.error(function(data){
						growl.addWarnMessage('Error loading !!!');	
					})				
			}
		}
		
		getAllGroupTindakan();
	};

    startModule();	
        			

}]);