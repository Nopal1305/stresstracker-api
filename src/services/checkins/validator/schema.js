import Joi from "joi";

export const checkinPayloadSchema = Joi.object({
    tanggal: Joi.string().isoDate().required(),

    tidur: Joi.object({
        durasi: Joi.number().min(0).max(24).required(),
        kualitas: Joi.number().integer().min(0).max(4).required(),
        kebangunMalam: Joi.boolean().required(),
        mimpiburuk: Joi.boolean().required(),
    }).required(),

    perasaan: Joi.object({
        mood: Joi.number().integer().min(1).max(10).required(),
        kecemasan: Joi.number().integer().min(1).max(5).required(),
        energi: Joi.number().integer().min(0).max(4).required(),
        emosi: Joi.array().items(Joi.string()).allow(null, '').optional(),
    }).required(),

    aktivitas: Joi.object({
        olahraga: Joi.boolean().required(),
        jenisOlahraga: Joi.array().items(Joi.string()).allow(null, '').optional(),
        durasiOlahraga: Joi.number().min(0).required(),
        intensitas: Joi.string().allow('', null).optional(),
        langkah: Joi.number().integer().min(0).required(),
    }).required(),

    gayaHidup: Joi.object({
        kafein: Joi.number().integer().min(0).required(),
        airPutih: Joi.number().min(0).required(),
        kualitasMakan: Joi.number().integer().min(1).max(5).required(),
        alkohol: Joi.boolean().required(),
        merokok: Joi.boolean().required(),
    }).required(),

    gadgetKerja: Joi.object({
        screentime: Joi.number().min(0).required(),
        screenSebelumTidur: Joi.number().integer().min(0).required(),
        bebanKerja: Joi.number().integer().min(0).max(4).required(),
        scrollingSosmed: Joi.boolean().required(),
        lembur: Joi.boolean().required(),
        deadline: Joi.boolean().required(),
    }).required(),

    sosial: Joi.object({
        interaksiSosial: Joi.number().integer().min(1).max(5).required(),
        konflik: Joi.boolean().required(),
        kesepian: Joi.boolean().required(),
        meditasi: Joi.boolean().required(),
        hobi: Joi.boolean().required(),
        luarRuangan: Joi.number().integer().min(0).required(),
    }).required(),
})