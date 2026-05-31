import UserRepository from '../repositories/user-repositories.js';
import response from '../../../utils/response.js';
import userRepositorie from '../repositories/user-repositories.js';
import sendOtp from '../../../utils/email-sender.js';


export const registerUser = async (req, res, next) => {
  try {
    const { email, username, password, fullname, birthDate, jenisKelamin, pekerjaan } = req.validated;

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiredAt = new Date(Date.now() + 5 * 60 * 1000);

    const userId = await UserRepository.addUser({
      email, username, password, fullname, birthDate, jenisKelamin, pekerjaan, otpCode, otpExpiredAt
    });

    await sendOtp(email, otpCode);

    return response(res, 201, 'Registrasi tahap 1 berhasil! Silakan cek email untuk kode verifikasi.', { userId, email });
  } catch (error) {
    return next(error);
  }
};

export const verifyOTP = async (req, res, next) => {
  try {
    const { email, otpCode } = req.validated;

    await UserRepository.verifyUserOTP(email, otpCode);

    return response(res, 200, 'Verifikasi berhasil!');
  } catch (error) {
    return next(error);
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await userRepositorie.getUserById(userId);
    return response(res, 200, 'Profil pengguna berhasil diambil', { user });
  } catch (error) {
    return next(error);
  }
};