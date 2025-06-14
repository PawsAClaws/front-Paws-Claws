import React, { useEffect, useState } from 'react';
import { Send, Paperclip, Ellipsis, ArrowLeft } from 'lucide-react';

import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { cookies } from '../../lib/api';
import { fetchMessages } from './useChat';
import { useParams } from 'react-router-dom';
import avatar from '../../assets/avatar.png'
import { getUserId } from '../../lib/getUserId';
import Message from './Message';

const ChatArea = ({ setShowChat, selectedUser }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [reverser, setReverser] = useState(null);
    const [socket, setSocket] = useState(null);
    const userData = useSelector((state) => state.getUser.user);
    const senderId = userData.id;
    const token = cookies.get('token');
    const { id } = useParams()

    useEffect(() => {
        const newSocket = io('https://backend-online-courses.onrender.com', {
            auth: {
                token: `Bearer ${token}`
            },
        });

        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, [token]);

    useEffect(() => {
        if (id) {
            const getMessages = async () => {
                try {
                    const response = await fetchMessages(id);
                    setMessages(response);
                } catch (error) {
                    console.error(error);
                }
            }

            getMessages();
        }
    }, [id]);

    useEffect(() => {
        if (id && !selectedUser) {
            const user = async () => {
                const res = await getUserId(id)
                setReverser(res)
            }
            user()
        }
        else if (selectedUser) {
            setReverser(selectedUser)
        }
    }, [id, selectedUser])

    useEffect(() => {
        if (socket && id) {
            socket.emit("seen", { receiverId: +id })
        }
    }, [id, socket])

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
            receiverId: +id,
        };

        socket.emit('newMessage', messageData);
        setNewMessage('');
    };

    const handleBackClick = () => {
        // في الشاشات الصغيرة، ارجع للـ Sidebar
        if (setShowChat) {
            setShowChat(false);
        }
        // أو ممكن تعمل navigate للصفحة الرئيسية للـ chat
        // navigate('/chatRoom');
    };



    const reversedMessages = [...messages];



    return (
        <div className='w-full h-full flex flex-col'>
            {/* chat header */}
            <div className='flex justify-between items-center w-full border-b border-[#BCBCBC] flex-shrink-0'>
                <div className='flex w-full items-center gap-2 p-4 '>
                    <button
                        onClick={handleBackClick}
                        className="md:hidden p-2 hover:bg-gray-100 rounded-lg mr-2"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>

                    <div className='w-[50px] h-[50px]'>
                        <img className='w-full h-full rounded-full' src={reverser?.photo || avatar} alt="avatar" />
                    </div>
                    <div>
                        <h3>{reverser ? `${reverser.firstName} ${reverser.lastName}` : 'User Name'}</h3>
                        <div>{reverser?.email || 'alexarawles@gmail.com'}</div>
                    </div>
                </div>

                <div className='pe-10 '>
                    <Ellipsis />
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 min-h-0">
                {messages.length === 0 ? (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-gray-500 text-sm">Start your conversation...</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {reversedMessages.map((message, index) => (
                            <Message key={index} message={message} />
                            // <></>
                        ))}
                    </div>
                )}
            </div>

            {/* Message Input - Fixed at bottom */}
            <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-primary"
                        />
                    </div>
                    <button
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                        className="p-2 bg-primary cursor-pointer rounded-full transition-colors"
                    >
                        <Send className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatArea;