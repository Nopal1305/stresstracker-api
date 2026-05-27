/* eslint-disable camelcase */
import CheckinRepository from '../repositories/checkin-repositories.js'; // Sesuaikan path-nya ya
import response from '../../../utils/response.js';

export const addCheckin = async (req, res, next) => {
  try {
    const { tanggal, tidur, gayaHidup, produktivitas, mentalSosial } = req.validated;

    const { durasi_tidur_menit, screen_sebelum_tidur, sering_terbangun_malam, mimpi_buruk } = tidur;
    const { waktu_outdoor, minum_kopi_hari_ini, merokok, konsumsi_alkohol, aktivitas_hobi } = gayaHidup;
    const { deadline_hari_ini, lembur, konsentrasi } = produktivitas;
    const { suasana_hati, konflik_interpersonal, merasa_kesepian, meditasi, interaksi_sosial } = mentalSosial;

    const owner = 'user-dummy-123';

    const checkinData = {
      owner, date: tanggal,
      durasi_tidur_menit, screen_sebelum_tidur, sering_terbangun_malam, mimpi_buruk,
      waktu_outdoor, minum_kopi_hari_ini, merokok, konsumsi_alkohol, aktivitas_hobi,
      deadline_hari_ini, lembur, konsentrasi,
      suasana_hati, konflik_interpersonal, merasa_kesepian, meditasi, interaksi_sosial
    };

    // Nanti di sini kita selipkan Axios untuk hit API Python pakai data `checkinData`
    // Hasil dari Python (stress_level) ditambahkan ke objek checkinData

    const result = await checkinRepository.addCheckin(checkinData);

    if (!result || !result.id) {
      throw new InvariantError('Catatan harian gagal ditambahkan ke database');
    }

    return response(res, 201, 'Catatan harian berhasil disimpan ke database', { checkinId: result.id });
  } catch (error) {
    return next(error);
  }
};

export const getAllCheckin = async (req, res, next) => {
  const owner = 'user-dummy-123';

  const checkins = await checkinRepository.getCheckins(owner);

  return response(res, 200, 'Berhasil mengambil riwayat catatan harian dari database', { checkins });
};