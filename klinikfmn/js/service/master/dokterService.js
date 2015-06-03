appServices.factory('dokterFactory',['$http','$rootScope',
	function($http,$rootScope){

	var urlApi = $rootScope.pathServerJSON + '/fieldgroup';
	var dokterFactory={};

	dokterFactory.getAll=function(){
		return $http({
			method:'GET',
			url : urlApi + '/idfieldgroup/5/field'
		})
	};

	dokterFactory.getAllByName=function(nama){
		return $http({
			method:'GET',
			url : urlApi + '/idfieldgroup/5/fieldname/' + nama
		})
	};

	dokterFactory.getAllByPage=function(hal, jumlah){		
		return $http({
			method:'GET',
			url:urlApi + '/hal/' + hal + '/jumlah/' + jumlah  
		});			
	};
	
	dokterFactory.getById=function(id){
		return $http({
			method:'GET',
			url:urlApi + '/idfieldgroup/5/idfield/' + id		
		});
	};

	dokterFactory.insert = function(dokter){
		return $http({
			method:'POST',
			url:urlApi + '/idfieldgroup/5/field',
			data:JSON.stringify(dokter),
			headers:{'Content-Type':'application/json'}
		});
	};

	dokterFactory.update  = function(id,dokter){
		return $http({
			method:'PUT',
			url:urlApi + '/idfieldgroup/5/field/idField/'+ id,
			data:JSON.stringify(dokter)
		});
	};

	dokterFactory.deleteRec = function (id){
		return $http({
			method:'DELETE',
			url:urlApi + '/idfieldgroup/5/field/idField/' + id
		});

	}

	return dokterFactory;

}]);