appControllers.controller('registrasiDetilController', ['$scope','pasienFactory','growl','$filter','$routeParams','registrasiFactory',
    function($scope, pasienFactory, growl, $filter, $routeParams, registrasiFactory){
 
 	$scope.pasien={ 		
		idPatient: null,
		patientNo: null,
		patientName: null,
		sex: 'L',
		birthDate: null,
		patientAddress: null,
		patientCity: null,
		patientPostCode: null,
		patientPhone: null,
		patientJob: 1,
		education: 1,
		alergy: '-',
		emergencyName: '-',
		emergencyAddress: '-',
		emergencyCity: '-',
		emergencyPostCode: '-',
		emergencyPhone: '-',
		emergencyJob: '-',
		active: 1		
 	};

 	$scope.registrasi ={
		idRegistration: null,
		registrationNo: null,
		patient: null,
		registrationDate: null,
		registrationTime: null,
		isVoid: 0,
		usrUpdate: null,
		lastUpdate: new Date()
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
		
		var noPass=$routeParams.noPass;
		if(!isNaN(parseFloat(noPass)) && isFinite(noPass)){
			//alert('numeric');
			pasienFactory
				.getByNo(noPass)	
				.success(function(data){
					$scope.pasien=data;		
					growl.addWarnMessage('Success loading !!!');				
				})
				.error(function(data){
					growl.addWarnMessage('Error loading !!!');		
					$scope.pasien={ 		
						idPatient: null,
						patientNo: null,
						patientName: null,
						sex: 'L',
						birthDate: null,
						patientAddress: null,
						patientCity: null,
						patientPostCode: null,
						patientPhone: null,
						patientJob: 1,
						education: 1,
						alergy: '-',
						emergencyName: '-',
						emergencyAddress: '-',
						emergencyCity: '-',
						emergencyPostCode: '-',
						emergencyPhone: '-',
						emergencyJob: '-',
						active: 1				
				 	};		
				})		
		}else{
			growl.addWarnMessage("Error Loading data pasien !!");
		}
		$scope.today();				
	};

	$scope.simpan=function(){
		var vTgl = $filter('date')($scope.tgl,'yyyy-MM-dd');		
		//var vJam = $filter('date')($scope.tgl,'HH:mm:ss Z');		

		$scope.registrasi.registrationDate=vTgl;
		// $scope.registrasi.registrationTime=vJam;
		$scope.registrasi.patient = $scope.pasien;
		// $scope.pasien;


		// regist ={
		// 	idRegistration: null,
		// 	registrationNo: null,
		// 	patient: null,
		// 	registrationDate: null,
		// 	registrationTime: null,
		// 	isVoid: null,
		// 	usrUpdate: null,
		// 	lastUpdate: null
		// }

		registrasiFactory
			.insert($scope.registrasi )	
			.success(function(data){
				$scope.registrasi=data;
				growl.addWarnMessage('Save success !!!');
			})
			.error(function(data){
				growl.addWarnMessage('Error Save !!!');				
			});
	}

	startModule();

}]);