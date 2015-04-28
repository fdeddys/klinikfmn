appServices.factory('pasienFactory',['$http','$rootScope',
	function($http,$rootScope){

	var urlApi = $rootScope.pathServerJSON + '/master/pasien';
	var pasienFactory={};

	pasienFactory.getAll=function(){
		return $http({
			method:'GET',
			url : urlApi
		})
	};

	pasienFactory.getAllByPage=function(hal, jumlah){		
		return $http({
			method:'GET',
			url:urlApi + '/hal/' + hal + '/jumlah/' + jumlah  
		});			
	};
	
	pasienFactory.getById=function(id){
		return $http({
			method:'GET',
			url:urlApi + '/id/' + id		
		});
	};

	pasienFactory.insert = function(pasien){
		return $http({
			method:'POST',
			url:urlApi,
			data:JSON.stringify(pasien),
			headers:{'Content-Type':'application/json'}
		});
	};

	pasienFactory.update  = function(id,pasien){
		return $http({
			method:'PUT',
			url:urlApi + '/'+ id,
			data:JSON.stringify(pasien)
		});
	};

	pasienFactory.deleteRec = function (id){
		return $http({
			method:'DELETE',
			url:urlApi + '/' + id
		});

	}

	return pasienFactory;

}]);