appServices.factory('groupTindakanFactory',['$http','$rootScope',
	function($http,$rootScope){

	var urlApi = $rootScope.pathServerJSON + '/tariffgroup';
	var groupTindakanFactory={};

	groupTindakanFactory.getAll=function(){
		return $http({
			method:'GET',
			url : urlApi  +'/'
		})
	};

	
	groupTindakanFactory.getById=function(id){
		return $http({
			method:'GET',
			url:urlApi + '/id/' + id		
		});
	};

	groupTindakanFactory.insert = function(groupTindakan){
		return $http({
			method:'POST',
			url:urlApi + '/',
			data:JSON.stringify(groupTindakan),
			headers:{'Content-Type':'application/json'}
		});
	};

	groupTindakanFactory.update  = function(id,groupTindakan){
		return $http({
			method:'PUT',
			url:urlApi + '/id/'+ id,
			data:JSON.stringify(groupTindakan)
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