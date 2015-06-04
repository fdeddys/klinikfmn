appServices.factory('pembayaranFactory',['$http','$rootScope',
	function($http,$rootScope){

	var urlApi = $rootScope.pathServerJSON + '/payment';
	var pembayaranFactory={};

	pembayaranFactory.getAll=function(){
		return $http({
			method:'GET',
			url : urlApi
		})
	};

	pembayaranFactory.getByNo=function(id){
		return $http({
			method:'GET',
			url:urlApi + '/no/' + id		
		});
	};

	pembayaranFactory.getAllByPage=function(hal, jumlah){		
		return $http({
			method:'GET',
			url:urlApi + '/hal/' + hal + '/jumlah/' + jumlah  
		});			
	};
	
	pembayaranFactory.getById=function(id){
		return $http({
			method:'GET',
			url:urlApi + '/id/' + id		
		});
	};

	pembayaranFactory.insert = function(pembayaran){
		return $http({
			method:'PUT',
			url:urlApi + '/',
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

	//http://10.1.0.11:8080/fmn-clinic-server/api/payment
	pembayaranFactory.getByNoRegPage= function (noReg, hal, jumlah){
		return $http({
			method:'GET',
			url:urlApi + '/registrationno/' + noReg + '/size/' + jumlah + '/number/' + hal
		});
	};

	//http://10.1.0.11:8080/fmn-clinic-server/api/registrationno/{registrationNo}/sum
	pembayaranFactory.getFarmasiByNoReg= function (noReg){
		return $http({
			method:'GET',
			url:$rootScope.pathServerJSON + '/pharmacy/registrationno/' + noReg + '/sum'
		});
	};


	return pembayaranFactory;

}]);