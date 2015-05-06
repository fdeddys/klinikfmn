appServices.factory('registrasiFactory',['$http','$rootScope',
	function($http,$rootScope){

	var urlApi = $rootScope.pathServerJSON + '/registration';
	var registrasiFactory={};

	registrasiFactory.getAll=function(){
		return $http({
			method:'GET',
			url : urlApi + '/'
		})
	};

	registrasiFactory.getAllByPage=function(hal, jumlah){		
		return $http({
			method:'GET',
			url:urlApi + '/hal/' + hal + '/jumlah/' + jumlah  
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

	registrasiFactory.insert = function(registrasi){
		return $http({
			method:'POST',
			url:urlApi,
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

	return registrasiFactory;

}]);