appServices.factory('pekerjaanFactory',['$http','$rootScope',
	function($http,$rootScope){

	var urlApi = $rootScope.pathServerJSON + '/fieldgroup';
	var pekerjaanFactory={};

	pekerjaanFactory.getAll=function(){
		return $http({
			method:'GET',
			url : urlApi + '/idfieldgroup/1/field'
		})
	};

	pekerjaanFactory.getAllByName=function(nama){
		return $http({
			method:'GET',
			url : urlApi + '/idfieldgroup/1/fieldname/' + nama
		})
	};

	pekerjaanFactory.getAllByPage=function(hal, jumlah){		
		return $http({
			method:'GET',
			url:urlApi + '/hal/' + hal + '/jumlah/' + jumlah  
		});			
	};
	
	pekerjaanFactory.getById=function(id){
		return $http({
			method:'GET',
			url:urlApi + '/idfieldgroup/1/idfield/' + id		
		});
	};

	pekerjaanFactory.insert = function(pekerjaan){
		return $http({
			method:'POST',
			url:urlApi + '/idfieldgroup/1/field',
			data:JSON.stringify(pekerjaan),
			headers:{'Content-Type':'application/json'}
		});
	};

	pekerjaanFactory.update  = function(id,pekerjaan){
		return $http({
			method:'PUT',
			url:urlApi + '/idfieldgroup/1/field/idField/'+ id,
			data:JSON.stringify(pekerjaan)
		});
	};

	pekerjaanFactory.deleteRec = function (id){
		return $http({
			method:'DELETE',
			url:urlApi + '/idfieldgroup/1/field/idField/' + id
		});

	}

	return pekerjaanFactory;

}]);