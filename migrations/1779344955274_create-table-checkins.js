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
        // 1. Primary Key & Relasi Akun
        id: { type: 'VARCHAR(50)', primaryKey: true },
        owner: { type: 'VARCHAR(50)', notNull: true }, // Kolom krusial untuk pemisahan data tiap akun!
        date: { type: 'DATE', notNull: true },

        // 2. Group Tidur
        sleep_hours: { type: 'REAL', notNull: true }, // REAL = Float/Decimal (misal 6.5 jam)
        sleep_quality: { type: 'INTEGER', notNull: true },
        woke_up_midnight: { type: 'BOOLEAN', notNull: true },
        nightmares: { type: 'BOOLEAN', notNull: true },

        // 3. Group Perasaan
        mood_score: { type: 'INTEGER', notNull: true },
        anxiety_score: { type: 'INTEGER', notNull: true },
        energy_level: { type: 'INTEGER', notNull: true },
        feelings: { type: 'TEXT[]' }, // Array of strings untuk banyak emosi sekaligus

        // 4. Group Aktivitas
        exercise_done: { type: 'BOOLEAN', notNull: true },
        exercise_type: { type: 'TEXT[]' }, // Array of strings
        exercise_duration: { type: 'INTEGER', notNull: true },
        exercise_intensity: { type: 'VARCHAR(50)' },
        steps_count: { type: 'INTEGER', notNull: true },

        // 5. Group Gaya Hidup
        coffee_cups: { type: 'INTEGER', notNull: true },
        water_liters: { type: 'REAL', notNull: true },
        food_quality: { type: 'INTEGER', notNull: true },
        alcohol_consumed: { type: 'BOOLEAN', notNull: true },
        smoked: { type: 'BOOLEAN', notNull: true },

        // 6. Group Gadget & Kerja
        screen_time_hours: { type: 'REAL', notNull: true },
        screen_before_bed_mins: { type: 'INTEGER', notNull: true },
        workload_level: { type: 'INTEGER', notNull: true },
        doom_scrolling: { type: 'BOOLEAN', notNull: true },
        overtime: { type: 'BOOLEAN', notNull: true },
        urgent_deadlines: { type: 'BOOLEAN', notNull: true },

        // 7. Group Sosial
        social_interaction: { type: 'INTEGER', notNull: true },
        social_conflict: { type: 'BOOLEAN', notNull: true },
        felt_lonely: { type: 'BOOLEAN', notNull: true },
        meditated: { type: 'BOOLEAN', notNull: true },
        did_hobbies: { type: 'BOOLEAN', notNull: true },
        outdoor_time_mins: { type: 'INTEGER', notNull: true },

        // 8. Timestamps (Standar Dicoding)
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
