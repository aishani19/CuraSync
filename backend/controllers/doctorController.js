import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import { doctorDb, appointmentDb } from "../models/db.js";


// Doctor login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await doctorDb.findByEmail(email);

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get doctor's appointments
const appointmentsDoctor = async (req, res) => {
  try {
    const docId = req.user.id;
    const appointments = await appointmentDb.findByDocId(docId);
    res.json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cancel appointment (doctor)
const appointmentCancel = async (req, res) => {
  try {
    const docId = req.user.id;
    const { appointmentId } = req.body;

    const appointment = await appointmentDb.findById(appointmentId);
    if (!appointment || String(appointment.doc_id) !== String(docId)) {
      return res.status(403).json({ success: false, message: "Invalid doctor or appointment" });
    }

    await appointmentDb.updateById(appointmentId, { cancelled: true });
    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Complete appointment
const appointmentComplete = async (req, res) => {
  try {
    const docId = req.user.id;
    const { appointmentId } = req.body;

    const appointment = await appointmentDb.findById(appointmentId);
    if (!appointment || String(appointment.doc_id) !== String(docId)) {
      return res.status(403).json({ success: false, message: "Invalid doctor or appointment" });
    }

    await appointmentDb.updateById(appointmentId, { is_completed: true });
    res.json({ success: true, message: "Appointment Completed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all doctors (for frontend list) — no password, no email
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorDb.findAllPublic();
    res.json({ success: true, doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Toggle doctor's availability (admin action)
const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    if (!docId) {
      return res.status(400).json({ success: false, message: "Doctor ID missing" });
    }

    const doctor = await doctorDb.findById(docId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    await doctorDb.toggleAvailability(docId);
    res.json({ success: true, message: "Availability changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get doctor's profile
const doctorProfile = async (req, res) => {
  try {
    const docId = req.user.id;
    const profile = await doctorDb.findByIdSafe(docId);
    res.json({ success: true, profileData: profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update doctor's profile
const updateDoctorProfile = async (req, res) => {
  try {
    const docId = req.user.id;
    const { fees, address, available, about } = req.body;

    const parsedAddress = typeof address === "string" ? JSON.parse(address) : address;

    await doctorDb.updateById(docId, {
      fees: fees !== undefined ? Number(fees) : undefined,
      about,
      available,
      address_line1: parsedAddress?.line1,
      address_line2: parsedAddress?.line2,
    });

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get dashboard data
const doctorDashboard = async (req, res) => {
  try {
    const docId = req.user.id;
    const appointments = await appointmentDb.findByDocId(docId);

    let earnings = 0;
    const patientSet = new Set();

    appointments.forEach((a) => {
      if (a.is_completed || a.payment) earnings += Number(a.amount);
      patientSet.add(String(a.user_id));
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patientSet.size,
      latestAppointments: appointments.slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Register Doctor
const registerDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address, college } = req.body;
    const imageFile = req.file;

    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !college) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const existing = await doctorDb.findByEmail(email);
    if (existing) {
      return res.json({ success: false, message: "Doctor already exists with this email" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let imageUrl = "";
    if (imageFile) {
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        imageUrl = imageUpload.secure_url;
    }

    const parsedAddress = typeof address === "string" ? JSON.parse(address) : address;

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

    res.json({ success: true, message: "Doctor Registered Successfully. You can now login." });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  loginDoctor,
  registerDoctor,
  appointmentsDoctor,
  appointmentCancel,
  appointmentComplete,
  doctorList,
  changeAvailability,
  doctorProfile,
  updateDoctorProfile,
  doctorDashboard,
};

