appControllers.controller('pekerjaanController', ['$scope', 'pekerjaanFactory','growl',
    function($scope, pekerjaanFactory, growl){
    
    var idx=0;
    $scope.tutupGrid=false;
    $scope.classForm='';
    $scope.pekerjaans=[];
    $scope.orderpekerjaan='id';
    $scope.grup={
    	idFieldGroup: 1,
    	fieldGroupName: "PEKERJAAN",
    	active: "true"
    }
    $scope.pekerjaan={
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

    getAllpekerjaan();

    $scope.getAll=function(){
        getAllpekerjaan();
    };
    
    $scope.tambah=function(){
        $scope.jenisTransaksi=1;
        $scope.tutupGrid = !$scope.tutupGrid;
        $scope.classForm = 'formTambah';
        // $scope.pekerjaan.id='[Automatic]';             
        // $scope.pekerjaan.nama='';
        // $scope.pekerjaan.active='true';
        $scope.pekerjaan={
            idField: null, 
            fieldGroup: null,     
            fieldName: "",
            active:"true"
        };
    };

    $scope.cari=function(){
        getAllpekerjaan();
    };
    
    function getAllpekerjaan(){
        //alert('get all kode arsip');

        if($scope.search===''){
            pekerjaanFactory
                .getAll()
                .success(function (data){
                    $scope.pekerjaans = data ;                                     
                }).error(function(data){
                    growl.addWarnMessage("Error Loading getAll data !",{ttl: 4000});        
                });             
        }else{
            pekerjaanFactory
                .getAllByName($scope.search)
                .success(function (data){
                    $scope.pekerjaans = data ;                 
                }).error(function(data){
                    growl.addWarnMessage("Error Loading getAll data by nama !",{ttl: 4000});        
                });                 
        }
        
    };

    $scope.urut=function(urut_berdasar){
        $scope.orderpekerjaan=urut_berdasar;       
    };

    $scope.ubah=function(id, nama,urut){
        $scope.jenisTransaksi=2;
        $scope.tutupGrid = !$scope.tutupGrid;
        $scope.classForm = 'formUbah';
        idx=urut;
        pekerjaanFactory
            .getById(id)
            .success(function(data){
                $scope.pekerjaan =data;                
		   		$scope.pekerjaan.fieldGroup = null;
            });

    };

    $scope.hapus=function(id, urut){
        $scope.jenisTransaksi=3;
        $scope.tutupGrid = !$scope.tutupGrid;
        $scope.classForm = 'formHapus';
        idx=urut;
        pekerjaanFactory
            .getById(id)
            .success(function(data){
                $scope.pekerjaan =data;                
            });
        
    };

    $scope.proses=function(){
        switch($scope.jenisTransaksi){
            case 1:
                $scope.pekerjaan.idField='';
        		$scope.pekerjaan.fieldGroup = $scope.grup;
                pekerjaanFactory
                    .insert($scope.pekerjaan)
                    .success(function(data){
                        growl.addInfoMessage('insert success ' + data );
                        $scope.jenisTransaksi=2;
                        $scope.pekerjaan.idField=data.idField;
                        $scope.pekerjaans.push($scope.pekerjaan);
                        $scope.tutupGrid = !$scope.tutupGrid;
		                getAllpekerjaan();
                    })
                    .error(function(data){
                        growl.addWarnMessage('Error insert ' + data);       
                    })
                break;
            case 2:
        		$scope.pekerjaan.fieldGroup = $scope.grup;
                pekerjaanFactory
                    .update($scope.pekerjaan.idField, $scope.pekerjaan)
                    .success(function(data){
                        growl.addInfoMessage('edit success');   
                        $scope.pekerjaans[idx]=$scope.pekerjaan;  
                        $scope.tutupGrid = !$scope.tutupGrid;               
                    })
                    .error(function(data){
                        growl.addWarnMessage('Error Updata ' + data);
                        console.log(data);      
                    })              
                break;
            case 3:
                pekerjaanFactory
                    .deleteRec($scope.pekerjaan.id)
                    .success(function(data){
                        growl.addInfoMessage('Delete success, silahkan refresh data ulang !!');     
                        //delete $scope.pekerjaans[idx];
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
         $window.open($rootScope.pathServerJSON + '/laporan/pekerjaan', '_blank');
    }      

}]);