/* eslint-disable camelcase */
import CheckinRepository from '../repositories/checkin-repositories.js';
import UserRepository from '../../users/repositories/user-repositories.js';
import response from '../../../utils/response.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import axios from 'axios';

export const addCheckin = async (req, res, next) => {
  try {
    const owner = req.user.id;
    const userProfile = await UserRepository.getUserById(owner);

    const tanggalLahir = userProfile.birthDate || userProfile.birth_date;

    let usia = 20; // Default kalau gagal
    if (tanggalLahir) {
      const birthYear = new Date(tanggalLahir).getFullYear();
      const currentYear = new Date().getFullYear();
      if (!isNaN(birthYear)) {
        usia = currentYear - birthYear;
      }
    }

    const jenisKelamin = userProfile.jenisKelamin || userProfile.jenis_kelamin || 'Perempuan';
    const pekerjaan = userProfile.pekerjaan || 'Mahasiswa';

    const { tanggal, tidur, gayaHidup, produktivitas, mentalSosial } = req.validated;

    const { durasi_tidur_menit, screen_sebelum_tidur, sering_terbangun_malam, mimpi_buruk } = tidur;
    const { waktu_outdoor, minum_kopi_hari_ini, merokok, konsumsi_alkohol, aktivitas_hobi } = gayaHidup;
    const { deadline_hari_ini, lembur, konsentrasi } = produktivitas;
    const { suasana_hati, konflik_interpersonal, merasa_kesepian, meditasi, interaksi_sosial } = mentalSosial;

    const payloadData = {
      owner, date: tanggal, jenis_kelamin: jenisKelamin,
      pekerjaan: pekerjaan,
      usia: usia, durasi_tidur_menit, screen_sebelum_tidur, sering_terbangun_malam, mimpi_buruk,
      waktu_outdoor, minum_kopi_hari_ini, merokok, konsumsi_alkohol, aktivitas_hobi,
      deadline_hari_ini, lembur, konsentrasi,
      suasana_hati, konflik_interpersonal, merasa_kesepian, meditasi, interaksi_sosial
    };

    let stress_level_result = null;
    try {
      // Kita pakai await supaya Node.js nunggu jawaban dari Python dulu
      const mlResponse = await axios.post('http://localhost:5001/predict', payloadData);

      // Ambil angka hasilnya (misal: 1, 2, atau 3)
      if (mlResponse.data && mlResponse.data.status === 'success') {
        stress_level_result = mlResponse.data.stress_level_result;
      }
    } catch (mlError) {
      console.error('Gagal menghubungi API Python:', mlError.message);
    }

    const checkinData = {
      owner, date: tanggal,
      durasi_tidur_menit, screen_sebelum_tidur, sering_terbangun_malam, mimpi_buruk,
      waktu_outdoor, minum_kopi_hari_ini, merokok, konsumsi_alkohol, aktivitas_hobi,
      deadline_hari_ini, lembur, konsentrasi,
      suasana_hati, konflik_interpersonal, merasa_kesepian, meditasi, interaksi_sosial,
      stress_level_result
    };

    const checkin = await CheckinRepository.addCheckin(checkinData);

    if (!checkin) {
      throw new InvariantError('Catatan harian gagal ditambahkan ke database');
    }

    return response(res, 201, 'Catatan harian berhasil disimpan ke database', {
      checkinId: checkin,
      stress_level_result
    });
  } catch (error) {
    return next(error);
  }
};

export const getLatestCheckin = async (req, res, next) => {
  try {
    const owner = req.user.id;
    const checkin = await CheckinRepository.getCheckins(owner);
    if (!checkin) {
      return response(res, 200, 'Belum ada data check-in', { checkin: null });
    }
    return response(res, 200, 'Data check-in terbaru berhasil diambil', { checkin });
  } catch (error) {
    return next(error);
  }
};