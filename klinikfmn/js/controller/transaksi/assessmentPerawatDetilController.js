appControllers.controller('assessmentPerawatDetilController', ['$scope','pasienFactory','growl','$filter','$routeParams','registrasiFactory','assessmentFactory',
    function($scope, pasienFactory, growl, $filter, $routeParams, registrasiFactory, assessmentFactory){
 
 	$scope.registrasi={ 					
		idRegistration: null,
		registrationNo: null,
		patient: {
			idPatient: null,
			patientNo: null,
			patientName: null,
			sex: null,
			birthDate: null,
			patientAddress: null,
			patientCity: null,
			patientPostCode: null,
			patientPhone: null,
			patientJob: null,
			education: null,
			alergy: null,
			emergencyName: null,
			emergencyAddress: null,
			emergencyCity: null,
			emergencyPostCode: null,
			emergencyPhone: null,
			emergencyJob: null,
			active: null
		},
		registrationDate: null,
		registrationTime: null,
		isVoid: null,
		usrUpdate: null,
		lastUpdate: null	
 	};

 	$scope.assessment={
 		idAssessment: null,
		registration: null,
		sistolic: null,
		diastolic: null,
		heartRate: null,
		respiratoryRate: null,
		temperature: null,
		height: null,
		weight: null,
		tools: null
 	}


	function startModule(){
		
		var noReg=$routeParams.noReg;
		//if(!isNaN(parseFloat(noReg)) && isFinite(noReg)){
			//alert('numeric');
			registrasiFactory
				.getByNo(noReg)	
				.success(function(data){
					$scope.registrasi=data;		
					growl.addWarnMessage('Success loading !!!');				
				})
				.error(function(data){
					growl.addWarnMessage('Error loading !!!');		
				})		
		//}else{
			growl.addWarnMessage("Error Loading data pasien !!");
		//}
		
	};

	$scope.simpan=function(){
		// var vTgl = $filter('date')($scope.tgl,'yyyy-MM-dd');		
		// $scope.registrasi.registrationDate=vTgl;
		// $scope.registrasi.patient = $scope.pasien;

		$scope.assessment.registration=$scope.registrasi;

		assessmentFactory
			.insert($scope.assessment)	
			.success(function(data){
				$scope.assessment=data;
				growl.addWarnMessage('Save success !!!');
			})
			.error(function(data){
				growl.addWarnMessage('Error Save !!!');				
			});
	}

	startModule();

}]);