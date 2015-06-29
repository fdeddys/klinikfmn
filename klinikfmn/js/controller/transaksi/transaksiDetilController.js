appControllers.controller('transaksiDetilController', ['$scope','transaksiFactory','registrasiFactory','$routeParams','growl','tindakanFactory','fieldGroupFactory','transaksiDetilFactory', '$location','$rootScope','penerimaanBarangFactory','$rootScope',
    function($scope, transaksiFactory, registrasiFactory, $routeParams, growl, tindakanFactory, fieldGroupFactory, transaksiDetilFactory, $location, $rootScope, penerimaanBarangFactory, $rootScope){
        
    //untuk temp tarif group yg sudah di pilih    
    $scope.tarifSelected = '';
    $scope.tarifs;    
    $scope.isPaket=false;

    
    $scope.obats=[];
	$scope.obatSelected ='';

	$scope.dokters=[];
 	$scope.selectedDokter;

 	$scope.transaksiDetils=[];
 	$scope.transaksiObats=[];

 	$scope.isTarifVariabel=false;
 	$scope.tarifVariabel='';

 	// jika sudah approve atau void tidak bisa edit transaksi
 	$scope.isVoided = false;
 	$scope.isApproved = false;

 	// untuk tampilan di atas
 	$scope.pesanStatus ="NEW RECORD";

	// $scope.dateOptions = {
	// 		formatYear: 'yy',
	// 		startingDay: 1
	// 	};

	// Paging Transaksi
	$scope.totalItems;
	$scope.itemsPerPage= 5;
	$scope.currentPage = 1;   
	$scope.pageChanged=function(){

 		isiTable($scope.currentPage); 		  
    }; 

    // Paging Transaksi Obat
	$scope.totalItems2;
	$scope.itemsPerPage2= 5;
	$scope.currentPage2 = 1;   
	$scope.pageChanged2=function(){

 		isiTableTransaksiObat($scope.currentPage2); 		  
    }; 


	function getAllTindakan(){
		tindakanFactory
			.getAll(1000,1)
			.success(function(data){
				$scope.tarifs=data.content;
			})
			.error(function(data){
				growl.addWarnMessage('error loading tindakan from server ');
			});
	};

	function getAllObat(){
		penerimaanBarangFactory
			.getProduct()
			.success(function(data){
				$scope.obats = data.content;
			})
			.error(function(data){
				growl.addWarnMessage('error loading obat from server ');
			})
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

    $scope.transaksiObat={    
		idProductTransactionDtl: null,
		transactionHdr: null,
		product: null,
		qty: 0,
		price: 0,
		usrUpdate: '',
		lastUpdate: null
    };


    $scope.simpan=function(){
    	if($scope.tarifSelected.variable==true && $scope.tarifVariabel===''){    		
    		growl.addWarnMessage('tarif belum diisi !!!')    		
    	}else{
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
    	}
    	
    };

    $scope.simpanTransaksiObat=function(){
    	if( $scope.obatSelected===''){    		
    		growl.addWarnMessage('Obat belum diisi !!!')    		
    	}else{
	    	if($scope.transaksiHd.idTransactionHdr==='' || $scope.transaksiHd.idTransactionHdr===null){
	    		$scope.transaksiHd.registration = $scope.registrasi;
	    		transaksiFactory
	    			.insert($scope.transaksiHd)
	    			.success(function(data){
	    				$scope.transaksiHd 	= data;
	    				simpanDetilObat();
	    			})	
	    			.error(function(data){
	    				growl.addWarnMessage("Error save data !!");
	    			})
	    	}else{
	    		simpanDetilObat();
	    	}
    	}	
    }

    function simpanDetil(){

    	if($scope.tarifSelected.variable==true){
    		if($scope.tarifVariabel===''){
    			growl.addWarnMessage('tarif belum diisi !!!')
    			return ;
    		}else{
    			$scope.transaksiDt={    	
					idTransactionDtl: null,
					transactionHdr: $scope.transaksiHd,
					tariff: $scope.tarifSelected,
					rs: $scope.tarifVariabel,
					dokter: 0,
					harga: $scope.tarifVariabel,
					qty:1,
					paket: 0,
					idDokter: $scope.selectedDokter.id,
					usrUpdate: null,
					tglUpdate: null		
		    	};	
    		}
    	}else{
			if($scope.isPaket==false){

	    		$scope.transaksiDt={    	
					idTransactionDtl: null,
					transactionHdr: $scope.transaksiHd,
					tariff: $scope.tarifSelected,
					rs: $scope.tarifSelected.rs,
					dokter: $scope.tarifSelected.dokter,
					harga: $scope.tarifSelected.dokter + $scope.tarifSelected.rs,
					qty:1,
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
					qty:1,
					paket: 1,
					idDokter: $scope.selectedDokter.id,
					usrUpdate: null,
					tglUpdate: null		
		    	};
	    	}	    		    	
    	}

    	transaksiDetilFactory
			.insert($scope.transaksiDt, $scope.transaksiHd.idTransactionHdr)
			.success(function(data){
				//$scope.transaksiHd 	= data;
				// alert('success insert detil');
				$scope.tarifSelected='';
				$scope.isPaket=false;
				isiTable(1);
			})	
			.error(function(data){
				growl.addWarnMessage("Error save data !!");
			})

    };

    function simpanDetilObat(){
    	$scope.transaksiObat.transactionHdr = $scope.transaksiHd;
    	$scope.transaksiObat.usrUpdate = $rootScope.globals.currentUser.username;
    	$scope.transaksiObat.product = $scope.obatSelected;
    	$scope.transaksiObat.price = $scope.salesPrice
    	transaksiDetilFactory
			.insertObat($scope.transaksiObat, $scope.transaksiHd.idTransactionHdr)
			.success(function(data){
				//$scope.transaksiHd 	= data;
				// alert('success insert detil');
				$scope.obatSelected='';
				$scope.transaksiObat='';
				isiTableTransaksiObat(1);
			})	
			.error(function(data){
				growl.addWarnMessage("Error save data !!");
			})
    	//console.log($scope.transaksiObat)			
    }

    $scope.deleteTransaksiObat=function(idDetil){
    	transaksiDetilFactory
			.deleteTransaksiObat(idDetil, $scope.transaksiHd.idTransactionHdr)
			.success(function(data){				
				isiTableTransaksiObat(1);
			})	
			.error(function(data){
				growl.addWarnMessage("Error save data !!");
			})
    };

    $scope.deleteDetil=function(idDetil){
    	transaksiDetilFactory
			.deleteRec(idDetil, $scope.transaksiHd.idTransactionHdr)
			.success(function(data){				
				isiTable(1);
			})	
			.error(function(data){
				growl.addWarnMessage("Error save data !!");
			})
    };

    $scope.approve=function(){
    	var userName =$rootScope.globals.currentUser.username;
    	transaksiFactory
    		.approveTransaksi($scope.transaksiHd.idTransactionHdr, userName)
    		.success(function(data){
    			$scope.isApproved = true; 	
	 			growl.addWarnMessage("success approve");
	 			$scope.pesanStatus ="APPROVED";	
    		})
    		.error(function(data){
    			growl.addWarnMessage("Error approve data !!");
    		})

   //  	var tmpTrns;
   //  	transaksiFactory
			// .getById($scope.transaksiHd.idTransactionHdr)
			// .success(function(data){				
			// 	tmpTrns=data;
			// 	tmpTrns.isApprove = true;
			// 	transaksiFactory
			// 		.update($scope.transaksiHd.idTransactionHdr, tmpTrns)
			// 		.success(function(data){
			// 			$scope.isApproved = true; 	
			// 			growl.addWarnMessage("success approve");
			// 			$scope.pesanStatus ="APPROVED";				
			// 		})
			// 		.error(function(data){
			// 			growl.addWarnMessage("error  approve");
			// 		})
			// })	
			// .error(function(data){
			// 	growl.addWarnMessage("Error save data !!");
			// })	
    };

    $scope.listPasien=function(){
    	$location.path('/transaksi')
    }

    $scope.void=function(){

    	var userName =$rootScope.globals.currentUser.username;
    	transaksiFactory
    		.voidTransaksi($scope.transaksiHd.idTransactionHdr, userName)
    		.success(function(data){
    			$scope.isApproved = true; 	
	 			growl.addWarnMessage("success void");
	 			$scope.pesanStatus ="VOID";	
    		})
    		.error(function(data){
    			growl.addWarnMessage("Error void data !!");
    		})


   //  	var tmpTrns;
   //  	transaksiFactory
			// .getById($scope.transaksiHd.idTransactionHdr)
			// .success(function(data){				
			// 	tmpTrns=data;
			// 	tmpTrns.isVoid = true;
			// 	transaksiFactory
			// 		.update($scope.transaksiHd.idTransactionHdr, tmpTrns)
			// 		.success(function(data){
			// 			growl.addWarnMessage("success void");						
			// 			$scope.isVoided = true;		
			// 			$scope.pesanStatus ="VOID";																						
			// 		})
			// 		.error(function(data){
			// 			growl.addWarnMessage("error  void");
			// 		})
			// })	
			// .error(function(data){
			// 	growl.addWarnMessage("Error save data !!");
			// })	
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

 	function isiTable(hal){
 		transaksiDetilFactory
 			.getAllPage($scope.transaksiHd.idTransactionHdr,$scope.itemsPerPage, hal  )
 			.success(function(data){
 				// $scope.transaksiDetils=data;		
 				// growl.addWarnMessage("success loading isi table");
 				$scope.transaksiDetils=data.content;	
 				$scope.totalItems = data.totalElements;		

 			})
 			.error(function(data){
 				growl.addWarnMessage("error loading isi table");
 			}) 		
 	};

 	function isiTableTransaksiObat(hal){
 		transaksiDetilFactory
 			.getAllTransaksiObatPage($scope.transaksiHd.idTransactionHdr,$scope.itemsPerPage2, hal)
 			.success(function(data){
 				$scope.transaksiObats=data.content;		
 				$scope.totalItems2 = data.totalElements;		
 				growl.addWarnMessage("success loading isi table - obat");
 			})
 			.error(function(data){
 				growl.addWarnMessage("error loading isi table - obat");
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
						isiTable(1);
						isiTableTransaksiObat(1);
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
		getAllObat();
	};

	$scope.cekApakahVariable=function(){
		if($scope.tarifSelected.variable==true){
			$scope.isTarifVariabel=true;	
		}else{
			$scope.isTarifVariabel=false;	
			$scope.tarifVariabel='';
		}
		
	}
	

    startModule();	
	
}]);