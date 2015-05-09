appControllers.controller('bankController', ['$scope', 'bankFactory','growl',
    function($scope, bankFactory, growl){
    
    var idx=0;
    $scope.tutupGrid=false;
    $scope.classForm='';
    $scope.banks=[];
    $scope.orderbank='id';
    $scope.bank={
        id: 0,
        fieldgroup : 4,      
        nama: "",
        active:""
    };
    $scope.search='';

    $scope.jenisTransaksi;
    //1. add
    //2. edit
    //3. deleter    
    alert("start");
    getAllbank();

    $scope.getAll=function(){
        getAllbank();
    };
    
    $scope.tambah=function(){
        $scope.jenisTransaksi=1;
        $scope.tutupGrid = !$scope.tutupGrid;
        $scope.classForm = 'formTambah';
        // $scope.bank.id='[Automatic]';             
        // $scope.bank.nama='';
        // $scope.bank.active='true';
        $scope.bank={
            id: 0, 
            fieldgroup : 4,     
            nama: "",
            active:"true"
        };
    };

    function getAllbank(){
        //alert('get all kode arsip');

        if($scope.search===''){
            bankFactory
                .getAll()
                .success(function (data){
                    $scope.banks = data ;                                     
                }).error(function(data){
                    growl.addWarnMessage("Error Loading getAll data !",{ttl: 4000});        
                });             
        }else{
            bankFactory
                .getAllByPage($scope.search )
                .success(function (data){
                    $scope.banks = data ;                 
                }).error(function(data){
                    growl.addWarnMessage("Error Loading getAll data by nama !",{ttl: 4000});        
                });                 
        }
        
    };

    $scope.urut=function(urut_berdasar){
        $scope.orderbank=urut_berdasar;       
    };

    $scope.ubah=function(id, nama,urut){
        $scope.jenisTransaksi=2;
        $scope.tutupGrid = !$scope.tutupGrid;
        $scope.classForm = 'formUbah';
        idx=urut;
        bankFactory
            .getById(id)
            .success(function(data){
                $scope.bank =data;                
            });
        
        growl.addInfoMessage(urut);

    };

    $scope.hapus=function(id, urut){
        $scope.jenisTransaksi=3;
        $scope.tutupGrid = !$scope.tutupGrid;
        $scope.classForm = 'formHapus';
        idx=urut;
        bankFactory
            .getById(id)
            .success(function(data){
                $scope.bank =data;                
            });
        
        growl.addInfoMessage(urut);     
    };

    $scope.proses=function(){
        switch($scope.jenisTransaksi){
            case 1:
                $scope.bank.id='';
                bankFactory
                    .insert($scope.bank)
                    .success(function(data){
                        growl.addInfoMessage('insert success ' + data );
                        $scope.jenisTransaksi=2;
                        $scope.bank.id =data.id;
                        $scope.banks.push($scope.bank);
                        $scope.tutupGrid = !$scope.tutupGrid;
                    })
                    .error(function(data){
                        growl.addWarnMessage('Error insert ' + data);       
                    })
                
                break;
            case 2:
                bankFactory
                    .update($scope.bank.id, $scope.bank)
                    .success(function(data){
                        growl.addInfoMessage('edit success');   
                        $scope.banks[idx]=$scope.bank;  
                        $scope.tutupGrid = !$scope.tutupGrid;               
                    })
                    .error(function(data){
                        growl.addWarnMessage('Error Updata ' + data);
                        console.log(data);      
                    })              
                break;
            case 3:
                bankFactory
                    .deleteRec($scope.bank.id)
                    .success(function(data){
                        growl.addInfoMessage('Delete success, silahkan refresh data ulang !!');     
                        //delete $scope.banks[idx];
                        getAllDirektorat();
                        $scope.tutupGrid = !$scope.tutupGrid;
                    })
                    .error(function(data){
                        growl.addWarnMessage('Error Delete ' + data)                                
                    });             
                break;          
        }

        growl.addInfoMessage("Coba1");
        bankFactory
                .getAll()
                .success(function (data){
                    $scope.banks = data ;                                     
                }).error(function(data){
                    growl.addWarnMessage("Error Loading getAll data !",{ttl: 4000});        
                });             

    };

    $scope.tutupDetil=function(){
        $scope.tutupGrid = !$scope.tutupGrid;
    };

    $scope.previewLaporan=function(){
         $window.open($rootScope.pathServerJSON + '/laporan/bank', '_blank');
    }      

}]);