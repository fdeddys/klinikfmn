appServices.factory('headerFactory',['$http','$rootScope',
	function($http,$rootScope){

	var urlApi = $rootScope.pathServerJSON + '/fieldgroup';
	var headerFactory={};

	headerFactory.getAll=function(){
		return $http({
			method:'GET',
			url : urlApi + '/idfieldgroup/7/field'
		})
	};

	headerFactory.getAllByName=function(nama){
		return $http({
			method:'GET',
			url : urlApi + '/idfieldgroup/7/fieldname/' + nama
		})
	};

	headerFactory.getAllByPage=function(hal, jumlah){		
		return $http({
			method:'GET',
			url:urlApi + '/hal/' + hal + '/jumlah/' + jumlah  
		});			
	};
	
	headerFactory.getById=function(id){
		return $http({
			method:'GET',
			url:urlApi + '/idfieldgroup/7/idfield/' + id		
		});
	};

	headerFactory.insert = function(header){
		return $http({
			method:'POST',
			url:urlApi + '/idfieldgroup/7/field',
			data:JSON.stringify(header),
			headers:{'Content-Type':'application/json'}
		});
	};

	headerFactory.update  = function(id,header){
		return $http({
			method:'PUT',
			url:urlApi + '/idfieldgroup/7/field/idField/'+ id,
			data:JSON.stringify(header)
		});
	};

	headerFactory.deleteRec = function (id){
		return $http({
			method:'DELETE',
			url:urlApi + '/idfieldgroup/7/field/idField/' + id
		});

	}

	return headerFactory;

}]);