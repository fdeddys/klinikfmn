appControllers.controller('assessmentPerawatDetilController', ['$scope','pasienFactory','growl','$filter','$routeParams','registrasiFactory','assessmentFactory','$location',
    function($scope, pasienFactory, growl, $filter, $routeParams, registrasiFactory, assessmentFactory, $location){
 
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
		tools: null,
		notes: null,
		subjective: null,
		objective: null,
		assessment: null,
		plan: null
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

					assessmentFactory
						.getByNoReg(noReg)			
						.success(function(data){
							if(data===null){
								growl.addWarnMessage('assessment null')
							}else{
								if(data===''){
									growl.addWarnMessage('assessment kosong')	
								}else{
									$scope.assessment=data;
								}
							}
						})
						
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
				growl.addWarnMessage("success insert assessment ");

				registrasiFactory
					.updateAssessment($scope.registrasi.idRegistration)
					.success(function(data){
						growl.addWarnMessage("save update status assessment");
						$location.path('/assesmentPerawat');
					})
					.error(function(data){

					})

				growl.addWarnMessage('Save success !!!');
			})
			.error(function(data){
				growl.addWarnMessage('Error Save !!!');				
			});
	}

	$scope.closeDokter=function(){
		$location.path('/assesmentDokter');		
	};

	$scope.closePerawat=function(){
		$location.path('/assesmentPerawat');		
	};

	startModule();

}]);