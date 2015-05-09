appControllers.controller('pasienDetilController', ['$scope','pasienFactory','growl','$filter','$routeParams','fieldGroupFactory',
    function($scope, pasienFactory, growl, $filter, $routeParams, fieldGroupFactory){
 
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

 	$scope.dataPekerjaans=[];

 	function getPekerjaan(){
 		console.log('get pendidikans');
 		fieldGroupFactory
 			.getAllPendidikan()
 			.success(function(data){
 				console.log('iterate');
 				
 				var dataPekerjaan;
 				angular.forEach(data, function(value, key) {
    				/* do something for all key: value pairs */
    				console.log(value.idField + "--" + value.fieldName +  "--" +key)
    				dataPekerjaan={
    					id:value.idField,
    					name:value.fieldName 
    				}
    				$scope.dataPekerjaans.push(dataPekerjaan);    				
				});
				console.log($scope.dataPekerjaans.length);
				selectedJob=0;
 			// 	var all=data;
				// $scope.pakerjaans; 				
 			})
 			.error(function(data){
 				growl.addWarnMessage("Error loading pekerjaan from server ");
 			})
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
		getPekerjaan();			
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