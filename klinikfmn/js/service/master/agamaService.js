appServices.factory('agamaFactory',['$http','$rootScope',
	function($http,$rootScope){

	var urlApi = $rootScope.pathServerJSON + '/fieldgroup';
	var agamaFactory={};

	agamaFactory.getAll=function(){
		return $http({
			method:'GET',
			url : urlApi + '/idfieldgroup/3/field'
		})
	};

	agamaFactory.getAllByName=function(nama){
		return $http({
			method:'GET',
			url : urlApi + '/idfieldgroup/3/fieldname/' + nama
		})
	};

	agamaFactory.getAllByPage=function(hal, jumlah){		
		return $http({
			method:'GET',
			url:urlApi + '/hal/' + hal + '/jumlah/' + jumlah  
		});			
	};
	
	agamaFactory.getById=function(id){
		return $http({
			method:'GET',
			url:urlApi + '/idfieldgroup/3/idfield/' + id		
		});
	};

	agamaFactory.insert = function(agama){
		return $http({
			method:'POST',
			url:urlApi + '/idfieldgroup/3/field',
			data:JSON.stringify(agama),
			headers:{'Content-Type':'application/json'}
		});
	};

	agamaFactory.update  = function(id,agama){
		return $http({
			method:'PUT',
			url:urlApi + '/idfieldgroup/3/field/idField/'+ id,
			data:JSON.stringify(agama)
		});
	};

	agamaFactory.deleteRec = function (id){
		return $http({
			method:'DELETE',
			url:urlApi + '/idfieldgroup/3/field/idField/' + id
		});

	}

	return agamaFactory;

}]);