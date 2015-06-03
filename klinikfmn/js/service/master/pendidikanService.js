appServices.factory('pendidikanFactory',['$http','$rootScope',
	function($http,$rootScope){

	var urlApi = $rootScope.pathServerJSON + '/fieldgroup';
	var pendidikanFactory={};

	pendidikanFactory.getAll=function(){
		return $http({
			method:'GET',
			url : urlApi + '/idfieldgroup/2/field'
		})
	};

	pendidikanFactory.getAllByName=function(nama){
		return $http({
			method:'GET',
			url : urlApi + '/idfieldgroup/2/fieldname/' + nama
		})
	};

	pendidikanFactory.getAllByPage=function(hal, jumlah){		
		return $http({
			method:'GET',
			url:urlApi + '/hal/' + hal + '/jumlah/' + jumlah  
		});			
	};
	
	pendidikanFactory.getById=function(id){
		return $http({
			method:'GET',
			url:urlApi + '/idfieldgroup/2/idfield/' + id		
		});
	};

	pendidikanFactory.insert = function(pendidikan){
		return $http({
			method:'POST',
			url:urlApi + '/idfieldgroup/2/field',
			data:JSON.stringify(pendidikan),
			headers:{'Content-Type':'application/json'}
		});
	};

	pendidikanFactory.update  = function(id,pendidikan){
		return $http({
			method:'PUT',
			url:urlApi + '/idfieldgroup/2/field/idField/'+ id,
			data:JSON.stringify(pendidikan)
		});
	};

	pendidikanFactory.deleteRec = function (id){
		return $http({
			method:'DELETE',
			url:urlApi + '/idfieldgroup/2/field/idField/' + id
		});

	}

	return pendidikanFactory;

}]);