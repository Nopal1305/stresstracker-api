import admin from 'firebase-admin';
import UserRepository from '../services/users/repositories/user-repositories.js';

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const messaging = admin.messaging();

// TAMBAHKAN FUNGSI INI DI BAWAHNYA
export const sendPushNotification = async (userId, title, body) => {
  try {
    const fcmToken = await UserRepository.getFcmToken(userId);

    // Kalau user belum punya token, berarti dia belum izinkan notif di frontend
    if (!fcmToken) {
      console.log(`User ${userId} tidak memiliki FCM Token. Notifikasi dibatalkan.`);
      return;
    }

    const message = {
      notification: {
        title: title,
        body: body,
      },
      token: fcmToken,
    };

    const response = await messaging.send(message);
    console.log(`Berhasil mengirim notifikasi ke user ${userId}:`, response);

  } catch (error) {
    console.error('Gagal mengirim notifikasi Firebase:', error);
  }
};