appServices.factory('pembayaranDetilFactory',['$http','$rootScope',
	function($http,$rootScope){

	var urlApi = $rootScope.pathServerJSON + '/master/pembayaran';
	var pembayaranFactory={};

	pembayaranFactory.getAll=function(){
		return $http({
			method:'GET',
			url : urlApi
		})
	};

	pembayaranFactory.getAllByPage=function(hal, jumlah){		
		return $http({
			method:'GET',
			url:urlApi + '/hal/' + hal + '/jumlah/' + jumlah  
		});			
	};
	
	

	pembayaranFactory.insert = function(pembayaran){
		return $http({
			method:'POST',
			url:urlApi,
			data:JSON.stringify(pembayaran),
			headers:{'Content-Type':'application/json'}
		});
	};

	pembayaranFactory.update  = function(id,pembayaran){
		return $http({
			method:'PUT',
			url:urlApi + '/'+ id,
			data:JSON.stringify(pembayaran)
		});
	};

	pembayaranFactory.deleteRec = function (id){
		return $http({
			method:'DELETE',
			url:urlApi + '/' + id
		});
	};	


	return pembayaranFactory;

}]);