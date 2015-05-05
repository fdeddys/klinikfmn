appControllers.controller('groupTindakanController', ['$scope', 'groupTindakanFactory','growl',
    function($scope, groupTindakanFactory, growl){
    
    var idx=0;
    $scope.tutupGrid=false;
    $scope.classForm='';
    $scope.groupTindakans=[];
    $scope.orderGroupTindakan='id';
    $scope.groupTindakan={
        id: 0,      
        nama: "",
        active:""
    };
    $scope.search='';


    $scope.jenisTransaksi;
    //1. add
    //2. edit
    //3. deleter    

    getAllGroupTindakan();

    $scope.getAll=function(){
        getAllGroupTindakan();
    };
    
    $scope.tambah=function(){
        $scope.jenisTransaksi=1;
        $scope.tutupGrid = !$scope.tutupGrid;
        $scope.classForm = 'formTambah';
        $scope.groupTindakan.id='[Automatic]';             
        $scope.groupTindakan.nama='';
        $scope.groupTindakan.active='true';
    };

    function getAllGroupTindakan(){
        //alert('get all kode arsip');

        if($scope.search===''){
            groupTindakanFactory
                .getAll()
                .success(function (data){
                    $scope.groupTindakans = data ;                                     
                }).error(function(data){
                    growl.addWarnMessage("Error Loading getAll data !",{ttl: 4000});        
                });             
        }else{
            groupTindakanFactory
                .getAllByPage($scope.search )
                .success(function (data){
                    $scope.groupTindakans = data ;                 
                }).error(function(data){
                    growl.addWarnMessage("Error Loading getAll data by nama !",{ttl: 4000});        
                });                 
        }
        
    };

    $scope.urut=function(urut_berdasar){
        $scope.orderGroupTindakan=urut_berdasar;       
    };

    $scope.ubah=function(id, nama,urut){
        $scope.jenisTransaksi=2;
        $scope.tutupGrid = !$scope.tutupGrid;
        $scope.classForm = 'formUbah';
        idx=urut;
        groupTindakanFactory
            .getById(id)
            .success(function(data){
                $scope.groupTindakan =data;                
            });
        
        growl.addInfoMessage(urut);

    };

    $scope.hapus=function(id, urut){
        $scope.jenisTransaksi=3;
        $scope.tutupGrid = !$scope.tutupGrid;
        $scope.classForm = 'formHapus';
        idx=urut;
        groupTindakanFactory
            .getById(id)
            .success(function(data){
                $scope.groupTindakan =data;                
            });
        
        growl.addInfoMessage(urut);     
    };

    $scope.proses=function(){
        switch($scope.jenisTransaksi){
            case 1:
                $scope.groupTindakan.id='';
                groupTindakanFactory
                    .insert($scope.groupTindakan)
                    .success(function(data){
                        growl.addInfoMessage('insert success ' + data );
                        $scope.jenisTransaksi=2;
                        $scope.groupTindakan.id =data.id;
                        $scope.groupTindakans.push($scope.groupTindakan);
                        $scope.tutupGrid = !$scope.tutupGrid;
                    })
                    .error(function(data){
                        growl.addWarnMessage('Error insert ' + data);       
                    })
                
                break;
            case 2:
                groupTindakanFactory
                    .update($scope.groupTindakan.id, $scope.groupTindakan)
                    .success(function(data){
                        growl.addInfoMessage('edit success');   
                        $scope.groupTindakans[idx]=$scope.groupTindakan;  
                        $scope.tutupGrid = !$scope.tutupGrid;               
                    })
                    .error(function(data){
                        growl.addWarnMessage('Error Updata ' + data);
                        console.log(data);      
                    })              
                break;
            case 3:
                groupTindakanFactory
                    .deleteRec($scope.groupTindakan.id)
                    .success(function(data){
                        growl.addInfoMessage('Delete success, silahkan refresh data ulang !!');     
                        //delete $scope.groupTindakans[idx];
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
         $window.open($rootScope.pathServerJSON + '/laporan/groupTindakan', '_blank');
    }      

}]);