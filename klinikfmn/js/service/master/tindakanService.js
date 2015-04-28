appServices.factory('tindakanFactory',['$http','$rootScope',
	function($http,$rootScope){

	var urlApi = $rootScope.pathServerJSON + '/master/tindakan';
	var tindakanFactory={};

	tindakanFactory.getAll=function(){
		return $http({
			method:'GET',
			url : urlApi
		})
	};

	tindakanFactory.getAllByPage=function(hal, jumlah){		
		return $http({
			method:'GET',
			url:urlApi + '/hal/' + hal + '/jumlah/' + jumlah  
		});			
	};
	
	tindakanFactory.getById=function(id){
		return $http({
			method:'GET',
			url:urlApi + '/id/' + id		
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