appServices.factory('bankFactory',['$http','$rootScope',
	function($http,$rootScope){

	var urlApi = $rootScope.pathServerJSON + '/fieldgroup';
	var bankFactory={};

	bankFactory.getAll=function(){
		return $http({
			method:'GET',
			url : urlApi + '/idfieldgroup/4/field'
		})
	};

	bankFactory.getAllByName=function(nama){
		return $http({
			method:'GET',
			url : urlApi + '/idfieldgroup/4/fieldname/' + nama
		})
	};

	bankFactory.getAllByPage=function(hal, jumlah){		
		return $http({
			method:'GET',
			url:urlApi + '/hal/' + hal + '/jumlah/' + jumlah  
		});			
	};
	
	bankFactory.getById=function(id){
		return $http({
			method:'GET',
			url:urlApi + '/idfieldgroup/4/idfield/' + id		
		});
	};

	bankFactory.insert = function(bank){
		return $http({
			method:'POST',
			url:urlApi + '/idfieldgroup/4/field',
			data:JSON.stringify(bank),
			headers:{'Content-Type':'application/json'}
		});
	};

	bankFactory.update  = function(id,bank){
		return $http({
			method:'PUT',
			url:urlApi + '/idfieldgroup/4/field/idField/'+ id,
			data:JSON.stringify(bank)
		});
	};

	bankFactory.deleteRec = function (id){
		return $http({
			method:'DELETE',
			url:urlApi + '/idfieldgroup/4/field/idField/' + id
		});

	}

	return bankFactory;

}]);