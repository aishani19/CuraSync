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
    const { dToken, profileData, getProfileData } = useContext(DoctorContext);
    const { backendUrl } = useContext(AppContext);

    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [socket, setSocket] = useState(null);
    const scrollRef = useRef();

    useEffect(() => {
        if (!profileData && dToken) {
            getProfileData();
        }
    }, [dToken]);

    useEffect(() => {
        const newSocket = io(backendUrl.replace('/api', ''));
        setSocket(newSocket);

        const docId = profileData?._id || profileData?.id;
        if (docId) {
            newSocket.emit('join_room', String(docId));
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
        const docId = profileData?._id || profileData?.id;
        if (!message.trim() || !socket || !docId) {
            if (!docId) toast.error("Waiting for profile...");
            return;
        }

        const data = {
            senderId: docId,
            receiverId: userId,
            content: message
        };

        socket.emit('send_message', data);
        setMessage('');
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const docId = profileData?._id || profileData?.id;
        if (!file || !docId) return;

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
        } catch (err) {
            toast.error("File upload failed");
        }
    };

    return (
        <div className='flex flex-col h-[85vh] w-full max-w-5xl bg-[#0A1628] border border-white/5 rounded-3xl overflow-hidden mt-5 shadow-2xl'>
            {/* Header */}
            <div className={`p-5 px-8 flex items-center justify-between glass border-b border-white/5`}>
                <div className='flex items-center gap-4'>
                    <div className='relative'>
                        <img src={patient?.image || assets.profile_pic} className='w-12 h-12 rounded-2xl bg-white/10 object-cover border border-white/10' alt="" />
                        <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-[#00D4AA] rounded-full border-2 border-[#0A1628]'></div>
                    </div>
                    <div>
                        <p className='font-black text-white text-lg'>{patient?.name || "Patient"}</p>
                        <p className='text-[10px] font-black text-[#00D4AA] uppercase tracking-widest'>Medical Consultation Session</p>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className='flex-1 overflow-y-auto p-6 flex flex-col gap-5 scroll-smooth'>
                {chatHistory.map((msg, idx) => {
                    const docId = profileData?._id || profileData?.id;
                    const isMe = String(msg.sender_id) === String(docId);
                    return (
                        <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                            <div className={`max-w-[75%] p-4 px-5 rounded-[24px] shadow-2xl relative
                                ${isMe 
                                    ? 'bg-[#00D4AA] text-[#0A1628] rounded-br-none shadow-[#00D4AA]/5' 
                                    : 'bg-white/5 glass text-white rounded-bl-none border border-white/10'}`}>
                                
                                {msg.content && <p className='text-sm leading-relaxed font-medium'>{msg.content}</p>}
                                
                                {msg.file_url && (
                                    <div className='mt-3 overflow-hidden rounded-xl bg-black/10'>
                                        {msg.file_type?.startsWith('image/') ? (
                                            <img src={msg.file_url} className='max-w-full h-auto object-cover hover:scale-105 transition-all cursor-pointer' alt="attachment" />
                                        ) : (
                                            <a href={msg.file_url} target='_blank' rel='noreferrer' className={`flex items-center gap-3 p-4 text-xs font-bold ${isMe ? 'bg-[#0A1628]/10' : 'bg-white/5'}`}>
                                                <div className='w-8 h-8 rounded-lg bg-black/10 flex items-center justify-center text-lg'>📄</div>
                                                <span className='flex-1 truncate'>{msg.file_name || 'Download File'}</span>
                                            </a>
                                        )}
                                    </div>
                                )}
                                
                                <p className={`text-[9px] mt-2 font-black uppercase tracking-tighter opacity-50 
                                    ${isMe ? 'text-[#0A1628]' : 'text-gray-400'}`}>
                                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    );
                })}
                <div ref={scrollRef} />
            </div>

            {/* Input Area */}
            <div className='p-6 pt-0'>
                <form onSubmit={handleSendMessage} className='glass rounded-[30px] p-2 pr-3 flex items-center gap-2 border border-white/5 group-focus-within:border-[#00D4AA]/30 transition-all'>
                    <label className='p-3 cursor-pointer text-[#00D4AA] hover:bg-[#00D4AA]/10 rounded-full transition-all'>
                        <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        <input type="file" className='hidden' onChange={handleFileUpload} />
                    </label>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder='Respond to patient...'
                        className='flex-1 bg-transparent border-none px-2 py-4 outline-none text-white text-sm font-medium placeholder:text-gray-600'
                    />
                    <button type='submit' 
                            className={`w-12 h-12 flex items-center justify-center bg-[#00D4AA] text-[#0A1628] rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg glow-teal disabled:opacity-50`}
                            disabled={!message.trim()}>
                        <svg className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                        </svg>
                    </button>
                </form>
                <div className='flex justify-between items-center mt-3 px-2'>
                    <div className='flex gap-2'>
                        <span className='px-2 py-0.5 bg-green-500/10 text-green-500 text-[8px] font-black rounded uppercase'>Clinical Line</span>
                        <span className='px-2 py-0.5 bg-[#00D4AA]/10 text-[#00D4AA] text-[8px] font-black rounded uppercase'>Direct Patient Sync</span>
                    </div>
                    <p className='text-[8px] text-gray-700 font-black uppercase tracking-widest'>Encryption Key: V-2947-SYNC</p>
                </div>
            </div>
        </div>
    );
};

export default DoctorChat;
