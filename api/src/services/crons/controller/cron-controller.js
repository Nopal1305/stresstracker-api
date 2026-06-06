import UserRepository from '../../users/repositories/user-repositories.js';
import { sendPushNotification } from '../../../utils/firebase.js';
import response from '../../../utils/response.js';

export const triggerReminders = async (req, res, next) => {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    const currentTime = formatter.format(now).replace('.', ':');

    console.log(`[CRON] Mengecek jadwal pengingat untuk jam: ${currentTime}`);

    const targetUsers = await UserRepository.getUsersToRemind(currentTime);

    if (targetUsers.length === 0) {
      return response(res, 200, `Tidak ada pengingat untuk jam ${currentTime}`);
    }

    await Promise.all(targetUsers.map((user) =>
      sendPushNotification(
        user.id,
        'Waktunya Check-in! 📝',
        'Yuk, luangkan waktu sebentar untuk mencatat kondisimu hari ini.'
      )
    ));

    return response(res, 200, `Berhasil mengirim ${targetUsers.length} notifikasi pengingat.`);
  } catch (error) {
    console.error('[CRON ERROR]', error);
    return res.status(500).json({ error: 'Gagal menjalankan cron' });
  }
};