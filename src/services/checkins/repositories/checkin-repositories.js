import { nanoid } from 'nanoid';
import { Pool } from 'pg';

class CheckinRepository {
    constructor() {
        this._pool = new Pool(); // Pastikan file .env sudah terisi
    }

    async addCheckin(checkinData) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const {
            owner, date,
            sleepHours, sleepQuality, wokeUpMidnight, nightmares,
            moodScore, anxietyScore, energyLevel, feelings,
            exerciseDone, exerciseType, exerciseDuration, exerciseIntensity, stepsCount,
            coffeeCups, waterLiters, foodQuality, alcoholConsumed, smoked,
            screenTimeHours, screenBeforeBedMins, workloadLevel, doomScrolling, overtime, urgentDeadlines,
            socialInteraction, socialConflict, feltLonely, meditated, didHobbies, outdoorTimeMins
        } = checkinData;

        const query = {
            text: `INSERT INTO checkins (
        id, owner, date, 
        sleep_hours, sleep_quality, woke_up_midnight, nightmares, 
        mood_score, anxiety_score, energy_level, feelings, 
        exercise_done, exercise_type, exercise_duration, exercise_intensity, steps_count, 
        coffee_cups, water_liters, food_quality, alcohol_consumed, smoked, 
        screen_time_hours, screen_before_bed_mins, workload_level, doom_scrolling, overtime, urgent_deadlines, 
        social_interaction, social_conflict, felt_lonely, meditated, did_hobbies, outdoor_time_mins, 
        created_at, updated_at
      ) VALUES (
        $1, $2, $3, 
        $4, $5, $6, $7, 
        $8, $9, $10, $11, 
        $12, $13, $14, $15, $16, 
        $17, $18, $19, $20, $21, 
        $22, $23, $24, $25, $26, $27, 
        $28, $29, $30, $31, $32, $33, 
        $34, $35
      ) RETURNING id`,
            values: [
                id, owner, date,
                sleepHours, sleepQuality, wokeUpMidnight, nightmares,
                moodScore, anxietyScore, energyLevel, feelings,
                exerciseDone, exerciseType, exerciseDuration, exerciseIntensity, stepsCount,
                coffeeCups, waterLiters, foodQuality, alcoholConsumed, smoked,
                screenTimeHours, screenBeforeBedMins, workloadLevel, doomScrolling, overtime, urgentDeadlines,
                socialInteraction, socialConflict, feltLonely, meditated, didHobbies, outdoorTimeMins,
                createdAt, updatedAt
            ],
        };

        const result = await this._pool.query(query);

        // Langsung return baris pertama dari hasil RETURNING
        // Jika gagal, bisa saja result.rows[0] undefined
        return result.rows[0];
    }

    async getCheckins(owner) {
        const query = {
            text: 'SELECT * FROM checkins WHERE owner = $1',
            values: [owner],
        };

        const result = await this._pool.query(query);
        return result.rows;
    }
}

export default CheckinRepository;