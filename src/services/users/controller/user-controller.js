import UserRepository from '../repositories/user-repositories.js'; // Sesuaikan path-nya ya!
import response from '../../../utils/response.js';
import userRepositorie from '../repositories/user-repositories.js';


export const registerUser = async (req, res, next) => {
  try {
    const { username, password, fullname, birthDate, jenisKelamin, pekerjaan } = req.validated;

    const userId = await UserRepository.addUser({
      username, password, fullname, birthDate, jenisKelamin, pekerjaan
    });

    return response(res, 201, 'Registrasi berhasil! Akun telah dibuat.', { userId });
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