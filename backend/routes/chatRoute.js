import express from 'express';
import { getChatHistory, sendMessage, uploadFile } from '../controllers/chatController.js';
import upload from '../middlewares/multer.js';
import authUser from '../middlewares/authUser.js';

const chatRouter = express.Router();

chatRouter.get('/history/:receiverId', authUser, getChatHistory);
chatRouter.post('/send', authUser, sendMessage);
chatRouter.post('/upload', upload.single('file'), authUser, uploadFile);

export default chatRouter;
