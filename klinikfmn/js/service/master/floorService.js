appServices.factory('floorFactory',['$http','$rootScope',
	function($http,$rootScope){

	var urlApi = $rootScope.pathServerJSON + '/fieldgroup';
	var floorFactory={};

	floorFactory.getAll=function(){
		return $http({
			method:'GET',
			url : urlApi + '/idfieldgroup/6/field'
		})
	};

	floorFactory.getAllByName=function(nama){
		return $http({
			method:'GET',
			url : urlApi + '/idfieldgroup/6/fieldname/' + nama
		})
	};

	floorFactory.getAllByPage=function(hal, jumlah){		
		return $http({
			method:'GET',
			url:urlApi + '/hal/' + hal + '/jumlah/' + jumlah  
		});			
	};
	
	floorFactory.getById=function(id){
		return $http({
			method:'GET',
			url:urlApi + '/idfieldgroup/6/idfield/' + id		
		});
	};

	floorFactory.insert = function(floor){
		return $http({
			method:'POST',
			url:urlApi + '/idfieldgroup/6/field',
			data:JSON.stringify(floor),
			headers:{'Content-Type':'application/json'}
		});
	};

	floorFactory.update  = function(id,floor){
		return $http({
			method:'PUT',
			url:urlApi + '/idfieldgroup/6/field/idField/'+ id,
			data:JSON.stringify(floor)
		});
	};

	floorFactory.deleteRec = function (id){
		return $http({
			method:'DELETE',
			url:urlApi + '/idfieldgroup/6/field/idField/' + id
		});

	}

	return floorFactory;

}]);