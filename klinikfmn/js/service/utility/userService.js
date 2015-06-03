appServices.factory('userFactory', ['$http','$rootScope', function($http,$rootScope){
	
	var urlApi = $rootScope.pathServerJSON + '/user';
	var userFactory = {};

	userFactory.getAllUserPage=function(hal, jumlah){
		return $http({
			url:urlApi + '/size/' + jumlah + '/number/' + hal,
			method:'GET'
		})
	};

	userFactory.getAllUser=function(){
		return $http({
			url:urlApi ,
			method:'GET'
		})
	};

	userFactory.getUserByNama=function(nama, hal, jumlah){
		return $http({
			url : urlApi + '/name/' + nama + + '/size/' + jumlah + '/number/' + hal,
			method:'GET'
		})
	};

	userFactory.getUserById=function(id){
		return $http({
			url : urlApi + '/id/' + id,
			method : 'GET'
		})
	};

	//http://localhost:8080/fmn-clinic-server/api/user/name/deddy/password/ZGVkZHk6MTIz
	userFactory.getUserByUserNamePassword=function(nama,password){
		return $http({
			url : urlApi + '/name/' + nama + '/password/' + password,
			method : 'GET'
		})
	};

	userFactory.insert = function(user){
		return $http({
			method:'POST',
			url:urlApi,
			data:JSON.stringify(user),
			headers:{'Content-Type':'application/json'}
		});
	};

	userFactory.update = function(id,user){
		return $http({
			method:'PUT',
			url:urlApi + '/id/'+ id,
			data:JSON.stringify(user)
		});
	};


	return userFactory;

}])