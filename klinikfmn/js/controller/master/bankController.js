appControllers.controller('bankController', ['$scope', 'bankFactory','growl',
    function($scope, bankFactory, growl){
    
    var idx=0;
    $scope.tutupGrid=false;
    $scope.classForm='';
    $scope.banks=[];
    $scope.orderbank='id';
    $scope.grup={
    	idFieldGroup: 4,
    	fieldGroupName: "BANK",
    	active: "true"
    }
    $scope.bank={
        idField: null,
        fieldGroup: null,      
        fieldName: "",
        active:""
    };
    $scope.search='';

    $scope.jenisTransaksi;
    //1. add
    //2. edit
    //3. deleter    

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
            idField: null, 
            fieldGroup: null,     
            fieldName: "",
            active:"true"
        };
    };

    $scope.cari=function(){
        getAllbank();
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
                .getAllByName($scope.search)
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
		   		$scope.bank.fieldGroup = null;
            });

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
        
    };

    $scope.proses=function(){
        switch($scope.jenisTransaksi){
            case 1:
                $scope.bank.idField='';
        		$scope.bank.fieldGroup = $scope.grup;
                bankFactory
                    .insert($scope.bank)
                    .success(function(data){
                        growl.addInfoMessage('insert success ' + data );
                        $scope.jenisTransaksi=2;
                        $scope.bank.idField=data.idField;
                        $scope.banks.push($scope.bank);
                        $scope.tutupGrid = !$scope.tutupGrid;
		                getAllbank();
                    })
                    .error(function(data){
                        growl.addWarnMessage('Error insert ' + data);       
                    })
                break;
            case 2:
        		$scope.bank.fieldGroup = $scope.grup;
                bankFactory
                    .update($scope.bank.idField, $scope.bank)
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

    };

    $scope.tutupDetil=function(){
        $scope.tutupGrid = !$scope.tutupGrid;
    };

    $scope.previewLaporan=function(){
         $window.open($rootScope.pathServerJSON + '/laporan/bank', '_blank');
    }      

}]);