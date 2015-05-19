appServices.factory('registrasiFactory',['$http','$rootScope',
	function($http,$rootScope){

	var urlApi = $rootScope.pathServerJSON + '/registration';
	var registrasiFactory={};


	registrasiFactory.getAllByNamaNoRegTglPage=function(nama, noReg, tgl, hal, jumlah){		
		return $http({
			method:'GET',
			url:urlApi + '/date/'+ tgl + '/patientno/' + noReg + '/name/' + nama + '/size/' + jumlah + '/number/' + hal 
		});			
	};

	registrasiFactory.getAll=function(){
		return $http({
			method:'GET',
			url : urlApi + '/'
		})
	};

	registrasiFactory.getAllByPage=function(hal, jumlah){		
		return $http({
			method:'GET',
			url:urlApi + '/size/' + jumlah + '/number/' + hal 
		});			
	};
	
	registrasiFactory.getById=function(id){
		return $http({
			method:'GET',
			url:urlApi + '/id/' + id		
		});
	};

	registrasiFactory.getByNo=function(no){
		return $http({
			method:'GET',
			url:urlApi + '/no/' + no		
		});
	};

	registrasiFactory.getTglReg=function(tglReg, hal, jumlah){
		return $http({
			method:'GET',
			url:urlApi + '/date/' + tglReg + '/size/' + jumlah + '/number/' + hal	
		});
	};

	registrasiFactory.getNameTglReg=function(name, tglReg,  hal, jumlah){
		return $http({
			method:'GET',
			url:urlApi + '/date/' + tglReg + '/name/'+ name + '/size/' + jumlah + '/number/' + hal	
		});
	};	

	registrasiFactory.insert = function(registrasi){
		return $http({
			method:'POST',
			url:urlApi +'/',
			data:JSON.stringify(registrasi),
			headers:{'Content-Type':'application/json'}
		});
	};

	registrasiFactory.update  = function(id,registrasi){
		return $http({
			method:'PUT',
			url:urlApi + '/'+ id,
			data:JSON.stringify(registrasi)
		});
	};

	registrasiFactory.deleteRec = function (id){
		return $http({
			method:'DELETE',
			url:urlApi + '/' + id
		});
	}

	registrasiFactory.updateAssessment = function (idReg){
		return $http({
			method:'PUT',
			url:urlApi + '/id/' + idReg + '/assess'
		});
	}

	return registrasiFactory;

}]);