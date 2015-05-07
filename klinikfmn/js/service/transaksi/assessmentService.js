appServices.factory('assessmentFactory',['$http','$rootScope',
	function($http,$rootScope){

	var urlApi = $rootScope.pathServerJSON + '/assessment';
	var assessmentFactory={};

	assessmentFactory.getAll=function(){
		return $http({
			method:'GET',
			url : urlApi
		})
	};

	assessmentFactory.getAllByPage=function(hal, jumlah){		
		return $http({
			method:'GET',
			url:urlApi + '/hal/' + hal + '/jumlah/' + jumlah  
		});			
	};
	
	assessmentFactory.getById=function(id){
		return $http({
			method:'GET',
			url:urlApi + '/id/' + id		
		});
	};

	assessmentFactory.insert = function(assessment){
		return $http({
			method:'POST',
			url:urlApi +'/',
			data:JSON.stringify(assessment),
			headers:{'Content-Type':'application/json'}
		});
	};

	assessmentFactory.update  = function(id,assessment){
		return $http({
			method:'PUT',
			url:urlApi + '/'+ id,
			data:JSON.stringify(assessment)
		});
	};

	assessmentFactory.deleteRec = function (id){
		return $http({
			method:'DELETE',
			url:urlApi + '/' + id
		});

	}

	return assessmentFactory;

}]);