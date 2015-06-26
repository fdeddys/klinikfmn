appServices.factory('penerimaanBarangFactory', ['$rootScope', '$http',
	function($rootScope,$http){
	
	var urlApi = $rootScope.pathServerJSON + '/recieve/hdr';
	var penerimaanBarangFactory={};

	penerimaanBarangFactory.getAll=	function(tgl1, tgl2, namaSupplier, hal,jumlah){
		return $http({
			method:'GET',
			url:urlApi + '/tgl1/' + tgl1 + '/tgl2/' + tgl2 + '/name/' + namaSupplier + '/size/' + jumlah + '/number/' + hal
		})
	}

	// http://10.1.0.11:8080/fmn-clinic-server/api/recieve/hdr/id/{idProductRecieveHdr}
	penerimaanBarangFactory.getById=function(id){
		return $http({
			method:'GET',
			url:urlApi + '/id/' + id
		})
	}

	penerimaanBarangFactory.saveHdr=function(receiveHdr){
		return $http({
			url:urlApi,
			method:'POST',
			data:JSON.stringify(receiveHdr),
			headers:{'Content-Type':'application/json'}						
		})
	}
	//http://10.1.0.11:8080/fmn-clinic-server/api/recieve/hdr/id/{idProductRecieveHdr}
	penerimaanBarangFactory.updateHdr=function(receiveHdr, idRecieveHdr){
		return $http({
			url:urlApi+'/id/'+ idRecieveHdr,
			method:'PUT',
			data:JSON.stringify(receiveHdr),
			headers:{'Content-Type':'application/json'}						
		})
	}

	penerimaanBarangFactory.saveDtl=function(idHdr, receiveDtl){
		return $http({
			url:urlApi + '/idRecieveHdr/' + idHdr + '/dtl',
			method:'POST',
			data:JSON.stringify(receiveDtl),
			headers:{'Content-Type':'application/json'}						
		})
	}

	//http://10.1.0.11:8080/fmn-clinic-server/api/recieve/hdr/idRecieveHdr/{idRecieveHdr}/dtl
	penerimaanBarangFactory.getAllDetilByIdHdr=function(idHdr){
		return $http({
			method:'GET',
			url:urlApi + '/idRecieveHdr/' + idHdr + '/dtl'
		})
	}

	//http://10.1.0.11:8080/fmn-clinic-server/api/recieve/hdr/idRecieveHdr/{idRecieveHdr}/dtl/{idProductRecieveDtl}
	penerimaanBarangFactory.deleteDetil=function(idHdr, idDtl){
		return $http({
			method:'DELETE',
			url:urlApi + '/idRecieveHdr/'+ idHdr +'/dtl/' +idDtl
		})
	}

	
	///api/recieve/hdr/id/{idProductRecieveHdr}/update/approveStatus/{approveStatus}/user/{username}]
	penerimaanBarangFactory.approvePenerimaan=function(idHdr, userName){
		return $http({
			method:'PUT',
			url:urlApi + '/id/' + idHdr + '/update/approveStatus/true/user/'+ userName
		})
	}	

	penerimaanBarangFactory.batalApprovePenerimaan=function(idHdr, userName){
		return $http({
			method:'PUT',
			url:$urlApi + '/id/' + idHdr + '/update/approveStatus/false/user/'+ userName
		})
	}	

	//http://10.1.0.11:8080/fmn-clinic-server/api/fieldgroup/idfieldgroup/9/idfield/32
	penerimaanBarangFactory.getUnitName=function(idUnit){
		return $http({
			method:'GET',
			url:$rootScope.pathServerJSON + '/fieldgroup/idfieldgroup/11/idfield/'+idUnit
		})
	}

	//http://10.1.0.11:8080/fmn-clinic-server/api/supplier/size/{pageSize}/number/{pageNumber}
	penerimaanBarangFactory.getSupplier=function(){
		return $http({
			method:'GET',
			url:$rootScope.pathServerJSON + '/supplier/size/1000/number/1'
		})
	}



	penerimaanBarangFactory.getProduct=function(){
		return $http({
			method:'GET',
			url:$rootScope.pathServerJSON + '/product/size/1000/number/1'
		})
	}

	return penerimaanBarangFactory;
}])