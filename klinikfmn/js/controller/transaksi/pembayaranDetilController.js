appControllers.controller('pembayaranDetilController', ['$scope', '$routeParams','registrasiFactory', 'growl', 'fieldGroupFactory','transaksiFactory','pembayaranFactory','$filter',
	function($scope, $routeParams, registrasiFactory, growl, fieldGroupFactory, transaksiFactory, pembayaranFactory, $filter){
	
	$scope.registrasi;
	$scope.payment={
		idPayment: null,
		paymentNo: null,
		registration: null,
		paymentDate: new Date(),
		transactionTotal: 0,
		total: 0,
		disc: 0,
		ppn: 0,
		debitBank: null,
		creditBank: null,
		debit: 0,
		credit: 0,
		usrupdate: null,
		lastUpdate: null,
		pharmacyTotal: 0
	};

	$scope.xpayment={
		tunai:0
	};

	// jika sudah approve atau void tidak bisa edit transaksi
 	$scope.isVoided = false;
 	$scope.isApproved = false;

	$scope.subTotal=0;
	$scope.selectedBankDebet;
	$scope.selectedBankKredit;
	$scope.banks=[];
	$scope.transaksiHds=[];

	// Paging 
	$scope.totalItems;
	$scope.itemsPerPage= 5;
	$scope.currentPage = 1;     

	function startModule()	{
		//alert('start module');
		getAllBank();

		var idReg = $routeParams.idReg;
		registrasiFactory
			.getById(idReg)
			.success(function(data){
				$scope.registrasi = data;
				growl.addWarnMessage("Success load registrasi");
				
				transaksiFactory
					.getByNoRegPage($scope.registrasi.registrationNo,1,$scope.itemsPerPage)
					.success(function(data){					
						$scope.transaksiHds=data.content;
						$scope.totalItems = data.totalElements;		
						getTotalKlinik($scope.registrasi.registrationNo);	

				})
				.error(function(data){
					growl.addWarnMessage('Error loading from server !!!');
				})	

				
			})
			.error(function(data){
				growl.addWarnMessage("Error registrasi");
			})
	};

	function getAllTransaksiHd(halaman){
		transaksiFactory
			.getByNoRegPage($scope.registrasi.registrationNo,halaman,$scope.itemsPerPage)
			.success(function(data){					
				$scope.transaksiHds=data.content;
				$scope.totalItems = data.totalElements;						
			})
			.error(function(data){
				growl.addWarnMessage('Error loading from server !!!');
			})		
	};	

	$scope.pageChanged=function(){
 		getAllTransaksiHd($scope.currentPage); 		  
    };

    function getTotalKlinik(id){
    	var totalAll=0;
    	transaksiFactory
			.getByNoRegPage(id,1,1000)
			.success(function(data){					
				angular.forEach(data.content, function(value, key) {
					totalAll = totalAll + value.total;					
				});					
				$scope.payment.transactionTotal=totalAll;
				//ambil farmasi
				$scope.payment.pharmacyTotal=1000;

				// total in semua
				$scope.subTotal=$scope.payment.transactionTotal + $scope.payment.pharmacyTotal;

			})
			.error(function(data){
				growl.addWarnMessage('Error loading from server !!!');
			})	
    };

	function getAllBank(){
		var bank;
		fieldGroupFactory
 			.getAllBank()
 			.success(function(data){ 				
 			 	angular.forEach(data, function(value, key) {
					var bank={
				 		id:value.idField,
				 		name:value.fieldName 
				 	};
    				$scope.banks.push(bank);    				    				
				});	
				$scope.selectedBankKredit=$scope.banks[0];
				$scope.selectedBankDebet=$scope.banks[0];
							
 			})
 			.error(function(data){
 				growl.addWarnMessage("Error loading pekerjaan from server ");
 			})
	};

	$scope.approve=function(){
		var totalKembali = -1;
		totalKembali = ($scope.xpayment.tunai + $scope.payment.debit + $scope.payment.credit) - ($scope.subTotal - $scope.payment.disc ) ;
		growl.addWarnMessage(totalKembali);
		if(totalKembali==='NaN'){
			growl.addWarnMessage("Error total pembayaran NAN !!!")
		}else{
			if(totalKembali<0){
				growl.addWarnMessage("Pembayaran tidak cukup !!!")
			}else{
				if($scope.payment.debit>0){
					$scope.payment.debitBank=$scope.selectedBankDebet.id;
				};
				if($scope.payment.credit>0){
					$scope.payment.creditBank=$scope.selectedBankKredit.id;
				};
				var vTgl = $filter('date')(new Date(),'yyyy-MM-dd');	
				$scope.payment.paymentDate=vTgl;
				$scope.payment.registration = $scope.registrasi;
				// $scope.payment={
				// 	idPayment: '',
				// 	paymentNo: null,
				// 	registration: null,
				// 	paymentDate: null,
				// 	transactionTotal: 0,
				// 	total: 0,
				// 	disc: 0,
				// 	ppn: 0,
				// 	debitBank: null,
				// 	creditBank: null,
				// 	debit: 0,
				// 	credit: 0,
				// 	usrupdate: null,
				// 	lastUpdate: null,
				// 	pharmacyTotal: 0
				// };

				pembayaranFactory
					.insert($scope.payment)
					.success(function(data){
						$scope.payment=data;	
						$scope.isApproved = true;
					})
					.error(function(data){
						growl.addWarnMessage("error save data ");
					})
			}	
		}
				
	};

	startModule();
}])
