appControllers.controller('pendidikanController', ['$scope', 'pendidikanFactory','growl',
    function($scope, pendidikanFactory, growl){
    
    var idx=0;
    $scope.tutupGrid=false;
    $scope.classForm='';
    $scope.pendidikans=[];
    $scope.orderpendidikan='id';
    $scope.grup={
    	idFieldGroup: 2,
    	fieldGroupName: "PENDIDIKAN",
    	active: "true"
    }
    $scope.pendidikan={
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

    getAllpendidikan();

    $scope.getAll=function(){
        getAllpendidikan();
    };
    
    $scope.tambah=function(){
        $scope.jenisTransaksi=1;
        $scope.tutupGrid = !$scope.tutupGrid;
        $scope.classForm = 'formTambah';
        // $scope.pendidikan.id='[Automatic]';             
        // $scope.pendidikan.nama='';
        // $scope.pendidikan.active='true';
        $scope.pendidikan={
            idField: null, 
            fieldGroup: null,     
            fieldName: "",
            active:"true"
        };
    };

    $scope.cari=function(){
        getAllpendidikan();
    };
    
    function getAllpendidikan(){
        //alert('get all kode arsip');

        if($scope.search===''){
            pendidikanFactory
                .getAll()
                .success(function (data){
                    $scope.pendidikans = data ;                                     
                }).error(function(data){
                    growl.addWarnMessage("Error Loading getAll data !",{ttl: 4000});        
                });             
        }else{
            pendidikanFactory
                .getAllByName($scope.search)
                .success(function (data){
                    $scope.pendidikans = data ;                 
                }).error(function(data){
                    growl.addWarnMessage("Error Loading getAll data by nama !",{ttl: 4000});        
                });                 
        }
        
    };

    $scope.urut=function(urut_berdasar){
        $scope.orderpendidikan=urut_berdasar;       
    };

    $scope.ubah=function(id, nama,urut){
        $scope.jenisTransaksi=2;
        $scope.tutupGrid = !$scope.tutupGrid;
        $scope.classForm = 'formUbah';
        idx=urut;
        pendidikanFactory
            .getById(id)
            .success(function(data){
                $scope.pendidikan =data;                
		   		$scope.pendidikan.fieldGroup = null;
            });

    };

    $scope.hapus=function(id, urut){
        $scope.jenisTransaksi=3;
        $scope.tutupGrid = !$scope.tutupGrid;
        $scope.classForm = 'formHapus';
        idx=urut;
        pendidikanFactory
            .getById(id)
            .success(function(data){
                $scope.pendidikan =data;                
            });
        
    };

    $scope.proses=function(){
        switch($scope.jenisTransaksi){
            case 1:
                $scope.pendidikan.idField='';
        		$scope.pendidikan.fieldGroup = $scope.grup;
                pendidikanFactory
                    .insert($scope.pendidikan)
                    .success(function(data){
                        growl.addInfoMessage('insert success ' + data );
                        $scope.jenisTransaksi=2;
                        $scope.pendidikan.idField=data.idField;
                        $scope.pendidikans.push($scope.pendidikan);
                        $scope.tutupGrid = !$scope.tutupGrid;
		                getAllpendidikan();
                    })
                    .error(function(data){
                        growl.addWarnMessage('Error insert ' + data);       
                    })
                break;
            case 2:
        		$scope.pendidikan.fieldGroup = $scope.grup;
                pendidikanFactory
                    .update($scope.pendidikan.idField, $scope.pendidikan)
                    .success(function(data){
                        growl.addInfoMessage('edit success');   
                        $scope.pendidikans[idx]=$scope.pendidikan;  
                        $scope.tutupGrid = !$scope.tutupGrid;               
                    })
                    .error(function(data){
                        growl.addWarnMessage('Error Updata ' + data);
                        console.log(data);      
                    })              
                break;
            case 3:
                pendidikanFactory
                    .deleteRec($scope.pendidikan.id)
                    .success(function(data){
                        growl.addInfoMessage('Delete success, silahkan refresh data ulang !!');     
                        //delete $scope.pendidikans[idx];
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
         $window.open($rootScope.pathServerJSON + '/laporan/pendidikan', '_blank');
    }      

}]);