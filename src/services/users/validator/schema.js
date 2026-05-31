import Joi from 'joi';
//Schema daftar akun
export const UserRegistrationSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: true } }).required(),
  username: Joi.string().alphanum().min(3).max(50).required(),
  password: Joi.string().min(6).required(),
  fullname: Joi.string().required(),
  birthDate: Joi.string().isoDate().required(),
  jenisKelamin: Joi.string().valid('Laki-laki', 'Perempuan').required(),
  pekerjaan: Joi.string().valid('Dokter', 'Freelancer', 'Guru', 'Irt', 'Karyawan', 'Mahasiswa', 'Wirausaha').required(),
});

export const VerifyOTPSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: true } }).required(),
  otpCode: Joi.string().length(6).required(), // Pakai .length(6) kalau kodemu fix 6 digit
});