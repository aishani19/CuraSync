import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import { userDb, doctorDb, appointmentDb } from '../models/db.js';

// API to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: 'Missing Details' });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Please enter a valid email' });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: 'Please enter a strong password' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userDb.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userDb.findByEmail(email);

    if (!user) {
      return res.json({ success: false, message: 'User does not exist' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user profile data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userDb.findByIdSafe(userId);
    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update user profile
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: 'Data Missing' });
    }

    const parsedAddress = typeof address === 'string' ? JSON.parse(address) : address;

    await userDb.updateById(userId, {
      name,
      phone,
      dob,
      gender,
      address_line1: parsedAddress?.line1 || '',
      address_line2: parsedAddress?.line2 || '',
    });

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
      await userDb.updateById(userId, { image: imageUpload.secure_url });
    }

    res.json({ success: true, message: 'Profile Updated' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to book appointment
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    const docData = await doctorDb.findByIdSafe(docId);

    if (!docData || !docData.available) {
      return res.json({ success: false, message: 'Doctor Not Available' });
    }

    let slots_booked = docData.slots_booked || {};

    // check slot availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: 'Slot Not Available' });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [slotTime];
    }

    const userData = await userDb.findByIdSafe(userId);

    // strip slots_booked from docData snapshot stored in appointment
    const { slots_booked: _omit, ...docSnapshot } = docData;

    await appointmentDb.create({
      userId,
      docId,
      userData,
      docData: docSnapshot,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    });

    // persist updated slots to doctor
    await doctorDb.updateById(docId, { slots_booked });

    res.json({ success: true, message: 'Appointment Booked' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
    const appointmentData = await appointmentDb.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ success: false, message: 'Appointment not found' });
    }

    if (String(appointmentData.user_id) !== String(userId)) {
      return res.json({ success: false, message: 'Unauthorized action' });
    }

    await appointmentDb.updateById(appointmentId, { cancelled: true });

    // release doctor slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorDb.findById(docId);

    if (doctorData) {
      const slots_booked = doctorData.slots_booked || {};
      if (slots_booked[slotDate]) {
        slots_booked[slotDate] = slots_booked[slotDate].filter((e) => e !== slotTime);
      }
      await doctorDb.updateById(docId, { slots_booked });
    }

    res.json({ success: true, message: 'Appointment Cancelled' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to list user appointments
const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointments = await appointmentDb.findByUserId(userId);
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
};