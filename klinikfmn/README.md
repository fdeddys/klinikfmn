mysql
db      : fmncharitas
user    : root
password: root
------------
MS SQL SERVER
db      : fmncharitas
user    : sa
password:
-------------

------
MASTER
------
--FieldGroup
GET ALL         : http://10.1.0.11:8080/fmn-clinic-server/api/fieldgroup/
GET ID          : http://10.1.0.11:8080/fmn-clinic-server/api/fieldgroup/id/{idFieldGroup}
GET NAME        : http://10.1.0.11:8080/fmn-clinic-server/api/fieldgroup/name/{fieldGroupName}
POST            : http://10.1.0.11:8080/fmn-clinic-server/api/fieldgroup/
PUT             : http://10.1.0.11:8080/fmn-clinic-server/api/fieldgroup/id/{idFieldGroup}
NEW             : http://10.1.0.11:8080/fmn-clinic-server/api/fieldgroup/layout

--Field
GET ALL         : http://10.1.0.11:8080/fmn-clinic-server/api/fieldgroup/idfieldgroup/{idFieldGroup}/field
POST            : http://10.1.0.11:8080/fmn-clinic-server/api/fieldgroup/idfieldgroup/{idFieldGroup}/field
PUT             : http://10.1.0.11:8080/fmn-clinic-server/api/fieldgroup/id/{idFieldGroup}/field/idField/{idField}
DELETE          : http://10.1.0.11:8080/fmn-clinic-server/api/fieldgroup/id/{idFieldGroup}/field/idField/{idField}
NEW             : http://10.1.0.11:8080/fmn-clinic-server/api/fieldgroup/field/layout

--Patient
GET ALL         : http://10.1.0.11:8080/fmn-clinic-server/api/patient/size/{pageSize}/number/{pageNumber}
GET no          : http://10.1.0.11:8080/fmn-clinic-server/api/patient/id/{patientNo}
GET name        : http://10.1.0.11:8080/fmn-clinic-server/api/patient/name/{patientName}/size/{pageSize}/number/{pageNumber}
GET name +      : http://10.1.0.11:8080/fmn-clinic-server/api/patient/name/{patientName}/date/{birthDate}/size/{pageSize}/number/{pageNumber}
birth date
POST            : http://10.1.0.11:8080/fmn-clinic-server/api/patient/
PUT             : http://10.1.0.11:8080/fmn-clinic-server/api/patient/id/{patientID}
NEW             : http://10.1.0.11:8080/fmn-clinic-server/api/patient/layout

--Tariff Group
GET ALL         : http://10.1.0.11:8080/fmn-clinic-server/api/tariffgroup/
GET ID          : http://10.1.0.11:8080/fmn-clinic-server/api/tariffgroup/id/{idTariffGroup}
GET NAME        : http://10.1.0.11:8080/fmn-clinic-server/api/tariffgroup/name/{tariffGroupName}
POST            : http://10.1.0.11:8080/fmn-clinic-server/api/tariffgroup/
PUT             : http://10.1.0.11:8080/fmn-clinic-server/api/tariffgroup/id/{idTariffGroup}
NEW             : http://10.1.0.11:8080/fmn-clinic-server/api/tariffgroup/layout

--Tariff
GET ALL         : http://10.1.0.11:8080/fmn-clinic-server/api/tariffgroup/idtariffgroup/{idTariffGroup}/tariff
POST            : http://10.1.0.11:8080/fmn-clinic-server/api/tariffgroup/idtariffgroup/{idTariffGroup}/tariff
PUT             : http://10.1.0.11:8080/fmn-clinic-server/api/tariffgroup/idtariffgroup/{idTariffGroup}/tariff/{idtariff}
DELETE          : http://10.1.0.11:8080/fmn-clinic-server/api/tariffgroup/idtariffgroup/{idTariffGroup}/tariff/{idTariff}
NEW             : http://10.1.0.11:8080/fmn-clinic-server/api/tariffgroup/tariff/layout

--User
GET ALL         : http://10.1.0.11:8080/fmn-clinic-server/api/user/
GET ID          : http://10.1.0.11:8080/fmn-clinic-server/api/user/id/{idUser}
GET NAME        : http://10.1.0.11:8080/fmn-clinic-server/api/user/name/{username}
GET UserID +    : http://10.1.0.11:8080/fmn-clinic-server/api/user/name/{userID}/password/{password}
Password
POST            : http://10.1.0.11:8080/fmn-clinic-server/api/user/
PUT             : http://10.1.0.11:8080/fmn-clinic-server/api/user/id/{idUser}
NEW             : http://10.1.0.11:8080/fmn-clinic-server/api/user/layout

------------
REGISTRATION
------------
--Registration
GET ALL         : http://10.1.0.11:8080/fmn-clinic-server/api/registration/size/{pageSize}/number/{pageNumber}
GET ID          : http://10.1.0.11:8080/fmn-clinic-server/api/registration/id/{idRegistration}
GET NAME        : http://10.1.0.11:8080/fmn-clinic-server/api/registration/name/{patientName}/size/{pageSize}/number/{pageNumber}
GET patient no  : http://10.1.0.11:8080/fmn-clinic-server/api/registration/patientno/{patientNo}/size/{pageSize}/number/{pageNumber}
GET reg no      : http://10.1.0.11:8080/fmn-clinic-server/api/registration/no/{registrationNo}
POST            : http://10.1.0.11:8080/fmn-clinic-server/api/registration/
PUT             : http://10.1.0.11:8080/fmn-clinic-server/api/registration/id/{idRegistration}
NEW             : http://10.1.0.11:8080/fmn-clinic-server/api/registration/layout

--Assessment
GET ALL         : http://10.1.0.11:8080/fmn-clinic-server/api/assessment/size/{pageSize}/number/{pageNumber}
GET ID          : http://10.1.0.11:8080/fmn-clinic-server/api/assessment/id/{idRegistration}
GET NAME        : http://10.1.0.11:8080/fmn-clinic-server/api/assessment/name/{patientName}/size/{pageSize}/number/{pageNumber}
GET reg no      : http://10.1.0.11:8080/fmn-clinic-server/api/assessment/registrationno/{registrationNo}
POST            : http://10.1.0.11:8080/fmn-clinic-server/api/assessment/
PUT             : http://10.1.0.11:8080/fmn-clinic-server/api/assessment/id/{idAssessment}
NEW             : http://10.1.0.11:8080/fmn-clinic-server/api/assessment/layout

-----------
TRANSACTION
-----------
--TransactionHdr:
GET ALL         : http://10.1.0.11:8080/fmn-clinic-server/api/transaction/hdr/size/{pageSize}/number/{pageNumber}
GET ID          : http://10.1.0.11:8080/fmn-clinic-server/transaction/hdr/id/{idTransaction}
GET NAME        : http://10.1.0.11:8080/fmn-clinic-server/api/transaction/hdr/name/{patientName}/size/{pageSize}/number/{pageNumber}
GET reg no      : http://10.1.0.11:8080/fmn-clinic-server/api/transaction/hdr/registrationno/{registrationNo}/size/{pageSize}/number/{pageNumber}
POST            : http://10.1.0.11:8080/fmn-clinic-server/api/transaction/hdr/
PUT             : http://10.1.0.11:8080/fmn-clinic-server/api/transaction/hdr/id/{idTransactionHdr}
NEW             : http://10.1.0.11:8080/fmn-clinic-server/api/transaction/hdr/layout

--TransactionDtl:
GET ALL         : http://10.1.0.11:8080/fmn-clinic-server/api/transaction/hdr/idTransactionHdr/{idTransactionHdr}/dtl
GET ID          : http://10.1.0.11:8080/fmn-clinic-server/transaction/hdr/id/{idTransaction}
GET NAME        : http://10.1.0.11:8080/fmn-clinic-server/api/transaction/hdr/name/{patientName}/size/{pageSize}/number/{pageNumber}
GET reg no      : http://10.1.0.11:8080/fmn-clinic-server/api/transaction/hdr/registrationno/{registrationNo}/size/{pageSize}/number/{pageNumber}
POST            : http://10.1.0.11:8080/fmn-clinic-server/api/transaction/hdr/idTransactionHdr/{idTransactionHdr}/dtl
PUT             : http://10.1.0.11:8080/fmn-clinic-server/api/transaction/hdr/idTransactionHdr/{idTransactionHdr)/dtl/{idTransactionDtl}
DELETE          : http://10.1.0.11:8080/fmn-clinic-server/api/transaction/hdr/idTransactionHdr/{idTransactionHdr)/dtl/{idTransactionDtl}
NEW             : http://10.1.0.11:8080/fmn-clinic-server/api/transaction/hdr/dtl/layout
GROUP           : http://10.1.0.11:8080/fmn-clinic-server/api/transaction/hdr/group/layout








