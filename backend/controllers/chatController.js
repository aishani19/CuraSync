import { messageDb } from '../models/db.js';
import { v2 as cloudinary } from 'cloudinary';

// API to get chat history between two users
const getChatHistory = async (req, res) => {
  try {
    const { userId } = req.body; // from auth middleware
    const { receiverId } = req.params;

    const messages = await messageDb.findHistory(userId, receiverId);
    res.json({ success: true, messages });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to send a message (not used directly by socket but good for persistence fallback or API tests)
const sendMessage = async (req, res) => {
  try {
    const { userId, receiverId, content } = req.body;
    const message = await messageDb.create({ senderId: userId, receiverId, content });
    res.json({ success: true, message });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to upload file in chat
const uploadFile = async (req, res) => {
  try {
    const { userId, receiverId } = req.body;
    const file = req.file;
    console.log("File received for upload:", file ? file.filename : "NO FILE");

    if (!file) {
      return res.json({ success: false, message: "No file uploaded" });
    }

    let fileUrl = "";
    try {
      const upload = await cloudinary.uploader.upload(file.path, { resource_type: "auto" });
      fileUrl = upload.secure_url;
    } catch (cloudinaryError) {
      console.log("Cloudinary fallback to local:", cloudinaryError.message);
      // Hardcode port 4000 for local development if Cloudinary fails
      fileUrl = `http://localhost:4000/uploads/${file.filename}`;
    }
    
    const message = await messageDb.create({
      senderId: userId,
      receiverId,
      content: "",
      fileUrl,
      fileName: file.originalname,
      fileType: file.mimetype
    });

    res.json({ success: true, message });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { getChatHistory, sendMessage, uploadFile };
