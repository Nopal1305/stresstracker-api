import UserRepository from '../repositories/user-repositories.js';
import response from '../../../utils/response.js';
import userRepositorie from '../repositories/user-repositories.js';
import sendOtp from '../../../utils/email-sender.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import bcrypt from 'bcrypt';


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

export const changePassword = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.validated;

    const user = await UserRepository.getUserPasswordById(userId);

    // 2. Cek kecocokan password lama
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new InvariantError('Password lama yang Anda masukkan salah.');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await UserRepository.updatePassword(userId, hashedNewPassword);

    return response(res, 200, 'Password berhasil diperbarui!');
  } catch (error) {
    return next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.validated;

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiredAt = new Date(Date.now() + 5 * 60 * 1000);

    await UserRepository.addResetOTP(email, otpCode, otpExpiredAt);

    await sendOtp(email, otpCode, 'reset');

    return response(res, 200, 'Kode OTP untuk reset password telah dikirim ke email Anda.');
  } catch (error) {
    return next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { email, otpCode, newPassword } = req.validated;

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await UserRepository.resetPassword(email, otpCode, hashedPassword);

    return response(res, 200, 'Password berhasil diubah. Silakan login menggunakan password baru.');
  } catch (error) {
    return next(error);
  }
};