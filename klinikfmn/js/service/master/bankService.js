appServices.factory('bankFactory',['$http','$rootScope',
	function($http,$rootScope){

	var urlApi = $rootScope.pathServerJSON + '/master/bank';
	var bankFactory={};

	bankFactory.getAll=function(){
		return $http({
			method:'GET',
			url : urlApi
		})
	};

	bankFactory.getAllByPage=function(hal, jumlah){		
		return $http({
			method:'GET',
			url:urlApi + '/hal/' + hal + '/jumlah/' + jumlah  
		});			
	};
	
	bankFactory.getById=function(id){
		return $http({
			method:'GET',
			url:urlApi + '/id/' + id		
		});
	};

	bankFactory.insert = function(bank){
		return $http({
			method:'POST',
			url:urlApi,
			data:JSON.stringify(bank),
			headers:{'Content-Type':'application/json'}
		});
	};

	bankFactory.update  = function(id,bank){
		return $http({
			method:'PUT',
			url:urlApi + '/'+ id,
			data:JSON.stringify(bank)
		});
	};

	bankFactory.deleteRec = function (id){
		return $http({
			method:'DELETE',
			url:urlApi + '/' + id
		});

	}

	return bankFactory;

}]);