appControllers.controller('dokterController', ['$scope', 'dokterFactory','growl',
    function($scope, dokterFactory, growl){
    
    var idx=0;
    $scope.tutupGrid=false;
    $scope.classForm='';
    $scope.dokters=[];
    $scope.orderdokter='id';
    $scope.grup={
    	idFieldGroup: 5,
    	fieldGroupName: "DOKTER",
    	active: "true"
    }
    $scope.dokter={
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

    getAlldokter();

    $scope.getAll=function(){
        getAlldokter();
    };
    
    $scope.tambah=function(){
        $scope.jenisTransaksi=1;
        $scope.tutupGrid = !$scope.tutupGrid;
        $scope.classForm = 'formTambah';
        // $scope.dokter.id='[Automatic]';             
        // $scope.dokter.nama='';
        // $scope.dokter.active='true';
        $scope.dokter={
            idField: null, 
            fieldGroup: null,     
            fieldName: "",
            active:"true"
        };
    };

    $scope.cari=function(){
        getAlldokter();
    };
    
    function getAlldokter(){
        //alert('get all kode arsip');

        if($scope.search===''){
            dokterFactory
                .getAll()
                .success(function (data){
                    $scope.dokters = data ;                                     
                }).error(function(data){
                    growl.addWarnMessage("Error Loading getAll data !",{ttl: 4000});        
                });             
        }else{
            dokterFactory
                .getAllByName($scope.search)
                .success(function (data){
                    $scope.dokters = data ;                 
                }).error(function(data){
                    growl.addWarnMessage("Error Loading getAll data by nama !",{ttl: 4000});        
                });                 
        }
        
    };

    $scope.urut=function(urut_berdasar){
        $scope.orderdokter=urut_berdasar;       
    };

    $scope.ubah=function(id, nama,urut){
        $scope.jenisTransaksi=2;
        $scope.tutupGrid = !$scope.tutupGrid;
        $scope.classForm = 'formUbah';
        idx=urut;
        dokterFactory
            .getById(id)
            .success(function(data){
                $scope.dokter =data;                
		   		$scope.dokter.fieldGroup = null;
            });

    };

    $scope.hapus=function(id, urut){
        $scope.jenisTransaksi=3;
        $scope.tutupGrid = !$scope.tutupGrid;
        $scope.classForm = 'formHapus';
        idx=urut;
        dokterFactory
            .getById(id)
            .success(function(data){
                $scope.dokter =data;                
            });
        
    };

    $scope.proses=function(){
        switch($scope.jenisTransaksi){
            case 1:
                $scope.dokter.idField='';
        		$scope.dokter.fieldGroup = $scope.grup;
                dokterFactory
                    .insert($scope.dokter)
                    .success(function(data){
                        growl.addInfoMessage('insert success ' + data );
                        $scope.jenisTransaksi=2;
                        $scope.dokter.idField=data.idField;
                        $scope.dokters.push($scope.dokter);
                        $scope.tutupGrid = !$scope.tutupGrid;
		                getAlldokter();
                    })
                    .error(function(data){
                        growl.addWarnMessage('Error insert ' + data);       
                    })
                break;
            case 2:
        		$scope.dokter.fieldGroup = $scope.grup;
                dokterFactory
                    .update($scope.dokter.idField, $scope.dokter)
                    .success(function(data){
                        growl.addInfoMessage('edit success');   
                        $scope.dokters[idx]=$scope.dokter;  
                        $scope.tutupGrid = !$scope.tutupGrid;               
                    })
                    .error(function(data){
                        growl.addWarnMessage('Error Updata ' + data);
                        console.log(data);      
                    })              
                break;
            case 3:
                dokterFactory
                    .deleteRec($scope.dokter.id)
                    .success(function(data){
                        growl.addInfoMessage('Delete success, silahkan refresh data ulang !!');     
                        //delete $scope.dokters[idx];
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
         $window.open($rootScope.pathServerJSON + '/laporan/dokter', '_blank');
    }      

}]);