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

	return fieldGroupFactory;

}]);