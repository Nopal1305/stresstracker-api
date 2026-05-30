# StressTracker API

API untuk mencatat checkin harian dan memprediksi tingkat stres menggunakan Machine Learning.

## Endpoint
https://stresstracker-api.vercel.app

## User

### Register
* URL: `/users`
* Method: `POST`

#### Request Body
* `username` as `string`, 
* `password` as `string`,
* `fullname` as `string`,
* `birthDate` as `string` (format YYYY-MM-DD),
* `jenisKelamin` as `string` (format Laki-laki/Perempuan),
* `pekerjaan` as `string` (format Dokter, Freelancer, Guru, Irt, Karyawan, Mahasiswa, Wirausaha),

#### Response
```json
{
  "status": "success",
  "message": "User berhasil ditambahkan",
  "data": {
    "userId": "user-123"
  }
}
```

### Login
* URL: `/login`
* Method: `POST`

#### Request Body
* `username` as `string`, 
* `password` as `string`,

#### Response
```json
{
    "code": 201,
    "status": "success",
    "message": "User berhasil login",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItRVJsd0VJOGF3dDMxS2I1aiIsImlhdCI6MTc4MDA2MDA3M30.cY0PEgogtv77UQKPTycgT_Kjer-X66bvNeO_wPH2lF0",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItRVJsd0VJOGF3dDMxS2I1aiIsImlhdCI6MTc4MDA2MDA3M30.aNUKB5uV-RN7Ic3fM_2pmFjSFi6nq-lnER1f5yqlmFI"
    }
}
```

### Get User logged in
* URL: `/me`
* Method: `GET`

#### Header: 
+ `Auhtohrization: Bearer <accesToken>`
#### Response
```json
{
    "code": 200,
    "status": "success",
    "message": "Profil pengguna berhasil diambil",
    "data": {
        "user": {
            "id": "user-Rr1Mccr89ey0Blhi",
            "username": "novawijaya",
            "fullname": "Nova Wijaya",
            "birthDate": "2002-05-12T17:00:00.000Z",
            "jenisKelamin": "Laki-laki",
            "pekerjaan": "Mahasiswa"
        }
    }
}
```

### Perbarui Refresh Token
* URL: `/authentications`
* Method: `PUT`

#### Request Body
```json
{
    "refreshToken": "{{refreshToken}}"
}
```
#### Response
```json
{
    "code": 200,
    "status": "success",
    "message": "Access Token berhasil diperbarui",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItZHJOR296X01hX2hjY1lpMyIsImlhdCI6MTc4MDA2MDQ1Mn0.m2PsWmR2v0tSJ25IDwAglgcQQDCdRfeu1PPqNc67DUg"
    }
}
```

### Logout

* URL: `/authentications`
* Method: `DELETE`

#### Request Body
```json
{
    "refreshToken": "{{refreshToken}}"
}
```
#### Response
```json
{
    "code": 200,
    "status": "success",
    "message": "Refresh token berhasil dihapus"
}
```


## Check-in

### Add Check-in
* URL: `/checkins`
* Method: `POST`

#### Request Body

* `tanggal` as `string` (format YYYY-MM-DD), wajib diisi
* `tidur` as `object`, wajib diisi
  * `durasi_tidur_menit` as `integer` (waktu dalam menit)
  * `screen_sebelum_tidur` as `integer` (waktu dalam menit)
  * `sering_terbangun_malam` as `string` ("Ya" / "Tidak")
  * `mimpi_buruk` as `string` ("Ya" / "Tidak")
* `gayaHidup` as `object`, wajib diisi
  * `waktu_outdoor` as `integer` (waktu dalam menit)
  * `minum_kopi_hari_ini` as `string` ("Ya" / "Tidak")
  * `merokok` as `string` ("Ya" / "Tidak")
  * `konsumsi_alkohol` as `string` ("Ya" / "Tidak")
  * `aktivitas_hobi` as `string` ("Ya" / "Tidak")
* `produktivitas` as `object`, wajib diisi
  * `deadline_hari_ini` as `string` ("Ya" / "Tidak")
  * `lembur` as `string` ("Ya" / "Tidak")
  * `konsentrasi` as `integer` (skala angka)
* `mentalSosial` as `object`, wajib diisi
  * `suasana_hati` as `string` ("Positif", "Netral", "Campur", "Negatif")
  * `konflik_interpersonal` as `string` ("Ya" / "Tidak")
  * `merasa_kesepian` as `string` ("Ya" / "Tidak")
  * `meditasi` as `string` ("Ya" / "Tidak")
  * `interaksi_sosial` as `integer` (skala angka)

#### Response
```json
{
  "tanggal": "2026-05-29",
  "tidur": {
    "durasi_tidur_menit": 180,
    "screen_sebelum_tidur": 120,
    "sering_terbangun_malam": "Ya",
    "mimpi_buruk": "Ya"
  },
  "gayaHidup": {
    "waktu_outdoor": 0,
    "minum_kopi_hari_ini": "Ya",
    "merokok": "Ya",
    "konsumsi_alkohol": "Ya",
    "aktivitas_hobi": "Tidak"
  },
  "produktivitas": {
    "deadline_hari_ini": "Ya",
    "lembur": "Ya",
    "konsentrasi": 1
  },
  "mentalSosial": {
    "suasana_hati": "Negatif",
    "konflik_interpersonal": "Ya",
    "merasa_kesepian": "Ya",
    "meditasi": "Tidak",
    "interaksi_sosial": 1
  }
}
```

### Get Checkins

* URL: `/checkins`
* Method: `GET`

#### Header: 
* `Auhtohrization: Bearer <accesToken>`

#### Response 
```json
{
    "code": 200,
    "status": "success",
    "message": "Data check-in terbaru berhasil diambil",
    "data": {
        "checkin": [
            {
                "id": "checkin-2zowvc6aEnM6gesS",
                "owner": "user-Rr1Mccr89ey0Blhi",
                "date": "2026-05-28T17:00:00.000Z",
                "durasi_tidur_menit": 180,
                "screen_sebelum_tidur": 120,
                "waktu_outdoor": 0,
                "sering_terbangun_malam": "Ya",
                "mimpi_buruk": "Ya",
                "minum_kopi_hari_ini": "Ya",
                "merokok": "Ya",
                "konsumsi_alkohol": "Ya",
                "deadline_hari_ini": "Ya",
                "lembur": "Ya",
                "aktivitas_hobi": "Tidak",
                "suasana_hati": "Negatif",
                "konflik_interpersonal": "Ya",
                "merasa_kesepian": "Ya",
                "meditasi": "Tidak",
                "konsentrasi": 1,
                "interaksi_sosial": 1,
                "stress_level_result": null,
                "created_at": "2026-05-29T12:31:52.701Z",
                "updated_at": "2026-05-29T12:31:52.701Z"
            }
        ]
    }
}
```
