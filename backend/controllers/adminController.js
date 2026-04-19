import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import { adminDb, doctorDb, userDb, appointmentDb } from "../models/db.js";

// API for admin login — validates against the admins DB table
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "Email and password are required" });
    }

    const admin = await adminDb.findByEmail(email);
    if (!admin) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // Sign a JWT with the admin's DB id
    const token = jwt.sign({ id: admin.id, role: "admin" }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for adding Doctor
const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address, college } = req.body;
    const imageFile = req.file;

    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !college) {
      return res.status(400).json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Please enter a strong password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
    const imageUrl = imageUpload.secure_url;

    const parsedAddress = JSON.parse(address);

    await doctorDb.create({
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees: Number(fees),
      address: parsedAddress,
      date: Date.now(),
      college
    });

    res.status(200).json({ success: true, message: "Doctor Added" });
  } catch (error) {
    console.error("Error adding doctor:", error);
    res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

// API for appointment cancellation (admin)
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentDb.findById(appointmentId);
    if (!appointmentData) return res.json({ success: false, message: "Appointment not found" });

    await appointmentDb.updateById(appointmentId, { cancelled: true });

    // release doctor slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctor = await doctorDb.findById(docId);
    if (doctor) {
      const slots_booked = doctor.slots_booked || {};
      if (slots_booked[slotDate]) {
        slots_booked[slotDate] = slots_booked[slotDate].filter((e) => e !== slotTime);
      }
      await doctorDb.updateById(docId, { slots_booked });
    }

    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all doctors
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorDb.findAllSafe();
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all appointments
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentDb.findAll();
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorDb.findAll();
    const users = await userDb.findAll();
    const appointments = await appointmentDb.findAll();

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { loginAdmin, addDoctor, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard };