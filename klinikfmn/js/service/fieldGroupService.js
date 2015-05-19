appServices.factory('fieldGroupFactory',['$http','$rootScope',
	function($http,$rootScope){

	var urlApi = $rootScope.pathServerJSON + '/fieldgroup/idfieldgroup';
	var fieldGroupFactory={};

	fieldGroupFactory.getAllPendidikan=function(){
		return $http({
			method:'GET',
			url : urlApi + '/2/field'
		})
	};	

	fieldGroupFactory.getAllPekerjaan=function(){
		return $http({
			method:'GET',
			url : urlApi + '/1/field'
		})
	};	

	fieldGroupFactory.getAllDokter=function(){
		return $http({
			method:'GET',
			url : urlApi + '/5/field'
		})
	};

	fieldGroupFactory.getAllBank=function(){
		return $http({
			method:'GET',
			url : urlApi + '/4/field'
		})
	};

	fieldGroupFactory.getAllAgama=function(){
		return $http({
			method:'GET',
			url : urlApi + '/3/field'
		})
	};

	return fieldGroupFactory;

}]);