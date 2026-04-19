import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const DoctorChat = () => {
    const { userId } = useParams();
    const location = useLocation();
    const { patient } = location.state || {};
    const { dToken, profileData } = useContext(DoctorContext);
    const { backendUrl } = useContext(AppContext);

    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [socket, setSocket] = useState(null);
    const scrollRef = useRef();

    useEffect(() => {
        const newSocket = io(backendUrl.replace('/api', ''));
        setSocket(newSocket);

        if (profileData?.id) {
            newSocket.emit('join_room', profileData.id);
        }

        newSocket.on('receive_message', (msg) => {
            setChatHistory((prev) => [...prev, msg]);
        });

        return () => newSocket.close();
    }, [profileData, backendUrl]);

    const fetchHistory = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/chat/history/${userId}`, { 
                headers: { token: dToken } 
            });
            if (data.success) {
                setChatHistory(data.messages);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (dToken && userId) {
            fetchHistory();
        }
    }, [dToken, userId]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!message.trim() || !socket) return;

        const data = {
            senderId: profileData.id,
            receiverId: userId,
            content: message
        };

        socket.emit('send_message', data);
        setMessage('');
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('receiverId', userId);

        try {
            const { data } = await axios.post(`${backendUrl}/api/chat/upload`, formData, {
                headers: { token: dToken, 'Content-Type': 'multipart/form-data' }
            });

            if (data.success) {
                socket.emit('send_message', {
                    ...data.message,
                    receiverId: userId
                });
            }
        } catch (error) {
            toast.error("File upload failed");
        }
    };

    return (
        <div className='flex flex-col h-[85vh] w-full max-w-5xl bg-white border rounded-lg overflow-hidden m-5 shadow-sm'>
            {/* Header */}
            <div className='bg-primary p-4 flex items-center gap-3 text-white'>
                <img src={patient?.image} className='w-10 h-10 rounded-full bg-white object-cover' alt="" />
                <div>
                    <p className='font-semibold'>{patient?.name || "Patient"}</p>
                    <p className='text-xs opacity-80'>Chatting with Patient</p>
                </div>
            </div>

            {/* Chat Area */}
            <div className='flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3'>
                {chatHistory.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender_id == profileData.id ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] p-3 rounded-lg shadow-sm ${msg.sender_id == profileData.id ? 'bg-primary text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}>
                            {msg.content && <p className='text-sm'>{msg.content}</p>}
                            {msg.file_url && (
                                <div className='mt-2'>
                                    {msg.file_type?.startsWith('image/') ? (
                                        <img src={msg.file_url} className='max-w-full rounded' alt="attachment" />
                                    ) : (
                                        <a href={msg.file_url} target='_blank' rel='noreferrer' className='flex items-center gap-2 text-xs underline'>
                                            <img src={assets.info_icon} className='w-4 invert' alt="" />
                                            {msg.file_name || 'Download File'}
                                        </a>
                                    )}
                                </div>
                            )}
                            <p className={`text-[10px] mt-1 opacity-70 ${msg.sender_id == profileData.id ? 'text-right' : 'text-left'}`}>
                                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                    </div>
                ))}
                <div ref={scrollRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className='p-4 border-t flex items-center gap-3 bg-white'>
                <label className='cursor-pointer hover:opacity-70 transition-opacity'>
                    <img src={assets.upload_icon} className='w-6' alt="upload" />
                    <input type="file" className='hidden' onChange={handleFileUpload} />
                </label>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder='Type your message...'
                    className='flex-1 border rounded-full px-4 py-2 outline-none focus:border-primary text-sm'
                />
                <button type='submit' className='bg-primary text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all'>
                    Send
                </button>
            </form>
        </div>
    );
};

export default DoctorChat;
