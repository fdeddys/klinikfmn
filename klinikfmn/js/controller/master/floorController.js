appControllers.controller('floorController', ['$scope', 'floorFactory','growl',
    function($scope, floorFactory, growl){
    
    var idx=0;
    $scope.tutupGrid=false;
    $scope.classForm='';
    $scope.floors=[];
    $scope.orderfloor='id';
    $scope.grup={
    	idFieldGroup: 6,
    	fieldGroupName: "FLOOR",
    	active: "true"
    }
    $scope.floor={
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

    getAllfloor();

    $scope.getAll=function(){
        getAllfloor();
    };
    
    $scope.tambah=function(){
        $scope.jenisTransaksi=1;
        $scope.tutupGrid = !$scope.tutupGrid;
        $scope.classForm = 'formTambah';
        // $scope.floor.id='[Automatic]';             
        // $scope.floor.nama='';
        // $scope.floor.active='true';
        $scope.floor={
            idField: null, 
            fieldGroup: null,     
            fieldName: "",
            active:"true"
        };
    };

    $scope.cari=function(){
        getAllfloor();
    };
    
    function getAllfloor(){
        //alert('get all kode arsip');

        if($scope.search===''){
            floorFactory
                .getAll()
                .success(function (data){
                    $scope.floors = data ;                                     
                }).error(function(data){
                    growl.addWarnMessage("Error Loading getAll data !",{ttl: 4000});        
                });             
        }else{
            floorFactory
                .getAllByName($scope.search)
                .success(function (data){
                    $scope.floors = data ;                 
                }).error(function(data){
                    growl.addWarnMessage("Error Loading getAll data by nama !",{ttl: 4000});        
                });                 
        }
        
    };

    $scope.urut=function(urut_berdasar){
        $scope.orderfloor=urut_berdasar;       
    };

    $scope.ubah=function(id, nama,urut){
        $scope.jenisTransaksi=2;
        $scope.tutupGrid = !$scope.tutupGrid;
        $scope.classForm = 'formUbah';
        idx=urut;
        floorFactory
            .getById(id)
            .success(function(data){
                $scope.floor =data;                
		   		$scope.floor.fieldGroup = null;
            });

    };

    $scope.hapus=function(id, urut){
        $scope.jenisTransaksi=3;
        $scope.tutupGrid = !$scope.tutupGrid;
        $scope.classForm = 'formHapus';
        idx=urut;
        floorFactory
            .getById(id)
            .success(function(data){
                $scope.floor =data;                
            });
        
    };

    $scope.proses=function(){
        switch($scope.jenisTransaksi){
            case 1:
                $scope.floor.idField='';
        		$scope.floor.fieldGroup = $scope.grup;
                floorFactory
                    .insert($scope.floor)
                    .success(function(data){
                        growl.addInfoMessage('insert success ' + data );
                        $scope.jenisTransaksi=2;
                        $scope.floor.idField=data.idField;
                        $scope.floors.push($scope.floor);
                        $scope.tutupGrid = !$scope.tutupGrid;
		                getAllfloor();
                    })
                    .error(function(data){
                        growl.addWarnMessage('Error insert ' + data);       
                    })
                break;
            case 2:
        		$scope.floor.fieldGroup = $scope.grup;
                floorFactory
                    .update($scope.floor.idField, $scope.floor)
                    .success(function(data){
                        growl.addInfoMessage('edit success');   
                        $scope.floors[idx]=$scope.floor;  
                        $scope.tutupGrid = !$scope.tutupGrid;               
                    })
                    .error(function(data){
                        growl.addWarnMessage('Error Updata ' + data);
                        console.log(data);      
                    })              
                break;
            case 3:
                floorFactory
                    .deleteRec($scope.floor.id)
                    .success(function(data){
                        growl.addInfoMessage('Delete success, silahkan refresh data ulang !!');     
                        //delete $scope.floors[idx];
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
         $window.open($rootScope.pathServerJSON + '/laporan/floor', '_blank');
    }      

}]);