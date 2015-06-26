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
			url:urlApi + '/id/'+ id,
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
	};

	//api/registration/id/{idRegistration}/closed/{isClosed}
	registrasiFactory.closeReg = function (idReg){
		return $http({
			method:'PUT',
			url:urlApi + '/id/' + idReg + '/closed/true'
		});
	};

	registrasiFactory.openReg = function (idReg){
		return $http({
			method:'PUT',
			url:urlApi + '/id/' + idReg + '/closed/false'
		});
	};

	registrasiFactory.uploadFile=function(file, idReg){
		var fd = new FormData();
        fd.append('fileUpload', file);

		return $http({
            method: 'POST',
            url: urlApi + '/upload/save/' + idReg,
            headers: {
                //'Content-Type': 'multipart/form-data'                
                'Content-Type': undefined                
                },
            transformRequest: angular.identity,            
            data:fd           
        })
	};

	//http://10.1.0.11:8080/fmn-clinic-server/api/registration/upload/id/
	registrasiFactory.listUpload = function (idReg){
		return $http({
			method:'GET',
			url:urlApi + '/upload/id/' + idReg 
		});
	};
	//registration/upload/get/{idRegistrationAttach}
	registrasiFactory.getFileUpload = function (idAttach){
		return $http({
			method:'GET',
			url:urlApi + '/upload/get/' + idAttach
		});
	};

	///registration/upload/delete/{idRegistrationAttach}
	registrasiFactory.deleteFileUploadById = function (idAttach){
		return $http({
			method:'DELETE',
			url:urlApi + '/upload/delete/' + idAttach
		});
	};

	return registrasiFactory;

}]);