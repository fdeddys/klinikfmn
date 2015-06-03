appControllers.controller('userController', ['$scope', 'userFactory','growl','Base64',
	function($scope, userFactory, growl, Base64){
	
    $scope.tutupGrid=false;
    $scope.classForm='';
    $scope.users=[];    
    $scope.user={
        idUser: null,		
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
	$scope.itemsPerPage= 5;
	$scope.currentPage = 1;    

	$scope.pageChanged=function(){
 		getAllUser($scope.currentPage); 		  
    }

    getAllUser(1);

    $scope.getAll=function(){
        getAllUser(1);
    };
    
    $scope.tambah=function(){
        $scope.jenisTransaksi=1;
        $scope.tutupGrid = !$scope.tutupGrid;
        $scope.classForm = 'formTambah';
        $scope.resetPass=true;  
        $scope.user={
            idUser: null,			
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

        if($scope.search===''){
            userFactory
                .getAllUserPage (halaman, $scope.itemsPerPage )
                .success(function (data){
                    $scope.users = data.content ; 
                    $scope.totalItems = data.totalElements;                 
                }).error(function(data){
                    growl.addWarnMessage("Error Loading getAll data by nama !",{ttl: 4000});        
                });              
        }else{
            userFactory
                .getUserByNama($scope.search, halaman, $scope.itemsPerPage)
                .success(function (data){
                    $scope.users = data.content ;           
                    $scope.totalItems = data.totalElements;                           
                }).error(function(data){
                    growl.addWarnMessage("Error Loading getAll data !",{ttl: 4000});        
                });             
        }	
                           
        
        
    };
    

    $scope.ubah=function(id){
        $scope.jenisTransaksi=2;
        $scope.tutupGrid = !$scope.tutupGrid;
        $scope.classForm = 'formUbah';        
        $scope.resetPass=false;         
        userFactory
            .getUserById(id)
            .success(function(data){
                $scope.user =data;     
                $scope.user.password='';  

            });
        
    };


    $scope.proses=function(){
        var pass;
        switch($scope.jenisTransaksi){
            case 1:
                $scope.user.idUser='';
                pass=Base64.encode($scope.user.username + ':' + $scope.user.password);
                $scope.user.password=pass;
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
                if($scope.resetPass==true){
                    pass=Base64.encode($scope.user.username + ':' + $scope.user.password);
                    $scope.user.password=pass;
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

                }else{
                    userFactory
                        .getUserById($scope.user.idUser)
                        .success(function(data){
                            pass=data.password;        
                            $scope.user.password=pass;
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
                        });                    
                };

                             
                break;
        }         

    };

    $scope.tutupDetil=function(){
        $scope.tutupGrid = !$scope.tutupGrid;
    };

}])