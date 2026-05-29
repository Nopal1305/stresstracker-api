/* eslint-disable camelcase */
import pkg from 'pg';
import { nanoid } from 'nanoid';
import InvariantError from '../../../exceptions/invariant-error.js';

const { Pool } = pkg;

class CheckinRepository {
  constructor() {
    this._pool = new Pool();
  }

  async addCheckin({
    owner,
    date,
    durasi_tidur_menit,
    screen_sebelum_tidur,
    sering_terbangun_malam,
    mimpi_buruk,
    waktu_outdoor,
    minum_kopi_hari_ini,
    merokok,
    konsumsi_alkohol,
    aktivitas_hobi,
    deadline_hari_ini,
    lembur,
    konsentrasi,
    suasana_hati,
    konflik_interpersonal,
    merasa_kesepian,
    meditasi,
    interaksi_sosial,
    stress_level_result // Akan diisi nanti dari respons API Python
  }) {
    const id = `checkin-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: `INSERT INTO checkins (
        id, owner, date,
        durasi_tidur_menit, screen_sebelum_tidur, waktu_outdoor,
        sering_terbangun_malam, mimpi_buruk, minum_kopi_hari_ini,
        merokok, konsumsi_alkohol, deadline_hari_ini,
        lembur, aktivitas_hobi, suasana_hati,
        konflik_interpersonal, merasa_kesepian, meditasi,
        konsentrasi, interaksi_sosial, stress_level_result,
        created_at, updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23
      ) RETURNING id`,
      values: [
        id,
        owner,
        date,
        durasi_tidur_menit,
        screen_sebelum_tidur,
        waktu_outdoor,
        sering_terbangun_malam,
        mimpi_buruk,
        minum_kopi_hari_ini,
        merokok,
        konsumsi_alkohol,
        deadline_hari_ini,
        lembur,
        aktivitas_hobi,
        suasana_hati,
        konflik_interpersonal,
        merasa_kesepian,
        meditasi,
        konsentrasi,
        interaksi_sosial,
        stress_level_result || null,
        createdAt,
        updatedAt
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Catatan check-in harian gagal ditambahkan ke database');
    }

    return result.rows[0].id;
  }

  async getCheckins(owner) {
    const query = {
      text: 'SELECT * FROM checkins WHERE owner = $1 ORDER BY date DESC',
      values: [owner]
    };

    const result = await this._pool.query(query);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows;
  }
}

export default new CheckinRepository();