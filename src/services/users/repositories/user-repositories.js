import pool from '../../../api/db.js';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';
import { InvariantError, NotFoundError } from '../../../exceptions/index.js';


class UserRepository {
  constructor() {
    this._pool = pool;;
  }

  async verifyNewEmail(email) {
    const query = {
      text: 'SELECT email FROM users WHERE email=$1',
      values: [email]
    };

    const result = await this._pool.query(query);
    if (result.rows.length > 0) {
      throw new InvariantError('Email sudah terdaftar');
    }
  }

  async verifyNewUsername(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new InvariantError('Gagal menambahkan user. Username sudah digunakan.');
    }
  }

  async verifyUserOTP(email, otpCode) {
    const querySearch = {
      text: 'SELECT id, otp_code, otp_expired_at, is_verified FROM users WHERE email=$1',
      values: [email]
    };
    const result = await this._pool.query(querySearch);

    if (!result.rows.length) {
      return new NotFoundError('Email tidak terdaftar');
    }

    const user = result.rows[0];

    if (user.is_verified) {
      return new InvariantError('Akun sudah terverifikasi');
    }

    if (user.otp_code !== otpCode) {
      return new InvariantError('Kode otp salah');
    }

    const now = new Date();
    if (user.otp_expired_at < now) {
      return new InvariantError('Otp kedaluwarsa');
    }

    const queryUpdate = {
      text: 'UPDATE users SET is_verified = true, otp_code = NULL, otp_expired_at = NULL WHERE email = $1',
      values: [email],
    };
    await this._pool.query(queryUpdate);
  }

  async addUser({ email, username, password, fullname, birthDate, jenisKelamin, pekerjaan, otpCode, otpExpiredAt }) {

    await this.verifyNewEmail(email);
    await this.verifyNewUsername(username);

    const id = `user-${nanoid(16)}`;

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: `INSERT INTO users (
        id, email, username, password, fullname, birth_date, jenis_kelamin, pekerjaan, created_at, updated_at, otp_code, otp_expired_at, is_verified
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, false) RETURNING id`,
      values: [id, email, username, hashedPassword, fullname, birthDate, jenisKelamin, pekerjaan, createdAt, updatedAt, otpCode, otpExpiredAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('User gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getUserById(Id) {
    const query = {
      text: 'SELECT id, email, username, fullname, birth_date AS "birthDate", jenis_kelamin AS "jenisKelamin", pekerjaan FROM users WHERE id=$1',
      values: [Id]
    };

    const user = await this._pool.query(query);
    if (user.rows.length === 0) {
      return null;
    }

    return user.rows[0];
  }

  async verifyUserCredential(identifier, password) {
    const query = {
      text: 'SELECT id, username, email, password, is_verified FROM users WHERE username = $1 OR email = $1',
      values: [identifier],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Username atau Email tidak ditemukan.');
    }

    const user = result.rows[0];

    if (!user.is_verified) {
      return new InvariantError('Akun belum diverifikasi');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new InvariantError('Password salah.');
    }
    return user.id;
  }
}

export default new UserRepository();