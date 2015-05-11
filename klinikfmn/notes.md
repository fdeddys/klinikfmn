u/semua master, di entry di fieldgroup dan field cth:
{
idField: 1,
    fieldGroup: {
        idFieldGroup: 1,
        fieldGroupName: "PEKERJAAN",
        active: true
},
fieldName: "Belum Bekerja",
active: true
}
----------------
u/master tariff di tariffgroup dan tariff:
{
idTariff: 1,
tariffName: "a",
rs: 15000,
dokter: 85000,
variable: false,
    tariffGroup: {
        idTariffGroup: 1,
        tariffGroupName: "paket a",
        active: true
},
active: true
}
----------------
u/registration :
field pekerjaan, pdd, agama, dll tarik dari field :
1. searching berdasarkan idFieldGroup : http://10.1.0.11:8080/fmn-clinic-server/api/fieldgroup/idfieldgroup/{idFieldGroup}/field
2. searching berdasarkan fieldGroupName: http://10.1.0.11:8080/fmn-clinic-server/api/fieldgroup/fieldgroupname/{fieldGroupName}/field

u/transaction yg detail:
1. add row
2. add tariff dari tariffGroup misal paket a
2. saat insert paket, data yang di kirim adalah TransactionGroupDto
3. begitu di insert, data yg masuk ke transactiondtl ditarik dari tariff (isi dari paket a)
4. data transactiondtl yang di update adalah data dari tariff
5. delete data transactiondtl adalah data dari tariff, jadi bukan delete paket, tapi isinya

u/payment :
1. hitung transactionTotal :  http://10.1.0.11:8080/fmn-clinic-server/api/transaction/hdr/registrationno/{registrationNo}/sum
2. hitung pharmacyTotal hanya yg byrfm=0 : http://10.1.0.11:8080/fmn-clinic-server/api/registrationno/{registrationNo}/sum
3. creditbank, debet bank tarik dari master field.
4. proses saat approve/unapprove :
   set byrfm dari data fm 1 :  http://10.1.0.11:8080/fmn-clinic-server/api/transaction/hdr/registrationno/{registrationNo}/update/status/{status}--> boolean
   set isPaid dari data transaction 1 : http://10.1.0.11:8080/fmn-clinic-server/api/pharmacy/registrationno/{registrationNo}/update


u/ searching payment date + name --> payment date di isi format yyyy-MM-dd
u/ searching name -->payment date dibuat "-"


