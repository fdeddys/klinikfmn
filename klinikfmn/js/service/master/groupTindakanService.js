appServices.factory('groupTindakanFactory',['$http','$rootScope',
	function($http,$rootScope){

	var urlApi = $rootScope.pathServerJSON + '/master/groupTindakan';
	var groupTindakanFactory={};

	groupTindakanFactory.getAll=function(){
		return $http({
			method:'GET',
			url : urlApi
		})
	};

	groupTindakanFactory.getAllByPage=function(hal, jumlah){		
		return $http({
			method:'GET',
			url:urlApi + '/hal/' + hal + '/jumlah/' + jumlah  
		});			
	};
	
	groupTindakanFactory.getById=function(id){
		return $http({
			method:'GET',
			url:urlApi + '/id/' + id		
		});
	};

	groupTindakanFactory.insert = function(customer){
		return $http({
			method:'POST',
			url:urlApi,
			data:JSON.stringify(customer),
			headers:{'Content-Type':'application/json'}
		});
	};

	groupTindakanFactory.update  = function(id,customer){
		return $http({
			method:'PUT',
			url:urlApi + '/'+ id,
			data:JSON.stringify(customer)
		});
	};

	groupTindakanFactory.deleteRec = function (id){
		return $http({
			method:'DELETE',
			url:urlApi + '/' + id
		});

	}

	return groupTindakanFactory;

}]);