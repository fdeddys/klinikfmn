appControllers.controller('headerController', ['$scope', 'headerFactory','growl',
    function($scope, headerFactory, growl){
    
    var idx=0;
    $scope.tutupGrid=false;
    $scope.classForm='';
    $scope.headers=[];
    $scope.orderheader='id';
    $scope.grup={
    	idFieldGroup: 7,
    	fieldGroupName: "HEADER",
    	active: "true"
    }
    $scope.header={
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

    getAllheader();

    $scope.getAll=function(){
        getAllheader();
    };
    
    $scope.tambah=function(){
        $scope.jenisTransaksi=1;
        $scope.tutupGrid = !$scope.tutupGrid;
        $scope.classForm = 'formTambah';
        // $scope.header.id='[Automatic]';             
        // $scope.header.nama='';
        // $scope.header.active='true';
        $scope.header={
            idField: null, 
            fieldGroup: null,     
            fieldName: "",
            active:"true"
        };
    };

    $scope.cari=function(){
        getAllheader();
    };
    
    function getAllheader(){
        //alert('get all kode arsip');

        if($scope.search===''){
            headerFactory
                .getAll()
                .success(function (data){
                    $scope.headers = data ;                                     
                }).error(function(data){
                    growl.addWarnMessage("Error Loading getAll data !",{ttl: 4000});        
                });             
        }else{
            headerFactory
                .getAllByName($scope.search)
                .success(function (data){
                    $scope.headers = data ;                 
                }).error(function(data){
                    growl.addWarnMessage("Error Loading getAll data by nama !",{ttl: 4000});        
                });                 
        }
        
    };

    $scope.urut=function(urut_berdasar){
        $scope.orderheader=urut_berdasar;       
    };

    $scope.ubah=function(id, nama,urut){
        $scope.jenisTransaksi=2;
        $scope.tutupGrid = !$scope.tutupGrid;
        $scope.classForm = 'formUbah';
        idx=urut;
        headerFactory
            .getById(id)
            .success(function(data){
                $scope.header =data;                
		   		$scope.header.fieldGroup = null;
            });

    };

    $scope.hapus=function(id, urut){
        $scope.jenisTransaksi=3;
        $scope.tutupGrid = !$scope.tutupGrid;
        $scope.classForm = 'formHapus';
        idx=urut;
        headerFactory
            .getById(id)
            .success(function(data){
                $scope.header =data;                
            });
        
    };

    $scope.proses=function(){
        switch($scope.jenisTransaksi){
            case 1:
                $scope.header.idField='';
        		$scope.header.fieldGroup = $scope.grup;
                headerFactory
                    .insert($scope.header)
                    .success(function(data){
                        growl.addInfoMessage('insert success ' + data );
                        $scope.jenisTransaksi=2;
                        $scope.header.idField=data.idField;
                        $scope.headers.push($scope.header);
                        $scope.tutupGrid = !$scope.tutupGrid;
		                getAllheader();
                    })
                    .error(function(data){
                        growl.addWarnMessage('Error insert ' + data);       
                    })
                break;
            case 2:
        		$scope.header.fieldGroup = $scope.grup;
                headerFactory
                    .update($scope.header.idField, $scope.header)
                    .success(function(data){
                        growl.addInfoMessage('edit success');   
                        $scope.headers[idx]=$scope.header;  
                        $scope.tutupGrid = !$scope.tutupGrid;               
                    })
                    .error(function(data){
                        growl.addWarnMessage('Error Updata ' + data);
                        console.log(data);      
                    })              
                break;
            case 3:
                headerFactory
                    .deleteRec($scope.header.id)
                    .success(function(data){
                        growl.addInfoMessage('Delete success, silahkan refresh data ulang !!');     
                        //delete $scope.headers[idx];
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
         $window.open($rootScope.pathServerJSON + '/laporan/header', '_blank');
    }      

}]);