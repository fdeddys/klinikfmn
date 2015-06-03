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

	//api/transaction/hdr/id/{idTransactionHdr}/update/approveStatus/{approveStatus}/user/{username}]
	transaksiFactory.approveTransaksi=function(idTransactionHdr,username){
		return $http({
			method:'PUT',
			url:urlApi + '/id/' + idTransactionHdr + '/update/approveStatus/true/user/' + username
		})
	}

	transaksiFactory.voidTransaksi=function(idTransactionHdr,username){
		return $http({
			method:'PUT',
			url:urlApi + '/id/' + idTransactionHdr + '/update/approveStatus/false/user/' + username
		})
	};

	//api/transaction/hdr/registrationno/{registrationNo}/update/paidstatus/{paidstatus}/user/{username}
	//api/transaction/hdr/registrationno/{registrationNo}/update/paidstatus/{paidStatus}/user/{username}
	transaksiFactory.statusPaid=function(idReg, userName){
		return $http({
			method:'PUT',
			url:urlApi + '/registrationno/' + idReg + '/update/paidstatus/true/user/'+ userName
		})
	}	
	
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