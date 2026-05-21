import CheckinRepository from '../repositories/checkin-repositories.js'; // Sesuaikan path-nya ya
import response from '../../../utils/response.js';

// 1. Instansiasi repository agar bisa digunakan
const checkinRepository = new CheckinRepository();

export const addCheckin = async (req, res, next) => { // Pastikan pakai 'async'
    const {
        tidur, perasaan, aktivitas, gayaHidup, gadgetKerja, sosial, tanggal
    } = req.validated;

    // Destructuring & Translating (Tetap di sini sebagai penerjemah)
    const { durasi: sleepHours, kualitas: sleepQuality, kebangunMalam: wokeUpMidnight, mimpiburuk: nightmares } = tidur || {};
    const { mood: moodScore, kecemasan: anxietyScore, energi: energyLevel, emosi: feelings } = perasaan || {};
    const { olahraga: exerciseDone, jenisOlahraga: exerciseType, durasiOlahraga: exerciseDuration, intensitas: exerciseIntensity, langkah: stepsCount } = aktivitas || {};
    const { kafein: coffeeCups, airPutih: waterLiters, kualitasMakan: foodQuality, alkohol: alcoholConsumed, merokok: smoked } = gayaHidup || {};
    const { screentime: screenTimeHours, screenSebelumTidur: screenBeforeBedMins, bebanKerja: workloadLevel, scrollingSosmed: doomScrolling, lembur: overtime, deadline: urgentDeadlines } = gadgetKerja || {};
    const { interaksiSosial: socialInteraction, konflik: socialConflict, kesepian: feltLonely, meditasi: meditated, hobi: didHobbies, luarRuangan: outdoorTimeMins } = sosial || {};

    // 2. Dummy owner sementara sampai ada fitur JWT/Authentication
    const owner = 'user-dummy-123';

    // 3. Rangkai data bersihnya
    const checkinData = {
        owner, date: tanggal,
        sleepHours, sleepQuality, wokeUpMidnight, nightmares,
        moodScore, anxietyScore, energyLevel, feelings,
        exerciseDone, exerciseType, exerciseDuration, exerciseIntensity, stepsCount,
        coffeeCups, waterLiters, foodQuality, alcoholConsumed, smoked,
        screenTimeHours, screenBeforeBedMins, workloadLevel, doomScrolling, overtime, urgentDeadlines,
        socialInteraction, socialConflict, feltLonely, meditated, didHobbies, outdoorTimeMins
    };

    // 4. Kirim ke Repository dan tunggu ID-nya kembali
    const checkinId = await checkinRepository.addCheckin(checkinData);

    return response(res, 201, 'Catatan harian berhasil disimpan ke database', { checkinId });
}

export const getAllCheckin = async (req, res, next) => {
    const owner = 'user-dummy-123';

    // Ambil data langsung dari PostgreSQL melalui Repository
    const checkins = await checkinRepository.getCheckins(owner);

    return response(res, 200, 'Berhasil mengambil riwayat catatan harian dari database', { checkins });
}