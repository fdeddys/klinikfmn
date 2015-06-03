appControllers.controller('pasienDetilController', ['$scope','pasienFactory','growl','$filter','$routeParams','fieldGroupFactory','$location',
    function($scope, pasienFactory, growl, $filter, $routeParams, fieldGroupFactory, $location){
 
 	$scope.dataPendidikans=[];
 	$scope.dataPekerjaans=[];
 	$scope.dataAgamas=[];
 	
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
		active: 1,
		agama:null	
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
			console.log('searching data pas ' + noPass);		
			pasienFactory
				.getByNo(noPass)	
				.success(function(data){
					if(data===null | data ===''){
						growl.addWarnMessage('new Record !!!');				
					}else {
						$scope.pasien=data;			
						console.log("sukses dapet data pasien job : " + $scope.pasien.patientJob);
						growl.addWarnMessage('Success loading !!!');
						console.log('jalankan cek ' + $scope.pasien.patientJob);
						setPekerjaan($scope.pasien.patientJob);	
						setPendidikan($scope.pasien.education);				
						setAgama($scope.pasien.agama)
					}					
					
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
						active: 1,
						agama:null				
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
				active: 1,
				agama:null				
		 	};
		};

		getPendidikan();
		getAgama();
		console.log('jalankan cek ' + $scope.pasien.patientJob);
		getPekerjaan($scope.pasien.patientJob);
		$scope.today();	
				
	};

	$scope.simpan=function(){
		var vTgl1 = $filter('date')($scope.tgl,'yyyy-MM-dd');
		$scope.pasien.birthDate=vTgl1;
		$scope.pasien.education=$scope.selectedPendidikan.id;
		$scope.pasien.patientJob=$scope.selectedPekerjaan.id;
		$scope.pasien.agama=$scope.selectedAgama.id;
		if($scope.pasien.idPatient===null || $scope.pasien.idPatient==='' ){
			pasienFactory
				.insert($scope.pasien)	
				.success(function(data){
					$scope.pasien=data;
					growl.addWarnMessage('Save success !!!');
					$location.path('/registrasiDetil/'+data.patientNo);
				})
				.error(function(data){
					growl.addWarnMessage('Error Save !!!');				
				});
		}else{
			pasienFactory
				.update($scope.pasien.idPatient,$scope.pasien)	
				.success(function(data){
					// $scope.pasien=data;
					growl.addWarnMessage('Save success !!!');
				})
				.error(function(data){
					growl.addWarnMessage('Error Save !!!');				
				});
		}
		
	}

	function getPekerjaan(idRec){ 		
 		// temp jika edit record, ambil id nya utk selected pada SELECT
 		var selRec=null; 		
 		console.log("id rec = " + idRec);
 		fieldGroupFactory
 			.getAllPekerjaan()
 			.success(function(data){ 				
 			 	angular.forEach(data, function(value, key) {     				     				
					var dataPekerjaan={
				 		id:value.idField,
				 		name:value.fieldName 
				 	};				    	
				 	console.log('cek = ' + idRec + ' pekerjaan id =' + dataPekerjaan.id);			
				 	if(idRec==dataPekerjaan.id){
				 		selRec=dataPekerjaan;
				 		console.log(selRec.name);
				 	}
    				$scope.dataPekerjaans.push(dataPekerjaan);    				    				
				});	
				if(selRec==null){
					// jika terpilih tidak ada maka default SELECT ke 0
					$scope.selectedPekerjaan=$scope.dataPekerjaans[0];				
				}else{
					$scope.selectedPekerjaan=selRec;				
				}
				
 			})
 			.error(function(data){
 				growl.addWarnMessage("Error loading pekerjaan from server ");
 			})
 	};

 	function setPekerjaan(idRec){ 		
 		// temp jika edit record, ambil id nya utk selected pada SELECT
 		var selRec=null; 		
 		console.log("id rec = " + idRec);
 		fieldGroupFactory
 			.getAllPekerjaan()
 			.success(function(data){ 				
 			 	angular.forEach(data, function(value, key) {     				     				
					var dataPekerjaan={
				 		id:value.idField,
				 		name:value.fieldName 
				 	};				    	
				 	console.log('cek = ' + idRec + ' pekerjaan id =' + dataPekerjaan.id);			
				 	if(idRec==dataPekerjaan.id){
				 		selRec=dataPekerjaan;
				 		console.log(selRec.name);
				 	}    				
				});	
				if(selRec==null){										
				}else{
					$scope.selectedPekerjaan=selRec;				
				}
				
 			})
 			.error(function(data){
 				growl.addWarnMessage("Error loading pekerjaan from server ");
 			})
 	};


 	function getPendidikan(){
 		//console.log('get pendidikan routin');
 		fieldGroupFactory
 			.getAllPendidikan()
 			.success(function(data){
 				//console.log('iterate');
 			 	angular.forEach(data, function(value, key) {
     				// Iterate isi dari pendidikan
     				//console.log(value.idField + "--" + value.fieldName +  "--" +key)
					var dataPendidikan={
				 		id:value.idField,
				 		name:value.fieldName 
				 	};
  				    				
    				$scope.dataPendidikans.push(dataPendidikan);    				
    				//console.log($scope.dataPendidikans[$scope.dataPendidikans.length-1]);
				});	
				$scope.selectedPendidikan=$scope.dataPendidikans[0];			
 			})
 			.error(function(data){
 				growl.addWarnMessage("Error loading pekerjaan from server ");
 			})
 	};

	function setPendidikan(idRec){ 		
 		// temp jika edit record, ambil id nya utk selected pada SELECT
 		var selRec=null; 		 		
 		fieldGroupFactory
 			.getAllPendidikan()
 			.success(function(data){ 				
 			 	angular.forEach(data, function(value, key) {     				     				
					var dataPendidikan={
				 		id:value.idField,
				 		name:value.fieldName 
				 	};				    	
				 	console.log('cek = ' + idRec + ' data Pendidikan id =' + dataPendidikan.id);			
				 	if(idRec==dataPendidikan.id){
				 		selRec=dataPendidikan;
				 		console.log(selRec.name);
				 	}    				
				});	
				if(selRec==null){										
				}else{
					$scope.selectedPendidikan=selRec;				
				}
				
 			})
 			.error(function(data){
 				growl.addWarnMessage("Error loading pekerjaan from server ");
 			})
 	};

 	function getAgama(){
 		
 		fieldGroupFactory
 			.getAllAgama()
 			.success(function(data){ 				
 			 	angular.forEach(data, function(value, key) {
					var dataAgama={
				 		id:value.idField,
				 		name:value.fieldName 
				 	};
    				$scope.dataAgamas.push(dataAgama);    				    				
				});	
				$scope.selectedAgama=$scope.dataAgamas[0];			
 			})
 			.error(function(data){
 				growl.addWarnMessage("Error loading agama from server ");
 			})
 	};

	function setAgama(idRec){ 		
 		
 		var selRec=null; 		 		
 		fieldGroupFactory
 			.getAllAgama()
 			.success(function(data){ 				
 			 	angular.forEach(data, function(value, key) {     				     				
					var dataAgama={
				 		id:value.idField,
				 		name:value.fieldName 
				 	};				    					 	
				 	if(idRec==dataAgama.id){
				 		selRec=dataAgama;				 		
				 	}    				
				});	
				if(selRec==null){										
				}else{
					$scope.selectedAgama=selRec;				
				}				
 			})
 			.error(function(data){
 				growl.addWarnMessage("Error loading Agama from server ");
 			})
 	};

	startModule();

}]);