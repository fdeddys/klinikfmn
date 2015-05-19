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

	//http://localhost:8080/fmn-clinic-server/api/fieldgroup/id/4
	bankFactory.getGroupBank=function(){
		return $http({
			method:'GET',
			url:urlApi + '/id/4' 
		});	
	}

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
			url:urlApi + '/idfieldgroup/4/field/'+ id,
			data:JSON.stringify(bank)
		});
	};

	bankFactory.deleteRec = function (id){
		return $http({
			method:'DELETE',
			url:urlApi + '/id/4/field/idField/' + id
		});

	}

	return bankFactory;

}]);