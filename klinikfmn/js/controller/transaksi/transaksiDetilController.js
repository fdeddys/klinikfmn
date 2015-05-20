appControllers.controller('transaksiDetilController', ['$scope','transaksiFactory','registrasiFactory','$routeParams','growl','tindakanFactory','fieldGroupFactory','transaksiDetilFactory', '$location',
    function($scope, transaksiFactory, registrasiFactory, $routeParams, growl, tindakanFactory, fieldGroupFactory, transaksiDetilFactory, $location){
        
    //untuk temp tarif group yg sudah di pilih    
    $scope.tarifSelected = '';
    $scope.tarifs;    
    $scope.isPaket=false;

	$scope.dokters=[];
 	$scope.selectedDokter;

 	$scope.transaksiDetils=[];

 	// jika sudah approve atau void tidak bisa edit transaksi
 	$scope.isVoided = false;
 	$scope.isApproved = false;

 	// untuk tampilan di atas
 	$scope.pesanStatus ="NEW RECORD";

	// $scope.dateOptions = {
	// 		formatYear: 'yy',
	// 		startingDay: 1
	// 	};

	function getAllTindakan(){
		tindakanFactory
			.getAllByNamePage('p',1,1000)
			.success(function(data){
				$scope.tarifs=data.content;
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
		lastUpdate: null,
		dokter: null,
    };

    $scope.transaksiHd={    	
		idTransactionHdr: null,
		transactionNo: null,
		registration: null,
		transactionDate: new Date(),
		isApprove: 0,
		isVoid: 0,
		isPaid: 0,
		total: 0,
		usrUpdate: null,
		lastUpdate: null
    };

    $scope.simpan=function(data){
    	if($scope.transaksiHd.idTransactionHdr==='' || $scope.transaksiHd.idTransactionHdr===null){
    		$scope.transaksiHd.registration = $scope.registrasi;
    		transaksiFactory
    			.insert($scope.transaksiHd)
    			.success(function(data){
    				$scope.transaksiHd 	= data;
    				simpanDetil();
    			})	
    			.error(function(data){
    				growl.addWarnMessage("Error save data !!");
    			})
    	}else{
    		simpanDetil();
    	}
    };

    function simpanDetil(){

    	if($scope.isPaket==false){
    		$scope.transaksiDt={    	
				idTransactionDtl: null,
				transactionHdr: $scope.transaksiHd,
				tariff: $scope.tarifSelected,
				rs: $scope.tarifSelected.rs,
				dokter: $scope.tarifSelected.dokter,
				harga: $scope.tarifSelected.dokter + $scope.tarifSelected.rs,
				paket: 0,
				idDokter: $scope.selectedDokter.id,
				usrUpdate: null,
				tglUpdate: null		
	    	};	
    	}else{
    		$scope.transaksiDt={    	
				idTransactionDtl: null,
				transactionHdr: $scope.transaksiHd,
				tariff: $scope.tarifSelected,
				rs: 0,
				dokter: 0,
				harga: 0,
				paket: 1,
				idDokter: $scope.selectedDokter.id,
				usrUpdate: null,
				tglUpdate: null		
	    	};
    	}
    	
    	transaksiDetilFactory
			.insert($scope.transaksiDt, $scope.transaksiHd.idTransactionHdr)
			.success(function(data){
				//$scope.transaksiHd 	= data;
				// alert('success insert detil');
				$scope.tarifSelected='';
				$scope.isPaket=false;
				isiTable();
			})	
			.error(function(data){
				growl.addWarnMessage("Error save data !!");
			})
    };

    $scope.deleteDetil=function(idDetil){
    	transaksiDetilFactory
			.deleteRec(idDetil, $scope.transaksiHd.idTransactionHdr)
			.success(function(data){				
				isiTable();
			})	
			.error(function(data){
				growl.addWarnMessage("Error save data !!");
			})
    };

    $scope.approve=function(){
    	var tmpTrns;
    	transaksiFactory
			.getById($scope.transaksiHd.idTransactionHdr)
			.success(function(data){				
				tmpTrns=data;
				tmpTrns.isApprove = true;
				transaksiFactory
					.update($scope.transaksiHd.idTransactionHdr, tmpTrns)
					.success(function(data){
						$scope.isApproved = true; 	
						growl.addWarnMessage("success approve");
						$scope.pesanStatus ="APPROVED";				
					})
					.error(function(data){
						growl.addWarnMessage("error  approve");
					})
			})	
			.error(function(data){
				growl.addWarnMessage("Error save data !!");
			})	
    };

    $scope.listPasien=function(){
    	$location.path('/transaksi')
    }

    $scope.void=function(){
    	var tmpTrns;
    	transaksiFactory
			.getById($scope.transaksiHd.idTransactionHdr)
			.success(function(data){				
				tmpTrns=data;
				tmpTrns.isVoid = true;
				transaksiFactory
					.update($scope.transaksiHd.idTransactionHdr, tmpTrns)
					.success(function(data){
						growl.addWarnMessage("success void");						
						$scope.isVoided = true;		
						$scope.pesanStatus ="VOID";																						
					})
					.error(function(data){
						growl.addWarnMessage("error  void");
					})
			})	
			.error(function(data){
				growl.addWarnMessage("Error save data !!");
			})	
    };

    

    function getAllDokter(){
		fieldGroupFactory
 			.getAllDokter()
 			.success(function(data){ 				
 			 	angular.forEach(data, function(value, key) {
					var dokter={
				 		id:value.idField,
				 		name:value.fieldName 
				 	};
    				$scope.dokters.push(dokter);    				    				
				});	
							
 			})
 			.error(function(data){
 				growl.addWarnMessage("Error loading pekerjaan from server ");
 			})
	};

	function setDokter(idRec){ 		
 		// temp jika edit record, ambil id nya utk selected pada SELECT
 		var selRec=null; 		
 		console.log("id rec = " + idRec);
 		fieldGroupFactory
 			.getAllDokter()
 			.success(function(data){ 				
 			 	angular.forEach(data, function(value, key) {     				     				
					var dokter={
				 		id:value.idField,
				 		name:value.fieldName 
				 	};				    	
				 	//console.log('cek = ' + idRec + ' pekerjaan id =' + dataPekerjaan.id);			
				 	if(idRec==dokter.id){
				 		selRec=dokter;
				 		console.log(selRec.name);
				 	}    				
				});	
				if(selRec==null){										
				}else{
					$scope.selectedDokter=selRec;				
				}
				
 			})
 			.error(function(data){
 				growl.addWarnMessage("Error loading pekerjaan from server ");
 			})
 	};

 	function isiTable(){
 		transaksiDetilFactory
 			.getAll($scope.transaksiHd.idTransactionHdr)
 			.success(function(data){
 				$scope.transaksiDetils=data;		
 				growl.addWarnMessage("success loading isi table");
 			})
 			.error(function(data){
 				growl.addWarnMessage("error loading isi table");
 			})
 		
 	};

	function startModule(){
		getAllDokter();
		var idReg = $routeParams.idReg;
		var statusRec = $routeParams.statusRec;
		if(statusRec==='new'){
			$scope.pesanStatus ="NEW RECORD";
			// new transaksi
			if(!isNaN(parseFloat(idReg)) && isFinite(idReg)){			
				registrasiFactory
					.getById(idReg)	
					.success(function(data){
						$scope.registrasi=data;		
						setDokter($scope.registrasi.dokter);						
						growl.addWarnMessage('Success loading !!!');										
					})
					.error(function(data){
						growl.addWarnMessage('Error loading !!!');			
						$scope.pesanStatus ="ERROR LOADING EDIT";
					})		
			}else{
				growl.addWarnMessage("Error Loading data pasien !!");
				$scope.pesanStatus ="ERROR LODING DATA";
			}	
		}else{
			// Edit transaksi
			$scope.pesanStatus ="EDIT";		
			if(statusRec==='edit'){
				transaksiFactory
					.getById(idReg)
					.success(function(data){
						$scope.transaksiHd=data;
						$scope.registrasi=data.registration;
						setDokter($scope.registrasi.dokter);	
						growl.addWarnMessage('Success loading !!!');	
						isiTable();
						if($scope.transaksiHd.isApprove==true){
							$scope.isApproved = true; 	
							$scope.pesanStatus ="APPROVED";											
						};
						if($scope.transaksiHd.isVoid==true){
							$scope.isVoided = true;		
							$scope.pesanStatus ="VOID";										
						};						
					})	
					.error(function(data){
						growl.addWarnMessage('Error loading !!!');	
					})				
			}
		}		
		getAllTindakan();
	};

    startModule();	
	
}]);