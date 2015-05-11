appServices.factory('tindakanFactory',['$http','$rootScope',
	function($http,$rootScope){

	var urlApi = $rootScope.pathServerJSON + '/tariff';
	var tindakanFactory={};

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

	return tindakanFactory;

}]);