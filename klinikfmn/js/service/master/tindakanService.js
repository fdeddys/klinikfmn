appServices.factory('tindakanFactory',['$http','$rootScope',
	function($http,$rootScope){

	var urlApi = $rootScope.pathServerJSON + '/tariff';
	var tindakanFactory={};

	tindakanFactory.getAll=function(size, number){
		return $http({
			method:'GET',
			url:urlApi + '/size/' + size + '/number/' +	number	
		})
	};

	tindakanFactory.getById=function(id){
		return $http({
			method:'GET',
			url:urlApi + '/id/' + id		
		})
	};

	tindakanFactory.getAllByPage=function(hal, jumlah){		
		return $http({
			method:'GET',
			url:urlApi + '/size/' + jumlah + '/number/' + hal 
		});			
	};

	tindakanFactory.getAllByNamePage=function(name, hal, jumlah){		
		return $http({
			method:'GET',
			url:urlApi + '/name/' + name + '/size/' + jumlah + '/number/' + hal
		});			
	};

	tindakanFactory.insert = function(tindakan){
		return $http({
			method:'POST',
			url:urlApi,
			data:JSON.stringify(tindakan),
			headers:{'Content-Type':'application/json'}
		});
	};

	tindakanFactory.update  = function(id,tindakan){
		return $http({
			method:'PUT',
			url:urlApi + '/'+ id,
			data:JSON.stringify(tindakan)
		});
	};

	tindakanFactory.deleteRec = function (id){
		return $http({
			method:'DELETE',
			url:urlApi + '/' + id
		});

	}

	return tindakanFactory;

}]);