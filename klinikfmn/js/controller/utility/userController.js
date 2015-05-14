appControllers.controller('userController', ['$scope', 'userFactory','growl','Base64',
	function($scope, userFactory, growl, Base64){
	
	var idx=0;
    $scope.tutupGrid=false;
    $scope.classForm='';
    $scope.users=[];    
    $scope.user={
        idUser: null,
		userID: null,
		username: null,
		password: null,
		field: null,
		tariff: null,
		patient: null,
		registration: null,
		user: null,
		transaction: null,
		payment: null
    };
    $scope.search='';
    $scope.jenisTransaksi;

    $scope.resetPass=false;
    // Paging 
	$scope.totalItems;
	$scope.itemsPerPage= 8;
	$scope.currentPage = 1;     
	$scope.pageChanged=function(){
 		getAll($scope.currentPage); 		  
    }

    getAllUser(1);

    $scope.getAll=function(){
        getAllUser(1);
    };
    
    $scope.tambah=function(){
        $scope.jenisTransaksi=1;
        $scope.tutupGrid = !$scope.tutupGrid;
        $scope.classForm = 'formTambah';

        $scope.user={
            idUser: null,
			userID: null,
			username: null,
			password: null,
			field: false,
			tariff: false,
			patient: false,
			registration: false,
			user: false,
			transaction: false,
			payment: false
        };
    };

    function getAllUser(halaman){
        //alert('get all kode arsip');

        // if($scope.search===''){
        //     userFactory
        //         .getAllUser(halaman, $scope.itemsPerPage)
        //         .success(function (data){
        //             $scope.groupTindakans = data ;                                     
        //         }).error(function(data){
        //             growl.addWarnMessage("Error Loading getAll data !",{ttl: 4000});        
        //         });             
        // }else{

        // }	
            userFactory
                .getUserByNama($scope.search, halaman, $scope.itemsPerPage )
                .success(function (data){
                    $scope.groupTindakans = data ;                 
                }).error(function(data){
                    growl.addWarnMessage("Error Loading getAll data by nama !",{ttl: 4000});        
                });                 
        
        
    };
    

    $scope.ubah=function(id){
        $scope.jenisTransaksi=2;
        $scope.tutupGrid = !$scope.tutupGrid;
        $scope.classForm = 'formUbah';
        idx=urut;
        userFactory
            .getUserById(id)
            .success(function(data){
                $scope.groupTindakan =data;                
            });
        
        growl.addInfoMessage(urut);

    };


    $scope.proses=function(){
        switch($scope.jenisTransaksi){
            case 1:
                $scope.user.idUser='';
                $scope.user.password=Base64.encode($scope.user.username + ':' + $scope.user.password);
                userFactory
                    .insert($scope.user)
                    .success(function(data){
                        growl.addInfoMessage('insert success ' + data );                        
                        $scope.tutupGrid = !$scope.tutupGrid;
                        getAll(1);
                    })
                    .error(function(data){
                        growl.addWarnMessage('Error insert ' + data);       
                    })
                
                break;
            case 2:
                userFactory
                    .update($scope.user.idUser, $scope.user)
                    .success(function(data){
                        growl.addInfoMessage('edit success');   
                        $scope.tutupGrid = !$scope.tutupGrid;   
                        getAll(1);            
                    })
                    .error(function(data){
                        growl.addWarnMessage('Error Updata ' + data);
                        console.log(data);      
                    })              
                break;
        }         

    };

    $scope.tutupDetil=function(){
        $scope.tutupGrid = !$scope.tutupGrid;
    };

}])