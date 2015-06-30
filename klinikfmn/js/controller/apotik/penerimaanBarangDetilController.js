appControllers.controller('penerimaanBarangDetilController', ['$scope','$filter', 'penerimaanBarangFactory','growl','$rootScope','$location', '$routeParams',
	function($scope, $filter, penerimaanBarangFactory, growl, $rootScope, $location, $routeParams){
	

	//VARIABEL

	$scope.pesanStatus="NEW";
	$scope.penerimaanDetils=[];

	$scope.isVoided=false;
	$scope.isApproved=false;

	$scope.penerimaanHd={
		idProductRecieveHdr: '0',
		productRecieveNo: '',
		productRecieveDate: new Date(),
		supplier: null,
		invoiceNo: '',
		total: 0,
		notes: '',
		isApprove: 0,
		isVoid: 0,
		isPaid: 0,
		usrUpdate: null,
		lastUpdate: null
	}

	$scope.penerimaanDt={
		idProductRecieveDtl: null,
		productRecieveHdr: null,
		product: null,
		qty: 0,
		price: 0,
		usrUpdate: null,
		lastUpdate: null
	}

	//$scope.supplierSelected = '';
    $scope.suppliers;     
    function getAllSupplier(){    	
		penerimaanBarangFactory
			.getSupplier(1000,1)
			.success(function(data){
				$scope.suppliers=data.content;
			})
			.error(function(data){

			});
	};   

    //$scope.obatSelected = '';
    

	function getAllObat(){    	
		$scope.obats=[];
		penerimaanBarangFactory
			.getProduct(1000,1)
			.success(function(data){
				$scope.obats=data.content;
				
				// angular.forEach(data.content,function(obat,key){
				// 	$scope.obats.push(obat);

				// 	penerimaanBarangFactory
				// 		.getUnitName($scope.obats[key].unit)
				// 		.success(function(data){
				// 			$scope.obats[key].unit=data.fieldName;		
				// 		})					
				// 	//console.log(key);
				// })
				console.log($scope.obats);
			})
			.error(function(data){

			});
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

	$scope.simpan=function(){
		if($scope.penerimaanHd.idProductRecieveHdr=='0'){
			var vTgl = $filter('date')($scope.penerimaanHd.productRecieveDate,'yyyy-MM-dd');
			if($scope.penerimaanHd.supplier==null){
				growl.addWarnMessage('Supplier kosong !!!');
			}else{
				var userId=$rootScope.globals.currentUser.username
				
				$scope.penerimaanHd.productRecieveDate=vTgl;
				$scope.penerimaanHd.usrUpdate=userId;
				$scope.penerimaanHd.idProductRecieveHdr=null;
				//$scope.penerimaanHd.lastUpdate=vTglUpdate;
				penerimaanBarangFactory
					.saveHdr($scope.penerimaanHd)
					.success(function(data){
						$scope.penerimaanHd=data;
						$scope.pesanStatus="NOT APPROVE";
					})				
			}
			//console.log($scope.penerimaanHd)
		}else{
			//console.log('id tidak 0 => ' + $scope.penerimaanHd.idProductRecieveHdr)
			console.log($scope.penerimaanDt);

			if($scope.obatSelected==null){
				growl.addWarnMessage('Obat belum diisi !!!');
			}else{
				if($scope.penerimaanDt.qty==0 ){
					growl.addWarnMessage('qty harus lebih dari 0 !!!');
				}else{
					var userId=$rootScope.globals.currentUser.username;

					$scope.penerimaanDt.price=$scope.obatSelected.salesPrice;
					$scope.penerimaanDt.product=$scope.obatSelected;
					$scope.penerimaanDt.productRecieveHdr=$scope.penerimaanHd;
					$scope.penerimaanDt.usrUpdate=userId;
					penerimaanBarangFactory
						.saveDtl($scope.penerimaanHd.idProductRecieveHdr ,$scope.penerimaanDt)
						.success(function(data){
							// REFRESH LIST DETIL	
							getAllDetilPenerimaan();
							$scope.obatSelected=null;
							$scope.penerimaanDt=null;

						})						
				}	
			}
		}
	};

	function getAllDetilPenerimaan () {
		penerimaanBarangFactory
			.getAllDetilByIdHdr($scope.penerimaanHd.idProductRecieveHdr)
			.success(function(data){
				$scope.penerimaanDetils=[];

				// if($scope.penerimaanDetils!=null){
				// 	$scope.penerimaanDetils=null
				// }
				//$scope.penerimaanDetils=data;
				angular.forEach(data,function(penerimaanDetil,key){
					$scope.penerimaanDetils.push(penerimaanDetil);

					penerimaanBarangFactory
						.getUnitName($scope.penerimaanDetils[key].product.unit)
						.success(function(data){
							$scope.penerimaanDetils[key].product.unit=data.fieldName;		
						})					
					//console.log(key);
				})
			});
	}

	$scope.listPenerimaan=function(){
		$location.path('/penerimaanApotik');
	}

	$scope.deleteDetil=function(idDetil){
		penerimaanBarangFactory
			.deleteDetil($scope.penerimaanHd.idProductRecieveHdr, idDetil)
			.success(function(data){
				getAllDetilPenerimaan();	
			})
			.error(function(data){
				growl.addWarnMessage(data);
			})
	}

	$scope.approve=function(){
		if($scope.penerimaanHd.idProductRecieveHdr!='0'){
			var vTgl = $filter('date')($scope.penerimaanHd.productRecieveDate,'yyyy-MM-dd');
			if($scope.penerimaanHd.supplier==null){
				growl.addWarnMessage('Supplier kosong !!!');
			}else{
				var userId=$rootScope.globals.currentUser.username
				
				$scope.penerimaanHd.productRecieveDate=vTgl;
				$scope.penerimaanHd.usrUpdate=userId;
				//$scope.penerimaanHd.lastUpdate=vTglUpdate;
				penerimaanBarangFactory
					.updateHdr($scope.penerimaanHd,$scope.penerimaanHd.idProductRecieveHdr )
					.success(function(data){
						//$scope.penerimaanHd=data;
						$scope.pesanStatus="NOT APPROVE";

						penerimaanBarangFactory
							.approvePenerimaan($scope.penerimaanHd.idProductRecieveHdr, userId)
							.success(function(data){								
								$scope.pesanStatus="APPROVE";
								$scope.isApprove=true;								
							})				
							.error(function(data){
								growl.addWarnMessage("Error approve")
							})
					})
					.error(function(data){
						growl.addWarnMessage("Error save Penerimaan hdr ");
					})				
			}
			//console.log($scope.penerimaanHd)
		}else{
			growl.addWarnMessage("Data tidak ada yang di approve !!! " +$scope.penerimaanHd.idProductRecieveHdr);
		}
	}

	function startModule(){			
		$scope.today();		
		getAllSupplier();		
		getAllObat();
		if($routeParams.idTerima=='0'){

		}else{
			penerimaanBarangFactory
				.getById($routeParams.idTerima)
				.success(function(data){
					$scope.penerimaanHd=data;

					$scope.pesanStatus="NOT APPROVE";
					if($scope.penerimaanHd.isApprove==1){
						$scope.pesanStatus="APPROVED";
						$scope.isApproved=true;
					};
					if($scope.penerimaanHd.isVoid==1){
						$scope.pesanStatus="VOID";
						$scope.isVoided=true;						
					};
					if($scope.penerimaanHd.isPaid==1){
						$scope.pesanStatus="PAID";
					};

					getAllDetilPenerimaan();
				})
		}
	};

	
	startModule();

}])