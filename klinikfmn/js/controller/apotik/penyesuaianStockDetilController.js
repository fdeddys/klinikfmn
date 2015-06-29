appControllers.controller('penyesuaianStockDetilController', ['$scope','$filter', 'adjustmentStockFactory','growl','$rootScope','$location', '$routeParams','penerimaanBarangFactory',
	function($scope, $filter, adjustmentStockFactory, growl, $rootScope, $location, $routeParams, penerimaanBarangFactory){
	

	//VARIABEL

	$scope.pesanStatus="NEW";
	$scope.adjusmentDetils=[];

	$scope.isVoided=false;
	$scope.isApproved=false;

	$scope.adjusmentHd={
		idProductAdjustHdr: '0',
		productAdjustNo: '',
		productAdjustDate: new Date(),
		notes: '-',
		isApprove: false,
		isVoid: false,
		usrUpdate: '',
		lastUpdate: null
	}

	$scope.adjusmentDt={
		idProductAdjustDtl: null,
		productAdjustHdr: null,
		product: null,
		qty: 1,
		price: 0,
		unit: null,
		usrUpdate: '',
		lastUpdate: null
	}
    
    
	function getAllObat(){    	
		$scope.obats=[];
		penerimaanBarangFactory
			.getProduct(1000,1)
			.success(function(data){
				$scope.obats=data.content;				
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
		if($scope.adjusmentHd.idProductAdjustHdr=='0'){
			var vTgl = $filter('date')($scope.adjusmentHd.productAdjustDate,'yyyy-MM-dd');
	
			var userId=$rootScope.globals.currentUser.username
			
			$scope.adjusmentHd.productAdjustDate=vTgl;
			$scope.adjusmentHd.usrUpdate=userId;
			//$scope.adjusmentHd.lastUpdate=vTglUpdate;
			adjustmentStockFactory
				.saveHdr($scope.adjusmentHd)
				.success(function(data){
					$scope.adjusmentHd=data;
					$scope.pesanStatus="NOT APPROVE";

					if($scope.obatSelected==null){
						growl.addWarnMessage('Obat belum diisi !!!');
					}else{
						if($scope.adjusmentDt.qty==0 ){
							growl.addWarnMessage('qty harus lebih dari 0 !!!');
						}else{
							var userId=$rootScope.globals.currentUser.username;

							$scope.adjusmentDt.price=$scope.obatSelected.salesPrice;
							$scope.adjusmentDt.product=$scope.obatSelected;
							$scope.adjusmentDt.productAdjustHdr=$scope.adjusmentHd;
							$scope.adjusmentDt.usrUpdate=userId;
							adjustmentStockFactory
								.saveDtl($scope.adjusmentHd.idProductAdjustHdr ,$scope.adjusmentDt)
								.success(function(data){
									// REFRESH LIST DETIL	
									getAllDetilAdjusment();
									$scope.obatSelected=null;
									$scope.adjusmentDt=null;

								})						
						}	
					}

				})				
			
			//console.log($scope.adjusmentHd)
		}else{
			//console.log('id tidak 0 => ' + $scope.adjusmentHd.idProductRecieveHdr)
			console.log($scope.adjusmentDt);

			if($scope.obatSelected==null){
				growl.addWarnMessage('Obat belum diisi !!!');
			}else{
				if($scope.adjusmentDt.qty==0 ){
					growl.addWarnMessage('qty harus lebih dari 0 !!!');
				}else{
					var userId=$rootScope.globals.currentUser.username;

					$scope.adjusmentDt.price=$scope.obatSelected.salesPrice;
					$scope.adjusmentDt.product=$scope.obatSelected;
					$scope.adjusmentDt.productAdjustHdr=$scope.adjusmentHd;
					$scope.adjusmentDt.usrUpdate=userId;
					adjustmentStockFactory
						.saveDtl($scope.adjusmentHd.idProductAdjustHdr ,$scope.adjusmentDt)
						.success(function(data){
							// REFRESH LIST DETIL	
							getAllDetilAdjusment();
							$scope.obatSelected=null;
							$scope.adjusmentDt=null;

						})						
				}	
			}
		}
	};

	function getAllDetilAdjusment() {
		console.log('masuk get all detil');
		adjustmentStockFactory
			.getAllDetilByIdHdr($scope.adjusmentHd.idProductAdjustHdr)
			.success(function(data){
				$scope.adjusmentDetils=data;
				

				// if($scope.adjusmentDetils!=null){
				// 	$scope.adjusmentDetils=null
				// }
				//$scope.adjusmentDetils=data;
				
				// angular.forEach(data,function(adjusmentDetil,key){
				// 	$scope.adjusmentDetils.push(adjusmentDetil);

				// 	penerimaanBarangFactory
				// 		.getUnitName($scope.adjusmentDetils[key].product.unit)
				// 		.success(function(data){
				// 			$scope.adjusmentDetils[key].product.unit=data.fieldName;		
				// 		})					
				// 	console.log(key);
				// })
				//console.log($scope.adjusmentDetils.length);
			});

	}

	$scope.listPenerimaan=function(){
		$location.path('/adjustmentStock');
	}

	$scope.deleteDetil=function(idDetil){
		adjustmentStockFactory
			.deleteDetil($scope.adjusmentHd.idProductAdjustHdr, idDetil)
			.success(function(data){
				getAllDetilAdjusment();	
			})
			.error(function(data){
				growl.addWarnMessage(data);
			})
	}

	$scope.approve=function(){
		if($scope.adjusmentHd.idProductAdjustHdr!='0'){
			var vTgl = $filter('date')($scope.adjusmentHd.productAdjustDate,'yyyy-MM-dd');
			var userId=$rootScope.globals.currentUser.username
			
			$scope.adjusmentHd.productAdjustDate=vTgl;
			$scope.adjusmentHd.usrUpdate=userId;
			//$scope.adjusmentHd.lastUpdate=vTglUpdate;
			adjustmentStockFactory
				.updateHdr($scope.adjusmentHd,$scope.adjusmentHd.idProductAdjustHdr )
				.success(function(data){
					//$scope.adjusmentHd=data;
					$scope.pesanStatus="NOT APPROVE";

					adjustmentStockFactory
						.approve($scope.adjusmentHd.idProductAdjustHdr, userId)
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
			
			//console.log($scope.adjusmentHd)
		}else{
			growl.addWarnMessage("Data tidak ada yang di approve !!! " +$scope.adjusmentHd.idProductAdjustHdr);
		}
	}

	function startModule(){			
		$scope.today();		
				
		getAllObat();
		if($routeParams.idAdjust=='0'){
			$scope.adjusmentHd.idProductAdjustHdr='0';

		}else{
			adjustmentStockFactory
				.getById($routeParams.idAdjust)
				.success(function(data){
					$scope.adjusmentHd=data;

					$scope.pesanStatus="NOT APPROVE";
					if($scope.adjusmentHd.isApprove==1){
						$scope.pesanStatus="APPROVED";
						$scope.isApproved=true;
					};
					if($scope.adjusmentHd.isVoid==1){
						$scope.pesanStatus="VOID";
						$scope.isVoided=true;						
					};					

					getAllDetilAdjusment();
				})
		}
	};

	
	startModule();

}])