appControllers.controller('MyCtrl', ['$scope', '$http', '$timeout', '$compile', 'Upload', 
    function ($scope, $http, $timeout, $compile, Upload) {
    //$scope.usingFlash = FileAPI && FileAPI.upload != null;

    $scope.changeAngularVersion = function () {
        window.location.hash = $scope.angularVersion;
        window.location.reload(true);
    };

    $scope.angularVersion = window.location.hash.length > 1 ? (window.location.hash.indexOf('/') === 1 ?
        window.location.hash.substring(2) : window.location.hash.substring(1)) : '1.2.20';

    // $scope.$watch('files', function (files) {
    //     $scope.formUpload = false;
    //     if (files != null) {
    //         for (var i = 0; i < files.length; i++) {
    //             $scope.errorMsg = null;
    //             (function (file) {
    //                 upload(file);
    //             })(files[i]);
    //         }
    //     }
    // });

    $scope.uploadPic = function (files) {
        $scope.formUpload = true;
        if (files != null) {
            upload(files[0])
        }
    };

    function upload(file) {
        $scope.errorMsg = null;
        if(file.size> (10 * 1024) ){
            alert('Max size = ' + file.size /  1024 )
        }
            
        uploadtes(file);

        //if ($scope.howToSend === 1) {
        //    uploadUsingUpload(file);
        //} else if ($scope.howToSend == 2) {
            // uploadUsing$http(file);
            
            //uploadUsing$http(file);
        //} 
        // else {
        //     uploadS3(file);
        // }
    }

    function uploadtes(file){

        // var fd = new FormData();
        // fd.append('fileUpload', file);
        // $http.post('http://10.1.0.11:8080/fmn-clinic-server/api/assessment/upload/save/1', fd, {
        //     transformRequest: angular.identity,
        //     headers: {'Content-Type': undefined}
        // })
        // .success(function(){
        // })
        // .error(function(){
        // });

        var fd = new FormData();
        fd.append('fileUpload', file);

        $http({
            method: 'POST',
            url: 'http://10.1.0.11:8080/fmn-clinic-server/api/assessment/upload/save/1',
            headers: {
                //'Content-Type': 'multipart/form-data'                
                'Content-Type': undefined                
                },
            transformRequest: angular.identity,
            //Content-Type: 'application/json',
            data:fd
            
            // transformRequest: function(data, headersGetterFunction) {
            //     return data; // do nothing! FormData is very good!
            // }
        }).success(function(data, status) {

        }).error(function(data, status) {

        });
    }



//url: 'https://angular-file-upload-cors-srv.appspot.com/upload' + $scope.getReqParams(),
    function uploadUsingUpload(file) {
        file.upload = Upload.upload({            
            url: 'http://10.1.0.11:8080/fmn-clinic-server/api/assessment/upload/save/1',
            method: 'POST',
            // headers: {
            //     'my-header': 'my-header-value'
            // },
            // fields: {username: $scope.username},
            //file: file,
            fileUpload: file
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
            });
        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        });

        file.upload.progress(function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });

        file.upload.xhr(function (xhr) {
            // xhr.upload.addEventListener('abort', function(){console.log('abort complete')}, false);
        });
    }
//url: 'https://angular-file-upload-cors-srv.appspot.com/upload' + $scope.getReqParams(),
    function uploadUsing$http(file) {
        file.upload = Upload.http({
            url: 'http://10.1.0.11:8080/fmn-clinic-server/api/assessment/upload/save/1',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/*'                
            },
            fileUpload: file,            
            transformRequest: function(data, headersGetterFunction) {
                return data; // do nothing! FormData is very good!
            }
        });

        file.upload.then(function (response) {
            file.result = response.data;
        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        });

        file.upload.progress(function (evt) {
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    }

    // function uploadS3(file) {
    //     file.upload = Upload.upload({
    //         url: $scope.s3url,
    //         method: 'POST',
    //         fields: {
    //             key: file.name,
    //             AWSAccessKeyId: $scope.AWSAccessKeyId,
    //             acl: $scope.acl,
    //             policy: $scope.policy,
    //             signature: $scope.signature,
    //             'Content-Type': file.type === null || file.type === '' ? 'application/octet-stream' : file.type,
    //             filename: file.name
    //         },
    //         file: file
    //     });

    //     file.upload.then(function (response) {
    //         $timeout(function () {
    //             file.result = response.data;
    //         });
    //     }, function (response) {
    //         if (response.status > 0)
    //             $scope.errorMsg = response.status + ': ' + response.data;
    //     });

    //     file.upload.progress(function (evt) {
    //         file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    //     });
    //     storeS3UploadConfigInLocalStore();
    // }

    $scope.generateSignature = function () {
        $http.post('/s3sign?aws-secret-key=' + encodeURIComponent($scope.AWSSecretKey), $scope.jsonPolicy).
            success(function (data) {
                $scope.policy = data.policy;
                $scope.signature = data.signature;
            });
    };

    if (localStorage) {
        $scope.s3url = localStorage.getItem('s3url');
        $scope.AWSAccessKeyId = localStorage.getItem('AWSAccessKeyId');
        $scope.acl = localStorage.getItem('acl');
        $scope.success_action_redirect = localStorage.getItem('success_action_redirect');
        $scope.policy = localStorage.getItem('policy');
        $scope.signature = localStorage.getItem('signature');
    }

    $scope.success_action_redirect = $scope.success_action_redirect || window.location.protocol + '//' + window.location.host;
    $scope.jsonPolicy = $scope.jsonPolicy || '{\n  "expiration": "2020-01-01T00:00:00Z",\n  "conditions": [\n    {"bucket": "angular-file-upload"},\n    ["starts-with", "$key", ""],\n    {"acl": "private"},\n    ["starts-with", "$Content-Type", ""],\n    ["starts-with", "$filename", ""],\n    ["content-length-range", 0, 524288000]\n  ]\n}';
    $scope.acl = $scope.acl || 'private';


    $scope.confirm = function () {
        return confirm('Are you sure? Your local changes will be lost.');
    };

    $scope.getReqParams = function () {
        return $scope.generateErrorOnServer ? '?errorCode=' + $scope.serverErrorCode +
        '&errorMessage=' + $scope.serverErrorMsg : '';
    };

    angular.element(window).bind('dragover', function (e) {
        e.preventDefault();
    });
    angular.element(window).bind('drop', function (e) {
        e.preventDefault();
    });

    // $timeout(function () {
    //     $scope.capture = localStorage.getItem('capture' + version) || 'camera';
    //     $scope.accept = localStorage.getItem('accept' + version) || 'image/*,audio/*,video/*';
    //     $scope.acceptSelect = localStorage.getItem('acceptSelect' + version) || 'image/*,audio/*,video/*';
    //     $scope.disabled = localStorage.getItem('disabled' + version) == 'true' || false;
    //     $scope.multiple = localStorage.getItem('multiple' + version) == 'true' || false;
    //     $scope.allowDir = localStorage.getItem('allowDir' + version) == 'true' || true;
    //     $scope.resetOnClick = localStorage.getItem('resetOnClick' + version) == 'true' || true;
    //     $scope.resetModelOnClick = localStorage.getItem('resetModelOnClick' + version) == 'true' || true;
    //     $scope.keep = localStorage.getItem('keep' + version) == 'true' || false;
    //     $scope.keepDistinct = localStorage.getItem('keepDistinct' + version) == 'true' || false;
    //     $scope.$watch('capture+accept+acceptSelect+disabled+capture+multiple+allowDir+resetOnClick+resetModelOnClick+keep+keepDistinct', function () {
    //         localStorage.setItem('capture' + version, $scope.capture);
    //         localStorage.setItem('accept' + version, $scope.accept);
    //         localStorage.setItem('acceptSelect' + version, $scope.acceptSelect);
    //         localStorage.setItem('disabled' + version, $scope.disabled);
    //         localStorage.setItem('multiple' + version, $scope.multiple);
    //         localStorage.setItem('allowDir' + version, $scope.allowDir);
    //         localStorage.setItem('resetOnClick' + version, $scope.resetOnClick);
    //         localStorage.setItem('resetModelOnClick' + version, $scope.resetModelOnClick);
    //         localStorage.setItem('keep' + version, $scope.keep);
    //         localStorage.setItem('keepDistinct' + version, $scope.keepDistinct);
    //     });
    // });

}]);
