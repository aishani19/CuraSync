import jwt from 'jsonwebtoken';
import { adminDb } from '../models/db.js';

// Admin authentication middleware
const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;

    if (!atoken) {
      return res.json({ success: false, message: 'Not Authorized — Login Again' });
    }

    // Verify JWT signature
    const decoded = jwt.verify(atoken, process.env.JWT_SECRET);

    // Confirm the admin ID exists in the DB
    if (!decoded?.id || decoded?.role !== 'admin') {
      return res.json({ success: false, message: 'Not Authorized — Login Again' });
    }

    const admin = await adminDb.findById(decoded.id);
    if (!admin) {
      return res.json({ success: false, message: 'Admin account not found — Login Again' });
    }

    // Attach admin info to request for downstream use
    req.admin = admin;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authAdmin;