import Joi from 'joi';
//Schema daftar akun
export const UserRegistrationSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(50).required(),
  password: Joi.string().min(6).required(),
  fullname: Joi.string().required(),
  birthDate: Joi.string().isoDate().required(),
  jenisKelamin: Joi.string().valid('Pria', 'Wanita').required(),
  pekerjaan: Joi.string().required(),
});