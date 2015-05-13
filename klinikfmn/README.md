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
--FieldGroup : PEKERJAAN id: 1, PENDIDIKAN id:2, AGAMA id:3, BANK id:4, DOKTER id:5
GET ALL         : http://10.1.0.11:8080/fmn-clinic-server/api/fieldgroup
GET ID          : http://10.1.0.11:8080/fmn-clinic-server/api/fieldgroup/id/{idFieldGroup}
GET NAME        : http://10.1.0.11:8080/fmn-clinic-server/api/fieldgroup/name/{fieldGroupName}
POST            : http://10.1.0.11:8080/fmn-clinic-server/api/fieldgroup
PUT             : http://10.1.0.11:8080/fmn-clinic-server/api/fieldgroup/id/{idFieldGroup}
NEW             : http://10.1.0.11:8080/fmn-clinic-server/api/fieldgroup/layout

--Field
GET ALL         : http://10.1.0.11:8080/fmn-clinic-server/api/fieldgroup/idfieldgroup/{idFieldGroup}/field
GET NAME        : http://10.1.0.11:8080/fmn-clinic-server/api/fieldgroup/fieldgroupname/{fieldGroupName}/field
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
POST            : http://10.1.0.11:8080/fmn-clinic-server/api/patient
PUT             : http://10.1.0.11:8080/fmn-clinic-server/api/patient/id/{patientID}
NEW             : http://10.1.0.11:8080/fmn-clinic-server/api/patient/layout

--Tariff
GET ALL         : http://10.1.0.11:8080/fmn-clinic-server/api/tariff/size/{pageSize}/number/{pageNumber}
GET NAME        : http://10.1.0.11:8080/fmn-clinic-server/api/tariff/name/{tariffName}/size/{pageSize}/number/{pageNumber}
POST            : http://10.1.0.11:8080/fmn-clinic-server/api/tariff
PUT             : http://10.1.0.11:8080/fmn-clinic-server/api/tariff/{idtariff}
NEW             : http://10.1.0.11:8080/fmn-clinic-server/api/tariff/layout

--User
GET ALL         : http://10.1.0.11:8080/fmn-clinic-server/api/user
GET ID          : http://10.1.0.11:8080/fmn-clinic-server/api/user/id/{idUser}
GET NAME        : http://10.1.0.11:8080/fmn-clinic-server/api/user/name/{username}
GET UserID +    : http://10.1.0.11:8080/fmn-clinic-server/api/user/name/{userID}/password/{password}
Password
POST            : http://10.1.0.11:8080/fmn-clinic-server/api/user
PUT             : http://10.1.0.11:8080/fmn-clinic-server/api/user/id/{idUser}
NEW             : http://10.1.0.11:8080/fmn-clinic-server/api/user/layout

------------
REGISTRATION
------------
--Registration
GET ALL         : http://10.1.0.11:8080/fmn-clinic-server/api/registration/size/{pageSize}/number/{pageNumber}
GET ID          : http://10.1.0.11:8080/fmn-clinic-server/api/registration/id/{idRegistration}
GET NAME  + date: http://10.1.0.11:8080/fmn-clinic-server/api/registration/date/{registrationDate}/name/{patientName}/size/{pageSize}/number/{pageNumber}
GET  date       : http://10.1.0.11:8080/fmn-clinic-server/api/registration/date/{registrationDate}/size/{pageSize}/number/{pageNumber}
GET patient no  : http://10.1.0.11:8080/fmn-clinic-server/api/registration/patientno/{patientNo}/size/{pageSize}/number/{pageNumber}
GET reg no      : http://10.1.0.11:8080/fmn-clinic-server/api/registration/no/{registrationNo}
POST            : http://10.1.0.11:8080/fmn-clinic-server/api/registration
PUT             : http://10.1.0.11:8080/fmn-clinic-server/api/registration/id/{idRegistration}
PUT   assess    : http://10.1.0.11:8080/fmn-clinic-server/api/registration/id/{idRegistration}/assess
NEW             : http://10.1.0.11:8080/fmn-clinic-server/api/registration/layout

--Assessment
GET ALL         : http://10.1.0.11:8080/fmn-clinic-server/api/assessment/size/{pageSize}/number/{pageNumber}
GET ID          : http://10.1.0.11:8080/fmn-clinic-server/api/assessment/id/{idRegistration}
GET NAME        : http://10.1.0.11:8080/fmn-clinic-server/api/assessment/name/{patientName}/size/{pageSize}/number/{pageNumber}
GET reg no      : http://10.1.0.11:8080/fmn-clinic-server/api/assessment/registrationno/{registrationNo}
POST            : http://10.1.0.11:8080/fmn-clinic-server/api/assessment
PUT             : http://10.1.0.11:8080/fmn-clinic-server/api/assessment/id/{idAssessment}
NEW             : http://10.1.0.11:8080/fmn-clinic-server/api/assessment/layout

-----------
TRANSACTION
-----------
--TransactionHdr:
GET ALL         : http://10.1.0.11:8080/fmn-clinic-server/api/transaction/hdr/size/{pageSize}/number/{pageNumber}
GET ID          : http://10.1.0.11:8080/fmn-clinic-server/transaction/hdr/id/{idTransaction}
GET NAME   +date: http://10.1.0.11:8080/fmn-clinic-server/api/transaction/hdr/date/{transactionDate}/name/{patientName}/size/{pageSize}/number/{pageNumber}
GET date        : http://10.1.0.11:8080/fmn-clinic-server/api/transaction/hdr/date/{transactionDate}/size/{pageSize}/number/{pageNumber}
GET reg no      : http://10.1.0.11:8080/fmn-clinic-server/api/transaction/hdr/registrationno/{registrationNo}/size/{pageSize}/number/{pageNumber}
GET sum trans   : http://10.1.0.11:8080/fmn-clinic-server/api/transaction/hdr/registrationno/{registrationNo}/sum
GET trans no    : http://10.1.0.11:8080/fmn-clinic-server/api/transaction/hdr/transaction/{transactionNo}
POST            : http://10.1.0.11:8080/fmn-clinic-server/api/transaction/hdr
PUT             : http://10.1.0.11:8080/fmn-clinic-server/api/transaction/hdr/id/{idTransactionHdr}
PUT  paid status: http://10.1.0.11:8080/fmn-clinic-server/api/transaction/hdr/registrationno/{registrationNo}/update/status/{status}/user/{userID}
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

--Pharmacy Transaction:
GET sum trans   : http://10.1.0.11:8080/fmn-clinic-server/api/registrationno/{registrationNo}/sum
PUT paid status : http://10.1.0.11:8080/fmn-clinic-server/api/registrationno/{registrationNo}/update/status/{status}/user/{userID}

--Payment
GET ALL         : http://10.1.0.11:8080/fmn-clinic-server/api/payment/size/{pageSize}/number/{pageNumber}
GET reg no      : http://10.1.0.11:8080/fmn-clinic-server/api/payment/registrationno/{registrationNo}/size/{pageSize}/number/{pageNumber}
GET name        : http://10.1.0.11:8080/fmn-clinic-server/api/payment/date/{paymentDate}/name/{patientName}/size/{pageSize}/number/{pageNumber}
GET  date       : http://10.1.0.11:8080/fmn-clinic-server/api/payment/date/{paymentDate}/size/{pageSize}/number/{pageNumber}
Get no          : http://10.1.0.11:8080/fmn-clinic-server/api/payment/payment/{paymentNo}
POST            : http://10.1.0.11:8080/fmn-clinic-server/api/payment
PUT             : http://10.1.0.11:8080/fmn-clinic-server/api/payment/id/{idPayment}
NEW             : http://10.1.0.11:8080/fmn-clinic-server/api/payment/layout










