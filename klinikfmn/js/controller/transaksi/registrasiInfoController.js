appControllers.controller('registrasiInfoController', ['$scope', '$http', 'growl','registrasiFactory','$routeParams','$rootScope',
	function($scope, $http, growl, registrasiFactory, $routeParams, $rootScope){
	
	var idReg='';
	$scope.pasien={};
	$scope.showUpload=true;

	$scope.uploadPic = function (files) {
        
        if (files != null) {
        	if(files[0].size> (5 * 1024 * 1024) ){
        	growl.addWarnMessage('Max size 5 Mb !!! ' +  files[0].size / ( 5 * 1024 * 1024 ));
            alert('Max size 5 MB ' )
        }                    
            upload(files[0]);
        }

    };

	function upload(file){

		registrasiFactory
			.uploadFile(file,idReg)
			.success(function(data){
				growl.addWarnMessage('insert picture success');
				$scope.picFile=[];
			})

        // var fd = new FormData();
        // fd.append('fileUpload', file);

        // $http({
        //     method: 'POST',
        //     url: 'http://10.1.0.11:8080/fmn-clinic-server/api/registration/upload/save/8',
        //     headers: {
        //         //'Content-Type': 'multipart/form-data'                
        //         'Content-Type': undefined                
        //         },
        //     transformRequest: angular.identity,
        //     //Content-Type: 'application/json',
        //     data:fd
            
        //     // transformRequest: function(data, headersGetterFunction) {
        //     //     return data; // do nothing! FormData is very good!
        //     // }
        // }).success(function(data, status) {

        // }).error(function(data, status) {

        // });
    };

    $scope.showListUpload=function(){
    	$scope.showUpload=false;
    	registrasiFactory
    		.listUpload(idReg)
    		.success(function(data){
    			$scope.uploads=data;
    		})
    };

    $scope.preview=function(idAttch){
    	$scope.picPreview= $rootScope.pathServerJSON  + '/registration/upload/get/'+idAttch;    	
    };

    $scope.delFile=function(idAttch){    	
    	registrasiFactory
    		.deleteFileUploadById(idAttch)
    		.success(function(data){
    			$scope.showListUpload();
    		})
    };
    
    
    function startModule(){
    	idReg = $routeParams.idReg;
    	registrasiFactory
			.getById(idReg)
			.success(function(data){				
				$scope.pasien=data.patient;
			})
    	
    };

    startModule();

}])