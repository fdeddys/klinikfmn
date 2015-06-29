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
  
  transaksiDetilFactory.getAllPage=function(hdrId, pageSize, pageNumber){
    return $http({
      method:'GET',
      url:urlApi + '/idTransactionHdr/' + hdrId + '/dtl/size/'+ pageSize +'/number/'+pageNumber
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

  //http://10.1.0.11:8080/fmn-clinic-server/api/transaction/hdr/idTransactionHdr/{idTransactionHdr}/product/dtl
  transaksiDetilFactory.insertObat = function(transaksiObat, hdrId){
    return $http({
      method:'POST',
      url:urlApi +'/idTransactionHdr/' + hdrId + '/product/dtl',
      data:JSON.stringify(transaksiObat),
      headers:{'Content-Type':'application/json'}
    });
  };

  ///idTransactionHdr/{idTransactionHdr}/product/dtl
  transaksiDetilFactory.getAllTransaksiObat=function(hdrId){
    return $http({
      method:'GET',
      url:urlApi + '/idTransactionHdr/' + hdrId + '/product/dtl'
    });
  }; 

  transaksiDetilFactory.getAllTransaksiObatPage=function(hdrId, pageSize, pageNumber){
    return $http({
      method:'GET',
      url:urlApi + '/idTransactionHdr/' + hdrId + '/product/dtl/size/'+ pageSize +'/number/'+pageNumber
    });
  }; 

  //api/transaction/hdr/idTransactionHdr/{idTransactionHdr)/product/dtl/{idProductTransactionDtl}
  transaksiDetilFactory.deleteTransaksiObat = function (id, hdrId){
    return $http({
      method:'DELETE',
      url:urlApi +'/idTransactionHdr/' + hdrId + '/product/dtl/' + id 
    });
  }


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