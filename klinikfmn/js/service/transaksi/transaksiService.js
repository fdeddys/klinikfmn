appServices.factory('transaksiFactory',['$http','$rootScope',
	function($http,$rootScope){

	var urlApi = $rootScope.pathServerJSON + '/transaction/hdr';
	var transaksiFactory={};


	transaksiFactory.getAllByPage=function(hal, jumlah){		
		return $http({
			method:'GET',
			url:urlApi +  '/size/' + jumlah + '/number/' + hal
		});			
	};
	
	transaksiFactory.getById=function(id){
		return $http({
			method:'GET',
			url:urlApi + '/id/' + id		
		});
	};

	transaksiFactory.getByNoRegPage=function(noreg, hal, jumlah){
		return $http({
			method:'GET',
			url:urlApi + '/registrationno/' + noreg + '/size/' + jumlah + '/number/' + hal
		});
	};
	
	transaksiFactory.insert = function(transaksi){
		return $http({
			method:'POST',
			url:urlApi +'/',
			data:JSON.stringify(transaksi),
			headers:{'Content-Type':'application/json'}
		});
	};

	transaksiFactory.update  = function(id,transaksi){
		return $http({
			method:'PUT',
			url:urlApi + '/id/'+ id,
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