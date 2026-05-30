import pool from '../../../api/db.js';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';
import { InvariantError, AuthenticationError } from '../../../exceptions/index.js';


class UserRepository {
  constructor() {
    this._pool = pool;;
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

  async addUser({ username, password, fullname, birthDate, jenisKelamin, pekerjaan }) {

    await this.verifyNewUsername(username);

    const id = `user-${nanoid(16)}`;

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: `INSERT INTO users (
        id, username, password, fullname, birth_date, jenis_kelamin, pekerjaan, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
      values: [id, username, hashedPassword, fullname, birthDate, jenisKelamin, pekerjaan, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('User gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getUserById(Id) {
    const query = {
      text: 'SELECT id, username, fullname, birth_date AS "birthDate", jenis_kelamin AS "jenisKelamin", pekerjaan FROM users WHERE id=$1',
      values: [Id]
    };

    const user = await this._pool.query(query);
    if (!user) {
      return null;
    }

    return user.rows[0];
  }

  async verifyUserCredential(username, password) {
    const query = {
      text: 'SELECT id, password FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rows.length === 0) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }

    const { id, password: hashedPassword } = result.rows[0];

    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }

    return id;
  }
}

export default new UserRepository();