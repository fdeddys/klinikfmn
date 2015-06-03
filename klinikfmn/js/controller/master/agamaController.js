appControllers.controller('agamaController', ['$scope', 'agamaFactory','growl',
    function($scope, agamaFactory, growl){
    
    var idx=0;
    $scope.tutupGrid=false;
    $scope.classForm='';
    $scope.agamas=[];
    $scope.orderagama='id';
    $scope.grup={
    	idFieldGroup: 3,
    	fieldGroupName: "AGAMA",
    	active: "true"
    }
    $scope.agama={
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

    getAllagama();

    $scope.getAll=function(){
        getAllagama();
    };
    
    $scope.tambah=function(){
        $scope.jenisTransaksi=1;
        $scope.tutupGrid = !$scope.tutupGrid;
        $scope.classForm = 'formTambah';
        // $scope.agama.id='[Automatic]';             
        // $scope.agama.nama='';
        // $scope.agama.active='true';
        $scope.agama={
            idField: null, 
            fieldGroup: null,     
            fieldName: "",
            active:"true"
        };
    };

    $scope.cari=function(){
        getAllagama();
    };
    
    function getAllagama(){
        //alert('get all kode arsip');

        if($scope.search===''){
            agamaFactory
                .getAll()
                .success(function (data){
                    $scope.agamas = data ;                                     
                }).error(function(data){
                    growl.addWarnMessage("Error Loading getAll data !",{ttl: 4000});        
                });             
        }else{
            agamaFactory
                .getAllByName($scope.search)
                .success(function (data){
                    $scope.agamas = data ;                 
                }).error(function(data){
                    growl.addWarnMessage("Error Loading getAll data by nama !",{ttl: 4000});        
                });                 
        }
        
    };

    $scope.urut=function(urut_berdasar){
        $scope.orderagama=urut_berdasar;       
    };

    $scope.ubah=function(id, nama,urut){
        $scope.jenisTransaksi=2;
        $scope.tutupGrid = !$scope.tutupGrid;
        $scope.classForm = 'formUbah';
        idx=urut;
        agamaFactory
            .getById(id)
            .success(function(data){
                $scope.agama =data;                
		   		$scope.agama.fieldGroup = null;
            });

    };

    $scope.hapus=function(id, urut){
        $scope.jenisTransaksi=3;
        $scope.tutupGrid = !$scope.tutupGrid;
        $scope.classForm = 'formHapus';
        idx=urut;
        agamaFactory
            .getById(id)
            .success(function(data){
                $scope.agama =data;                
            });
        
    };

    $scope.proses=function(){
        switch($scope.jenisTransaksi){
            case 1:
                $scope.agama.idField='';
        		$scope.agama.fieldGroup = $scope.grup;
                agamaFactory
                    .insert($scope.agama)
                    .success(function(data){
                        growl.addInfoMessage('insert success ' + data );
                        $scope.jenisTransaksi=2;
                        $scope.agama.idField=data.idField;
                        $scope.agamas.push($scope.agama);
                        $scope.tutupGrid = !$scope.tutupGrid;
		                getAllagama();
                    })
                    .error(function(data){
                        growl.addWarnMessage('Error insert ' + data);       
                    })
                break;
            case 2:
        		$scope.agama.fieldGroup = $scope.grup;
                agamaFactory
                    .update($scope.agama.idField, $scope.agama)
                    .success(function(data){
                        growl.addInfoMessage('edit success');   
                        $scope.agamas[idx]=$scope.agama;  
                        $scope.tutupGrid = !$scope.tutupGrid;               
                    })
                    .error(function(data){
                        growl.addWarnMessage('Error Updata ' + data);
                        console.log(data);      
                    })              
                break;
            case 3:
                agamaFactory
                    .deleteRec($scope.agama.id)
                    .success(function(data){
                        growl.addInfoMessage('Delete success, silahkan refresh data ulang !!');     
                        //delete $scope.agamas[idx];
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
         $window.open($rootScope.pathServerJSON + '/laporan/agama', '_blank');
    }      

}]);