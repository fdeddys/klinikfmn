appServices.factory('transaksiFactory',['$http','$rootScope',
	function($http,$rootScope){

	var urlApi = $rootScope.pathServerJSON + '/master/transaksi';
	var transaksiFactory={};

	transaksiFactory.getAll=function(){
		return $http({
			method:'GET',
			url : urlApi
		})
	};

	transaksiFactory.getAllByPage=function(hal, jumlah){		
		return $http({
			method:'GET',
			url:urlApi + '/hal/' + hal + '/jumlah/' + jumlah  
		});			
	};
	
	transaksiFactory.getById=function(id){
		return $http({
			method:'GET',
			url:urlApi + '/id/' + id		
		});
	};

	transaksiFactory.insert = function(transaksi){
		return $http({
			method:'POST',
			url:urlApi,
			data:JSON.stringify(transaksi),
			headers:{'Content-Type':'application/json'}
		});
	};

	transaksiFactory.update  = function(id,transaksi){
		return $http({
			method:'PUT',
			url:urlApi + '/'+ id,
			data:JSON.stringify(transaksi)
		});
	};

	transaksiFactory.deleteRec = function (id){
		return $http({
			method:'DELETE',
			url:urlApi + '/' + id
		});

	}

	return transaksiFactory;

}]);