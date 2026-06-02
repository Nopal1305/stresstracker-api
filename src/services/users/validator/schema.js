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
  otpCode: Joi.string().length(6).required(),
});

export const ForgotPasswordSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: true } }).required(),
});

export const ResetPasswordSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: true } }).required(),
  otpCode: Joi.string().length(6).required(),
  newPassword: Joi.string().min(6).required(),
});

export const ChangePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().min(8).required()
});

export const EditProfileSchema = Joi.object({
  fullname: Joi.string().required(),
  username: Joi.string().required(),
  birthDate: Joi.string().required(), // Format YYYY-MM-DD
  pekerjaan: Joi.string().required()
});