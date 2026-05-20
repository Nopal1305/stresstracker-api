import { InvariantError, NotFoundError } from '../../../exceptions/index.js';
import { nanoid } from 'nanoid';
import response from '../../../utils/response.js';
import checkin from '../checkin.js'; // Asumsi ini adalah array mock kamu

export const addCheckin = (req, res, next) => {
    // 1. Tangkap kelompok data utama dari request body
    const { 
        tidur, 
        perasaan, 
        aktivitas, 
        gayaHidup, 
        gadgetKerja, 
        sosial, 
        tanggal 
    } = req.validate;

    // 2. Destructuring bersarang (Nested) sekaligus Translate (Aliasing)
    const { 
        durasi: sleepHours, 
        kualitas: sleepQuality, 
        kebangunMalam: wokeUpMidnight, 
        mimpiburuk: nightmares 
    } = tidur || {}; // Tambahkan || {} untuk mencegah error jika undefined

    const { 
        mood: moodScore, 
        kecemasan: anxietyScore, 
        energi: energyLevel, 
        emosi: feelings 
    } = perasaan || {};

    const { 
        olahraga: exerciseDone, 
        jenisOlahraga: exerciseType, 
        durasiOlahraga: exerciseDuration, 
        intensitas: exerciseIntensity, 
        langkah: stepsCount 
    } = aktivitas || {};

    const { 
        kafein: coffeeCups, 
        airPutih: waterLiters, 
        kualitasMakan: foodQuality, 
        alkohol: alcoholConsumed, 
        merokok: smoked 
    } = gayaHidup || {};

    const { 
        screentime: screenTimeHours, 
        screenSebelumTidur: screenBeforeBedMins, 
        bebanKerja: workloadLevel, 
        scrollingSosmed: doomScrolling, 
        lembur: overtime, 
        deadline: urgentDeadlines 
    } = gadgetKerja || {};

    const { 
        interaksiSosial: socialInteraction, 
        konflik: socialConflict, 
        kesepian: feltLonely, 
        meditasi: meditated, 
        hobi: didHobbies, 
        luarRuangan: outdoorTimeMins 
    } = sosial || {};

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newcheckin = { 
        id, 
        sleepHours, 
        wokeUpMidnight, 
        nightmares, 
        sleepQuality, 
        moodScore, 
        anxietyScore, 
        energyLevel, 
        feelings, 
        exerciseDone, 
        exerciseType, 
        exerciseDuration, 
        exerciseIntensity, 
        stepsCount, 
        coffeeCups, 
        waterLiters, 
        foodQuality, 
        alcoholConsumed, 
        smoked, 
        screenTimeHours, 
        screenBeforeBedMins, 
        workloadLevel, 
        doomScrolling, 
        overtime, 
        urgentDeadlines, 
        socialInteraction, 
        socialConflict, 
        feltLonely, 
        meditated, 
        didHobbies, 
        outdoorTimeMins, 
        date: tanggal, // Menyimpan tanggal yang dikirim Fawwas
        createdAt, 
        updatedAt 
    };

    // 5. Masukkan ke dalam array (Mock Database)
    checkin.push(newcheckin);

    // 6. Validasi apakah berhasil masuk
    const isSuccess = checkin.filter((checkin) => checkin.id === id).length > 0;

    if (!isSuccess) {
        return next(new InvariantError('Catatan harian gagal ditambahkan'));
    }

    // 7. Kembalikan response sukses
    return response(res, 201, 'Catatan harian berhasil disimpan', { newcheckin });
}