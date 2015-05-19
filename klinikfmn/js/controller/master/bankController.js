appControllers.controller('bankController', ['$scope', 'bankFactory','growl',
    function($scope, bankFactory, growl){
    
    var idx=0;
    $scope.tutupGrid=false;
    $scope.classForm='';
    $scope.banks=[];
    $scope.orderbank='id';
    $scope.bank={
        idField: 0,
        fieldGroup : "4",      
        fieldName: "",
        active:true
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
        $scope.bank.idField='[Automatic]';             
        $scope.bank.fieldName='';
        $scope.bank.active='true';
        // $scope.bank={
        //     idField: 0, 
        //     fieldGroup : null,     
        //     fieldName: "",
        //     active:true
        // };
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
                // if($scope.bank.data==true){
                //     $scope.bank.active=true 
                // }else{
                //     $scope.bank.active=false 
                // }             
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

        var groupBank;

        bankFactory    
            .getGroupBank()
            .success(function(data){
                groupBank=data;
                $scope.bank.fieldGroup=groupBank;

                switch($scope.jenisTransaksi){
                    case 1:

                        //  $scope.bank={
                        //     idField: null,
                        //     fieldGroup : {
                        //         idFieldGroup: 4,
                        //         fieldGroupName: "BANK",
                        //         active: true
                        //         },      
                        //     fieldName: "tes",
                        //     active:true
                        // };
                        $scope.bank.idField=null;
                        bankFactory
                            .insert($scope.bank)
                            .success(function(data){
                                growl.addInfoMessage('insert success ' + data );
                                // $scope.jenisTransaksi=2;
                                // $scope.bank.idField =data.idField;
                                // $scope.banks.push($scope.bank);
                                $scope.tutupGrid = !$scope.tutupGrid;
                                getAllbank();
                            })
                            .error(function(data){
                                growl.addWarnMessage('Error insert ' + data);       
                            })
                        
                        break;
                    case 2:
                        bankFactory
                            .update($scope.bank.idField, $scope.bank)
                            .success(function(data){
                                growl.addInfoMessage('edit success');   
                                // $scope.banks[idx]=$scope.bank;  
                                $scope.tutupGrid = !$scope.tutupGrid;               
                                getAllbank();
                            })
                            .error(function(data){
                                growl.addWarnMessage('Error Updata ' + data);
                                console.log(data);      
                            })              
                        break;
                    case 3:
                        bankFactory
                            .deleteRec($scope.bank.idField)
                            .success(function(data){
                                growl.addInfoMessage('Delete success, silahkan refresh data ulang !!');     
                                //delete $scope.banks[idx];
                                // getAllDirektorat();
                                $scope.tutupGrid = !$scope.tutupGrid;
                                getAllbank();
                            })
                            .error(function(data){
                                growl.addWarnMessage('Error Delete ' + data)                                
                            });             
                        break;          
                }

            })
            .error(function(data){
                growl.addWarnMessage('Error get Group Bank');                
            })
        

    };

    $scope.tutupDetil=function(){
        $scope.tutupGrid = !$scope.tutupGrid;
    };

    $scope.previewLaporan=function(){
         $window.open($rootScope.pathServerJSON + '/laporan/bank', '_blank');
    }      

}]);