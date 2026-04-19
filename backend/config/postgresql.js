import pg from 'pg';
import bcrypt from 'bcrypt';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log('PostgreSQL Database Connected');
    
    // 1. Initialize tables first
    await initializeTables();
    
    // 2. Then perform alterations
    await pool.query(`ALTER TABLE doctors ADD COLUMN IF NOT EXISTS college TEXT DEFAULT ''`);

    client.release();
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Create tables if they don't exist
const initializeTables = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        image TEXT DEFAULT '',
        phone VARCHAR(50) DEFAULT '000000000',
        address_line1 TEXT DEFAULT '',
        address_line2 TEXT DEFAULT '',
        gender VARCHAR(50) DEFAULT 'Not Selected',
        dob VARCHAR(50) DEFAULT 'Not Selected',
        password TEXT NOT NULL,
        created_at BIGINT DEFAULT EXTRACT(EPOCH FROM NOW())::BIGINT * 1000
      );

      CREATE TABLE IF NOT EXISTS doctors (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password TEXT NOT NULL,
        image TEXT NOT NULL,
        speciality VARCHAR(255) NOT NULL,
        degree VARCHAR(255) NOT NULL,
        experience VARCHAR(100) NOT NULL,
        about TEXT NOT NULL,
        college VARCHAR(255) DEFAULT 'Not Specified',

        available BOOLEAN DEFAULT TRUE,
        fees NUMERIC NOT NULL,
        slots_booked JSONB DEFAULT '{}',
        address_line1 TEXT DEFAULT '',
        address_line2 TEXT DEFAULT '',
        date BIGINT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS appointments (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        doc_id INTEGER NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
        slot_date VARCHAR(50) NOT NULL,
        slot_time VARCHAR(50) NOT NULL,
        user_data JSONB NOT NULL,
        doc_data JSONB NOT NULL,
        amount NUMERIC NOT NULL,
        date BIGINT NOT NULL,
        cancelled BOOLEAN DEFAULT FALSE,
        payment BOOLEAN DEFAULT FALSE,
        is_completed BOOLEAN DEFAULT FALSE
      );

      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        sender_id VARCHAR(255) NOT NULL,
        receiver_id VARCHAR(255) NOT NULL,
        content TEXT,
        file_url TEXT,
        file_name TEXT,
        file_type VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Tables initialized');
  } catch (err) {
    console.error('Error initializing tables:', err);
  } finally {
    client.release();
  }
};


export { pool, connectDB };
export default connectDB;
