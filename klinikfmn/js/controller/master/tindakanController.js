appControllers.controller('tindakanController', ['$scope','tindakanFactory','growl','$location','$filter',
    function($scope, tindakanFactory, growl, $location, $filter){
        
    var idx=0;
    $scope.tutupGrid=false;
    $scope.classForm='';
    $scope.tindakans=[];
    $scope.ordertindakan='idTariff';
    $scope.grup={
    	idFieldGroup: 5,
    	fieldGroupName: "DOKTER",
    	active: "true"
    }
    $scope.tindakan={
        idTariff: null,
        tariffName: "",      
        rs: "",
        dokter: "",
        variable: "",
        active:""
    };
	$scope.totalItems;
	$scope.itemsPerPage= 8;
	$scope.currentPage = 1; 
    $scope.search='';

    $scope.jenisTransaksi;
    //1. add
    //2. edit
    //3. delete    

    //getAlltindakan(1);

	$scope.pageChanged=function(){
 		getAlltindakan($scope.currentPage); 		
    }

    //$scope.search=function(){
    //	alert('coba1');
    //	getAlltindakan(1);
    //}
	
    $scope.getAll=function(){
    	getAlltindakan(1);
    }
	
    $scope.tambah=function(){
        $scope.jenisTransaksi=1;
        $scope.tutupGrid = !$scope.tutupGrid;
        $scope.classForm = 'formTambah';
        // $scope.tindakan.id='[Automatic]';             
        // $scope.tindakan.nama='';
        // $scope.tindakan.active='true';
        $scope.tindakan={
	        idTariff: null,
    	    tariffName: "",      
        	rs: "",
        	dokter: "",
            variable:"false",
            active:"true"
        };
    };

    $scope.cari=function(){
        getAlltindakan(1);
    };

    function getAlltindakan(halaman){

        if($scope.search===''){
            tindakanFactory
                .getAllByPage(halaman, $scope.itemsPerPage)
                .success(function (data){
                    $scope.tindakans = data.content;   
                    $scope.totalItems = data.totalElements;                                  
                }).error(function(data){
                    growl.addWarnMessage("Error Loading getAll data !",{ttl: 4000});        
                });             
        }else{
            tindakanFactory
                .getAllByNamePage($scope.search, 1, $scope.itemsPerPage)
                .success(function (data){
                    $scope.tindakans = data.content ;                 
                    $scope.totalItems = data.totalElements;                                  
                }).error(function(data){
                    growl.addWarnMessage("Error Loading getAll data by nama !",{ttl: 4000});        
                });                 
        }
        
    };

    $scope.urut=function(urut_berdasar){
        $scope.ordertindakan=urut_berdasar;       
    };

    $scope.ubah=function(id, nama,urut){
        $scope.jenisTransaksi=2;
        $scope.tutupGrid = !$scope.tutupGrid;
        $scope.classForm = 'formUbah';
        idx=urut;
        tindakanFactory
            .getById(id)
            .success(function(data){
                $scope.tindakan =data;                
            });

    };

    $scope.hapus=function(id, urut){
        $scope.jenisTransaksi=3;
        $scope.tutupGrid = !$scope.tutupGrid;
        $scope.classForm = 'formHapus';
        idx=urut;
        tindakanFactory
            .getById(id)
            .success(function(data){
                $scope.tindakan =data;                
            });
        
    };

    $scope.proses=function(){
        switch($scope.jenisTransaksi){
            case 1:
                $scope.tindakan.idField='';
                tindakanFactory
                    .insert($scope.tindakan)
                    .success(function(data){
                        growl.addInfoMessage('insert success ' + data );
                        $scope.jenisTransaksi=2;
                        $scope.tindakan.idTariff=data.idTariff;
                        $scope.tindakans.push($scope.tindakan);
                        $scope.tutupGrid = !$scope.tutupGrid;
		                getAlltindakan(1);
                    })
                    .error(function(data){
                        growl.addWarnMessage('Error insert ' + data);       
                    })
                break;
            case 2:
        		$scope.tindakan.fieldGroup = $scope.grup;
                tindakanFactory
                    .update($scope.tindakan.idField, $scope.tindakan)
                    .success(function(data){
                        growl.addInfoMessage('edit success');   
                        $scope.tindakans[idx]=$scope.tindakan;  
                        $scope.tutupGrid = !$scope.tutupGrid;               
                    })
                    .error(function(data){
                        growl.addWarnMessage('Error Updata ' + data);
                        console.log(data);      
                    })              
                break;
            case 3:
                tindakanFactory
                    .deleteRec($scope.tindakan.id)
                    .success(function(data){
                        growl.addInfoMessage('Delete success, silahkan refresh data ulang !!');     
                        //delete $scope.tindakans[idx];
                        getAllDirektorat();
                        $scope.tutupGrid = !$scope.tutupGrid;
                    })
                    .error(function(data){
                        growl.addWarnMessage('Error Delete ' + data)                                
                    });             
                break;          
        }

    };

    $scope.tutupDetil=function(){
        $scope.tutupGrid = !$scope.tutupGrid;
    };

    $scope.previewLaporan=function(){
         $window.open($rootScope.pathServerJSON + '/laporan/tindakan', '_blank');
    }      

    getAlltindakan(1);

}]);