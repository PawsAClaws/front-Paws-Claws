import React, { useEffect, useState } from 'react';
import { Send, Paperclip } from 'lucide-react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { cookies } from '../../lib/api';
import { fetchMessages } from './useChat';
import { useLocation } from 'react-router-dom';



const ChatArea = ({ id }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const userData = useSelector((state) => state.getUser.user);
    const senderId = userData.id;
    const token = cookies.get('token');


    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const conversationId = searchParams.get('conversationId');


    useEffect(() => {
        const newSocket = io('https://backend-online-courses.onrender.com', {
            auth: {
                token: `Bearer ${token}`
            },
        });

        newSocket.on('connect', () => {
            console.log('✅ Socket connected:', newSocket.id);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [token]);

    useEffect(() => {
        if (conversationId) {
            const getMessages = async () => {
                try {
                    const response = await fetchMessages(conversationId);
                    setMessages(response);
                } catch (error) {
                    console.error(error);
                }
            }

            getMessages();
        }
    }, [conversationId])

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        };

        socket.on('newMessage', handleNewMessage);

        return () => {
            socket.off('newMessage', handleNewMessage);
        };
    }, [socket]);


    const sendMessage = () => {

        if (!newMessage.trim() || !socket) return;

        const messageData = {
            message: newMessage,
            senderId,
            receiverId: id,
        };
        console.log(messageData);


        socket.emit('newMessage', messageData);

        setNewMessage('');
    };

    const reversedMessages = [...messages].reverse();

    return (
        <div className='w-full h-full flex flex-col'>
            <div className="flex-1 bg-amber-200 overflow-y-auto p-4">
                {messages.length === 0 ? (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-gray-500 text-sm">Start your conversation...</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {reversedMessages.map((message, index) => (
                            <div key={`${message.id || message.timestamp}-${index}`} className={`flex ${message.sendBy !== senderId ? 'justify-start' : 'justify-end'}`}>
                                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${message.sendBy === senderId
                                    ? 'bg-orange-400 text-white'
                                    : 'bg-orange-100 text-gray-800'
                                    } shadow-sm ${message.pending ? 'opacity-70' : ''}`}>


                                    <p className="text-sm">{message.message}</p>
                                    <div className="flex items-center justify-end mt-1 space-x-1">
                                        <span className={`text-xs ${message.sendBy !== senderId
                                            ? 'text-orange-100' : 'text-gray-500'}`}>
                                            {message.timestamp}
                                        </span>
                                        {message.sendBy !== senderId
                                            && (
                                                <div className={`${message.pending ? 'text-orange-200' : 'text-orange-100'}`}>
                                                    {message.pending ? (
                                                        <div className="w-3 h-3 border border-orange-200 border-t-transparent rounded-full animate-spin"></div>
                                                    ) : (
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                                        </svg>
                                                    )}
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex items-center space-x-3">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Paperclip className="w-5 h-5 text-gray-500" />
                    </button>
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="Type your message..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <button
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                        className="p-2 bg-orange-400 hover:bg-orange-500 disabled:bg-gray-300 rounded-full transition-colors"
                    >
                        <Send className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatArea;
