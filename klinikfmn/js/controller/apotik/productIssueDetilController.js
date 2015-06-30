appControllers.controller('productIssueDetilController', ['$scope','$filter', 'productIssueFactory','growl','$rootScope','$location', '$routeParams','penerimaanBarangFactory',
	function($scope, $filter, productIssueFactory, growl, $rootScope, $location, $routeParams, penerimaanBarangFactory){
	

	//VARIABEL

	$scope.pesanStatus="NEW";
	$scope.issueDetils=[];

	$scope.isVoided=false;
	$scope.isApproved=false;

	$scope.issueHd={
		idProductIssueHdr: '0',
		productIssueNo: '',
		productIssueDate: new Date(),
		notes: '-',
		isApprove: false,
		isVoid: false,
		usrUpdate: '',
		lastUpdate: null
	}

	$scope.issueDt={
		idProductIssueDtl: null,
		productIssueHdr: null,
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
		if($scope.issueHd.idProductIssueHdr=='0'){
			var vTgl = $filter('date')($scope.issueHd.productIssueDate,'yyyy-MM-dd');
	
			var userId=$rootScope.globals.currentUser.username
			
			$scope.issueHd.productIssueDate=vTgl;
			$scope.issueHd.usrUpdate=userId;
			//$scope.issueHd.lastUpdate=vTglUpdate;
			productIssueFactory
				.saveHdr($scope.issueHd)
				.success(function(data){
					$scope.issueHd=data;
					$scope.pesanStatus="NOT APPROVE";

					if($scope.obatSelected==null){
						growl.addWarnMessage('Obat belum diisi !!!');
					}else{
						if($scope.issueDt.qty==0 ){
							growl.addWarnMessage('qty harus lebih dari 0 !!!');
						}else{
							var userId=$rootScope.globals.currentUser.username;

							$scope.issueDt.price=$scope.obatSelected.averagePrice;
							$scope.issueDt.product=$scope.obatSelected;
							$scope.issueDt.productIssueHdr=$scope.issueHd;
							$scope.issueDt.usrUpdate=userId;
							$scope.issueDt.unit=$scope.obatSelected.unit;
							productIssueFactory
								.saveDtl($scope.issueHd.idProductIssueHdr ,$scope.issueDt)
								.success(function(data){
									// REFRESH LIST DETIL	
									getAllDetilIssue();
									$scope.obatSelected=null;
									$scope.issueDt=null;

								})						
						}	
					}

				})				
			
			//console.log($scope.issueHd)
		}else{
			//console.log('id tidak 0 => ' + $scope.issueHd.idProductRecieveHdr)
			console.log($scope.issueDt);

			if($scope.obatSelected==null){
				growl.addWarnMessage('Obat belum diisi !!!');
			}else{
				if($scope.issueDt.qty==0 ){
					growl.addWarnMessage('qty harus lebih dari 0 !!!');
				}else{
					var userId=$rootScope.globals.currentUser.username;

					$scope.issueDt.price=$scope.obatSelected.salesPrice;
					$scope.issueDt.product=$scope.obatSelected;
					$scope.issueDt.productIssueHdr=$scope.issueHd;
					$scope.issueDt.usrUpdate=userId;
					$scope.issueDt.unit=$scope.obatSelected.unit;
					productIssueFactory
						.saveDtl($scope.issueHd.idProductIssueHdr ,$scope.issueDt)
						.success(function(data){
							// REFRESH LIST DETIL	
							getAllDetilIssue();
							$scope.obatSelected=null;
							$scope.issueDt=null;

						})						
				}	
			}
		}
	};

	function getAllDetilIssue() {
		console.log('masuk get all detil');
		productIssueFactory
			.getAllDetilByIdHdr($scope.issueHd.idProductIssueHdr)
			.success(function(data){
				$scope.issueDetils=data;
			});

	}

	$scope.listPenerimaan=function(){
		$location.path('/productIssue');
	}

	$scope.deleteDetil=function(idDetil){
		productIssueFactory
			.deleteDetil($scope.issueHd.idProductIssueHdr, idDetil)
			.success(function(data){
				getAllDetilAdjusment();	
			})
			.error(function(data){
				growl.addWarnMessage(data);
			})
	}

	$scope.approve=function(){
		if($scope.issueHd.idProductIssueHdr!='0'){
			var vTgl = $filter('date')($scope.issueHd.productIssueDate,'yyyy-MM-dd');
			var userId=$rootScope.globals.currentUser.username
			
			$scope.issueHd.productIssueDate=vTgl;
			$scope.issueHd.usrUpdate=userId;
			//$scope.issueHd.lastUpdate=vTglUpdate;
			productIssueFactory
				.updateHdr($scope.issueHd,$scope.issueHd.idProductIssueHdr )
				.success(function(data){
					//$scope.issueHd=data;
					$scope.pesanStatus="NOT APPROVE";

					productIssueFactory
						.approve($scope.issueHd.idProductIssueHdr, userId)
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
			//console.log($scope.issueHd)
		}else{
			growl.addWarnMessage("Data tidak ada yang di approve !!! " +$scope.issueHd.idProductIssueHdr);
		}
	};

	$scope.void=function(){

    	var userName =$rootScope.globals.currentUser.username;
    	productIssueFactory
    		.void($scope.issueHd.idProductIssueHdr, userName)
    		.success(function(data){
    			$scope.isVoided = true; 	
	 			growl.addWarnMessage("success void");
	 			$scope.pesanStatus ="VOID";	
    		})
    		.error(function(data){
    			growl.addWarnMessage("Error void data !!");
    		})
    };

	function startModule(){			
		$scope.today();		
				
		getAllObat();
		if($routeParams.idIssue=='0'){
			$scope.issueHd.idProductIssueHdr='0';

		}else{
			productIssueFactory
				.getById($routeParams.idIssue)
				.success(function(data){
					$scope.issueHd=data;

					$scope.pesanStatus="NOT APPROVE";
					if($scope.issueHd.isApprove==1){
						$scope.pesanStatus="APPROVED";
						$scope.isApproved=true;
					};
					if($scope.issueHd.isVoid==1){
						$scope.pesanStatus="VOID";
						$scope.isVoided=true;						
					};					

					getAllDetilIssue();
				})
		}
	};

	
	startModule();

}])