appServices.factory('transaksiDetilFactory',['$http','$rootScope',
	function($http,$rootScope){

	var urlApi = $rootScope.pathServerJSON + '/transaction/hdr';
	var transaksiDetilFactory={};
	
	transaksiDetilFactory.getById=function(id){
		return $http({
			method:'GET',
			url:urlApi + '/id/' + id + '/dtl'		
		});
	};

	transaksiDetilFactory.getAll=function(hdrId){
		return $http({
			method:'GET',
			url:urlApi + '/idTransactionHdr/' + hdrId + '/dtl'
		});
	};	
	
	transaksiDetilFactory.insert = function(transaksi, hdrId){
		return $http({
			method:'POST',
			url:urlApi +'/idTransactionHdr/' + hdrId + '/dtl',
			data:JSON.stringify(transaksi),
			headers:{'Content-Type':'application/json'}
		});
	};

	transaksiDetilFactory.update  = function(id,transaksi, hdrId){
		return $http({
			method:'PUT',
			url:urlApi +'/idTransactionHdr/' + hdrId + '/dtl/' + id,
			data:JSON.stringify(transaksi)
		});
	};

	transaksiDetilFactory.deleteRec = function (id, hdrId){
		return $http({
			method:'DELETE',
			url:urlApi +'/idTransactionHdr/' + hdrId + '/dtl/' + id 
		});
	}

	return transaksiDetilFactory;

}]);