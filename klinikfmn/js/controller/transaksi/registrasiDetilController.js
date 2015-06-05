appControllers.controller('registrasiDetilController', ['$scope','pasienFactory','growl','$filter','$routeParams','registrasiFactory','fieldGroupFactory','$location',
    function($scope, pasienFactory, growl, $filter, $routeParams, registrasiFactory, fieldGroupFactory, $location){
 
 	$scope.dokters=[]; 	
 	$scope.selectedDokter;

 	$scope.floors=[];
 	$scope.selectedFloor;

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
		isVoid: false,
		isClosed: false,
		usrUpdate: null,
		dokter: null,
		isAssess: 0,
		lastUpdate: null,
		floor: 0
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
		getAllDokter();
		getAllFloor();
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
				$scope.selectedDokter=$scope.dokters[0];			
 			})
 			.error(function(data){
 				growl.addWarnMessage("Error loading data dokter from server ");
 			})
	};

	function getAllFloor(){
		fieldGroupFactory
 			.getAllFloor()
 			.success(function(data){ 				

 			//  	angular.forEach(data, function(value, key) {
				// 	var floor={
				//  		id:value.idField,
				//  		name:value.fieldName 
				//  	};
    // 				$scope.floors.push(floor);    				    				
				// });	
				// $scope.selectedFloor=$scope.floors[0];			
				$scope.floors=data;
				$scope.selectedFloor=data[0];
 			})
 			.error(function(data){
 				growl.addWarnMessage("Error loading data floor from server ");
 			})
	};

	$scope.simpan=function(){
		var vTgl = $filter('date')($scope.tgl,'yyyy-MM-dd');		
		//var vJam = $filter('date')($scope.tgl,'HH:mm:ss Z');		

		$scope.registrasi.registrationDate=vTgl;
		// $scope.registrasi.registrationTime=vJam;
		$scope.registrasi.patient = $scope.pasien;
		// $scope.pasien;
		$scope.registrasi.dokter = $scope.selectedDokter.id;
		$scope.registrasi.floor= $scope.selectedFloor;
		registrasiFactory
			.insert($scope.registrasi )	
			.success(function(data){
				$scope.registrasi=data;
				growl.addWarnMessage('Save success !!!');
				$location.path('/registrasi');
			})
			.error(function(data){
				growl.addWarnMessage('Error Save !!!');				
			});
	}

	startModule();

}]);