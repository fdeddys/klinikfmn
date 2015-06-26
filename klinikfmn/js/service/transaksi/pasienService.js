appServices.factory('pasienFactory',['$http','$rootScope',
	function($http,$rootScope){

	var urlApi = $rootScope.pathServerJSON + '/patient';
	var pasienFactory={};


	pasienFactory.getAllByPage=function(hal, jumlah){		
		return $http({
			method:'GET',
			url:urlApi + '/size/' + jumlah  + '/number/' + hal 
		});			
	};
	
	pasienFactory.getByNo=function(no){
		return $http({
			method:'GET',
			url:urlApi + '/no/' + no		
		});
	};

	pasienFactory.getByName=function(name, hal, jumlah){
		return $http({
			method:'GET',
			url:urlApi + '/name/' + name + '/size/' + jumlah  + '/number/' + hal 	
		});
	};

	pasienFactory.getByNameTglLahir=function(tgllahir, name, hal, jumlah){
		return $http({
			method:'GET',
			url:urlApi + '/name/' + name + '/date/'+ tgllahir +'/size/' + jumlah  + '/number/' + hal 	
		});
	};

	pasienFactory.insert = function(pasien){
		return $http({
			method:'POST',
			url:urlApi + '/',
			data:JSON.stringify(pasien),
			headers:{'Content-Type':'application/json'}
		});
	};

	pasienFactory.update  = function(id,pasien){
		return $http({
			method:'PUT',
			url:urlApi + '/id/' + id,
			data:JSON.stringify(pasien)
		});
	};

	// pasienFactory.deleteRec = function (id){
	// 	return $http({
	// 		method:'DELETE',
	// 		url:urlApi + '/' + id
	// 	});

	// }

	return pasienFactory;

}]);