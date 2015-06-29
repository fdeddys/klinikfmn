appServices.factory('adjustmentStockFactory', ['$rootScope', '$http', 
	function($rootScope,$http){

	var urlApi = $rootScope.pathServerJSON + '/adjust/hdr';
	var adjustmentStockFactory={};

	// /adjust/hdr/tgl1/{tgl1}/tgl2/{tgl2}/size/{pageSize}/number/{pageNumber}
	adjustmentStockFactory.getByDate=function(tgl1, tgl2, pageSize, pageNumber){
		return $http({
			method:'GET',
			url:urlApi + '/tgl1/'+ tgl1 +'/tgl2/'+ tgl2 + '/size/' + pageSize + '/number/' + pageNumber
		})
	};

	adjustmentStockFactory.getById=function(id){
		return $http({
			method:'GET',
			url:urlApi + '/id/' + id
		})
	};

	adjustmentStockFactory.getAllDetilByIdHdr=function(idAdjust){
		return $http({
			method:'GET',
			url:urlApi + '/idAdjustHdr/' + idAdjust + '/dtl'
		})
	};

	adjustmentStockFactory.saveHdr=function(adjustHdr){
		return $http({
			url:urlApi,
			method:'POST',
			data:JSON.stringify(adjustHdr),
			headers:{'Content-Type':'application/json'}						
		})
	};

	adjustmentStockFactory.saveDtl=function(idAdjust, adjustDtl){
		return $http({
			url:urlApi + '/idAdjustHdr/' + idAdjust + '/dtl',
			method:'POST',
			data:JSON.stringify(adjustDtl),
			headers:{'Content-Type':'application/json'}						
		})
	};

	adjustmentStockFactory.approve=function(idAdjust, userName){
		return $http({
			method:'PUT',
			url:urlApi + '/id/' + idAdjust + '/update/approveStatus/true/user/'+ userName
		})
	};	

	adjustmentStockFactory.batalApprove=function(idAdjust, userName){
		return $http({
			method:'PUT',
			url:$urlApi + '/id/' + idAdjust + '/update/approveStatus/false/user/'+ userName
		})
	};	

	adjustmentStockFactory.updateHdr=function(adjustHdr, idAdjustHdr){
		return $http({
			url:urlApi+'/id/'+ idAdjustHdr,
			method:'PUT',
			data:JSON.stringify(adjustHdr),
			headers:{'Content-Type':'application/json'}						
		})
	};

	adjustmentStockFactory.deleteDetil=function(idAdjust, idDtl){
		return $http({
			method:'DELETE',
			url:urlApi + '/idAdjustHdr/'+ idAdjust +'/dtl/' +idDtl
		})
	};

	return adjustmentStockFactory;

}])