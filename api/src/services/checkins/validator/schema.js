/* eslint-disable camelcase */
import Joi from 'joi';

export const CheckinPayloadSchema = Joi.object({
  tanggal: Joi.string().isoDate().required(),

  tidur: Joi.object({
    durasi_tidur_menit: Joi.number().min(0).required(),
    screen_sebelum_tidur: Joi.number().min(0).required(),
    sering_terbangun_malam: Joi.string().valid('Ya', 'Tidak').required(),
    mimpi_buruk: Joi.string().valid('Ya', 'Tidak').required(),
  }).required(),

  gayaHidup: Joi.object({
    waktu_outdoor: Joi.number().min(0).required(),
    minum_kopi_hari_ini: Joi.string().valid('Ya', 'Tidak').required(),
    merokok: Joi.string().valid('Ya', 'Tidak').required(),
    konsumsi_alkohol: Joi.string().valid('Ya', 'Tidak').required(),
    aktivitas_hobi: Joi.string().valid('Ya', 'Tidak').required()
  }).required(),

  produktivitas: Joi.object({
    deadline_hari_ini: Joi.string().valid('Ya', 'Tidak').required(),
    lembur: Joi.string().valid('Ya', 'Tidak').required(),
    konsentrasi: Joi.number().integer().min(1).max(5).required(),
  }).required(),

  mentalSosial: Joi.object({
    suasana_hati: Joi.string().valid('Positif', 'Negatif', 'Netral', 'Campur').required(),
    konflik_interpersonal: Joi.string().valid('Ya', 'Tidak').required(),
    merasa_kesepian: Joi.string().valid('Ya', 'Tidak').required(),
    meditasi: Joi.string().valid('Ya', 'Tidak').required(),
    interaksi_sosial: Joi.number().integer().min(1).max(5).required(),
  }).required(),
});