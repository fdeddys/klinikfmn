appServices.factory('productIssueFactory', ['$rootScope', '$http', 
	function($rootScope, $http){
	
	var urlApi = $rootScope.pathServerJSON + '/issue/hdr';
	var productIssueFactory={};

	// /adjust/hdr/tgl1/{tgl1}/tgl2/{tgl2}/size/{pageSize}/number/{pageNumber}
	productIssueFactory.getByDate=function(tgl1, tgl2, pageSize, pageNumber){
		return $http({
			method:'GET',
			url:urlApi + '/tgl1/'+ tgl1 +'/tgl2/'+ tgl2 + '/size/' + pageSize + '/number/' + pageNumber
		})
	};

	productIssueFactory.getById=function(id){
		return $http({
			method:'GET',
			url:urlApi + '/id/' + id
		})
	};

	productIssueFactory.getAllDetilByIdHdr=function(idIssueHdr){
		return $http({
			method:'GET',
			url:urlApi + '/idIssueHdr/' + idIssueHdr + '/dtl'
		})
	};

	productIssueFactory.saveHdr=function(issueHdr){
		return $http({
			url:urlApi,
			method:'POST',
			data:JSON.stringify(issueHdr),
			headers:{'Content-Type':'application/json'}						
		})
	};

	productIssueFactory.saveDtl=function(idIssue, issueDtl){
		return $http({
			url:urlApi + '/idIssueHdr/' + idIssue + '/dtl',
			method:'POST',
			data:JSON.stringify(issueDtl),
			headers:{'Content-Type':'application/json'}						
		})
	};

	productIssueFactory.approve=function(idIssueHdr, userName){
		return $http({
			method:'PUT',
			url:urlApi + '/id/' + idIssueHdr + '/update/approveStatus/true/user/'+ userName
		})
	};	

	productIssueFactory.void=function(idIssueHdr, userName){
		return $http({
			method:'PUT',
			url:urlApi + '/id/' + idIssueHdr + '/update/approveStatus/false/user/'+ userName
		})
	};	

	productIssueFactory.updateHdr=function(adjustHdr, idIssueHdr){
		return $http({
			url:urlApi+'/id/'+ idIssueHdr,
			method:'PUT',
			data:JSON.stringify(adjustHdr),
			headers:{'Content-Type':'application/json'}						
		})
	};

	productIssueFactory.deleteDetil=function(idIssueHdr, idDtl){
		return $http({
			method:'DELETE',
			url:urlApi + '/idIssueHdr/'+ idIssueHdr +'/dtl/' +idDtl
		})
	};

	return productIssueFactory;

}])