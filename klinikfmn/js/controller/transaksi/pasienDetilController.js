appControllers.controller('pasienDetilController', ['$scope','pasienFactory','growl','$filter','$routeParams',
    function($scope, pasienFactory, growl, $filter, $routeParams){
 
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
		}
		$scope.today();				
	};

	$scope.simpan=function(){
		var vTgl1 = $filter('date')($scope.tgl,'yyyy-MM-dd');
		$scope.pasien.birthDate=vTgl1;

		pasienFactory
			.insert($scope.pasien)	
			.success(function(data){
				$scope.pasien=data;
				growl.addWarnMessage('Save success !!!');
			})
			.error(function(data){
				growl.addWarnMessage('Error Save !!!');				
			});
	}

	startModule();

}]);