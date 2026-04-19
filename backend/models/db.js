import { pool } from '../config/postgresql.js';

// ─────────────────────────────────────────────
// ADMIN helpers
// ─────────────────────────────────────────────

export const adminDb = {
  /** Full row including password — used for login */
  findByEmail: async (email) => {
    const res = await pool.query(`SELECT * FROM admins WHERE email=$1`, [email]);
    return res.rows[0] || null;
  },

  /** Row without password — used in middleware verification */
  findById: async (id) => {
    const res = await pool.query(
      `SELECT id, name, email, created_at FROM admins WHERE id=$1`,
      [id]
    );
    return res.rows[0] || null;
  },

  /** Update hashed password */
  updatePassword: async (id, hashedPassword) => {
    await pool.query(`UPDATE admins SET password=$1 WHERE id=$2`, [hashedPassword, id]);
  },
};

// ─────────────────────────────────────────────
// USER helpers
// ─────────────────────────────────────────────

export const userDb = {
  create: async ({ name, email, password, image = '' }) => {
    const res = await pool.query(
      `INSERT INTO users (name, email, password, image)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, password, image]
    );
    return res.rows[0];
  },

  findByEmail: async (email) => {
    const res = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    return res.rows[0] || null;
  },

  findById: async (id) => {
    const res = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    return res.rows[0] || null;
  },

  findByIdSafe: async (id) => {
    const res = await pool.query(
      `SELECT id, name, email, image, phone, address_line1, address_line2, gender, dob FROM users WHERE id = $1`,
      [id]
    );
    if (!res.rows[0]) return null;
    const u = res.rows[0];
    return { ...u, address: { line1: u.address_line1, line2: u.address_line2 } };
  },

  findAll: async () => {
    const res = await pool.query(`SELECT id FROM users`);
    return res.rows;
  },

  updateById: async (id, fields) => {
    const sets = [];
    const values = [];
    let i = 1;

    if (fields.name !== undefined)         { sets.push(`name=$${i++}`);          values.push(fields.name); }
    if (fields.phone !== undefined)        { sets.push(`phone=$${i++}`);         values.push(fields.phone); }
    if (fields.dob !== undefined)          { sets.push(`dob=$${i++}`);           values.push(fields.dob); }
    if (fields.gender !== undefined)       { sets.push(`gender=$${i++}`);        values.push(fields.gender); }
    if (fields.image !== undefined)        { sets.push(`image=$${i++}`);         values.push(fields.image); }
    if (fields.address_line1 !== undefined){ sets.push(`address_line1=$${i++}`); values.push(fields.address_line1); }
    if (fields.address_line2 !== undefined){ sets.push(`address_line2=$${i++}`); values.push(fields.address_line2); }

    if (sets.length === 0) return;
    values.push(id);
    await pool.query(`UPDATE users SET ${sets.join(', ')} WHERE id=$${i}`, values);
  },
};

// ─────────────────────────────────────────────
// DOCTOR helpers
// ─────────────────────────────────────────────

const rowToDoctor = (row) => {
  if (!row) return null;
  return {
    ...row,
    _id: row.id,
    slots_booked: row.slots_booked || {},
    address: { line1: row.address_line1, line2: row.address_line2 },
    available: row.available,
    college: row.college || 'Not Specified',
  };
};

export const doctorDb = {
  create: async ({ name, email, password, image, speciality, degree, experience, about, fees, address, date, college }) => {
    const res = await pool.query(
      `INSERT INTO doctors (name, email, password, image, speciality, degree, experience, about, fees, address_line1, address_line2, date, college)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
      [name, email, password, image, speciality, degree, experience, about, fees, address?.line1 || '', address?.line2 || '', date, college || '']
    );
    return rowToDoctor(res.rows[0]);
  },


  findByEmail: async (email) => {
    const res = await pool.query(`SELECT * FROM doctors WHERE email=$1`, [email]);
    return rowToDoctor(res.rows[0]);
  },

  findById: async (id) => {
    const res = await pool.query(`SELECT * FROM doctors WHERE id=$1`, [id]);
    return rowToDoctor(res.rows[0]);
  },

  findByIdSafe: async (id) => {
    const res = await pool.query(
      `SELECT id, name, email, image, speciality, degree, experience, about, available, fees, slots_booked, address_line1, address_line2, date FROM doctors WHERE id=$1`,
      [id]
    );
    return rowToDoctor(res.rows[0]);
  },

  findAll: async () => {
    const res = await pool.query(`SELECT * FROM doctors`);
    return res.rows.map(rowToDoctor);
  },

  findAllSafe: async () => {
    const res = await pool.query(
      `SELECT id, name, image, speciality, degree, experience, about, available, fees, slots_booked, address_line1, address_line2, date FROM doctors`
    );
    return res.rows.map(rowToDoctor);
  },

  findAllPublic: async () => {
    const res = await pool.query(
      `SELECT id, name, image, speciality, degree, experience, about, available, fees, address_line1, address_line2, date FROM doctors`
    );
    return res.rows.map(rowToDoctor);
  },

  updateById: async (id, fields) => {
    const sets = [];
    const values = [];
    let i = 1;

    if (fields.fees !== undefined)         { sets.push(`fees=$${i++}`);          values.push(fields.fees); }
    if (fields.about !== undefined)        { sets.push(`about=$${i++}`);         values.push(fields.about); }
    if (fields.available !== undefined)    { sets.push(`available=$${i++}`);     values.push(fields.available); }
    if (fields.address_line1 !== undefined){ sets.push(`address_line1=$${i++}`); values.push(fields.address_line1); }
    if (fields.address_line2 !== undefined){ sets.push(`address_line2=$${i++}`); values.push(fields.address_line2); }
    if (fields.slots_booked !== undefined) { sets.push(`slots_booked=$${i++}`);  values.push(JSON.stringify(fields.slots_booked)); }

    if (sets.length === 0) return;
    values.push(id);
    await pool.query(`UPDATE doctors SET ${sets.join(', ')} WHERE id=$${i}`, values);
  },

  toggleAvailability: async (id) => {
    await pool.query(`UPDATE doctors SET available = NOT available WHERE id=$1`, [id]);
  },
};

// ─────────────────────────────────────────────
// APPOINTMENT helpers
// ─────────────────────────────────────────────

const rowToAppointment = (row) => {
  if (!row) return null;
  return {
    ...row,
    _id: row.id,
    userId: String(row.user_id),
    docId: String(row.doc_id),
    slotDate: row.slot_date,
    slotTime: row.slot_time,
    userData: row.user_data,
    docData: row.doc_data,
    isCompleted: row.is_completed,
  };
};

export const appointmentDb = {
  create: async ({ userId, docId, slotDate, slotTime, userData, docData, amount, date }) => {
    const res = await pool.query(
      `INSERT INTO appointments (user_id, doc_id, slot_date, slot_time, user_data, doc_data, amount, date)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [userId, docId, slotDate, slotTime, JSON.stringify(userData), JSON.stringify(docData), amount, date]
    );
    return rowToAppointment(res.rows[0]);
  },

  findById: async (id) => {
    const res = await pool.query(`SELECT * FROM appointments WHERE id=$1`, [id]);
    return rowToAppointment(res.rows[0]);
  },

  findAll: async () => {
    const res = await pool.query(`SELECT * FROM appointments ORDER BY date DESC`);
    return res.rows.map(rowToAppointment);
  },

  findByUserId: async (userId) => {
    const res = await pool.query(`SELECT * FROM appointments WHERE user_id=$1 ORDER BY date DESC`, [userId]);
    return res.rows.map(rowToAppointment);
  },

  findByDocId: async (docId) => {
    const res = await pool.query(`SELECT * FROM appointments WHERE doc_id=$1 ORDER BY date DESC`, [docId]);
    return res.rows.map(rowToAppointment);
  },

  updateById: async (id, fields) => {
    const sets = [];
    const values = [];
    let i = 1;

    if (fields.cancelled !== undefined)    { sets.push(`cancelled=$${i++}`);    values.push(fields.cancelled); }
    if (fields.payment !== undefined)      { sets.push(`payment=$${i++}`);      values.push(fields.payment); }
    if (fields.is_completed !== undefined) { sets.push(`is_completed=$${i++}`); values.push(fields.is_completed); }

    if (sets.length === 0) return;
    values.push(id);
    await pool.query(`UPDATE appointments SET ${sets.join(', ')} WHERE id=$${i}`, values);
  },
};
// ─────────────────────────────────────────────
// CHAT / MESSAGE helpers
// ─────────────────────────────────────────────

export const messageDb = {
  create: async ({ senderId, receiverId, content, fileUrl = null, fileName = null, fileType = null }) => {
    const res = await pool.query(
      `INSERT INTO messages (sender_id, receiver_id, content, file_url, file_name, file_type)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [String(senderId), String(receiverId), content, fileUrl, fileName, fileType]
    );
    return res.rows[0];
  },

  findHistory: async (userId, otherId) => {
    const res = await pool.query(
      `SELECT * FROM messages 
       WHERE (sender_id = $1 AND receiver_id = $2)
          OR (sender_id = $2 AND receiver_id = $1)
       ORDER BY created_at ASC`,
      [String(userId), String(otherId)]
    );
    return res.rows;
  },
};
