/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable('checkins', {
    // Primary Key & Relasi Akun
    id: { type: 'VARCHAR(50)', primaryKey: true },
    owner: { type: 'VARCHAR(50)', notNull: true },
    date: { type: 'DATE', notNull: true },

    // Variabel Input Harian dari Frontend
    durasi_tidur_menit: { type: 'REAL', notNull: true },
    screen_sebelum_tidur: { type: 'REAL', notNull: true },
    waktu_outdoor: { type: 'REAL', notNull: true },
    sering_terbangun_malam: { type: 'VARCHAR(10)', notNull: true },
    mimpi_buruk: { type: 'VARCHAR(10)', notNull: true },
    minum_kopi_hari_ini: { type: 'VARCHAR(10)', notNull: true },
    merokok: { type: 'VARCHAR(10)', notNull: true },
    konsumsi_alkohol: { type: 'VARCHAR(10)', notNull: true },
    deadline_hari_ini: { type: 'VARCHAR(10)', notNull: true },
    lembur: { type: 'VARCHAR(10)', notNull: true },
    aktivitas_hobi: { type: 'VARCHAR(100)', notNull: true },
    suasana_hati: { type: 'VARCHAR(100)', notNull: true },
    konflik_interpersonal: { type: 'VARCHAR(10)', notNull: true },
    merasa_kesepian: { type: 'VARCHAR(10)', notNull: true },
    meditasi: { type: 'VARCHAR(10)', notNull: true },
    konsentrasi: { type: 'INTEGER', notNull: true },
    interaksi_sosial: { type: 'INTEGER', notNull: true },

    // Kolom Tambahan untuk Menyimpan Hasil Prediksi Model ML Python
    stress_level_result: { type: 'INTEGER' },

    // Timestamps
    created_at: { type: 'TEXT', notNull: true },
    updated_at: { type: 'TEXT', notNull: true },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('checkins');
};
