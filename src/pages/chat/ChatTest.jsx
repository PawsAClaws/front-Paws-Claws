import React, { useState, useEffect, useRef } from 'react';
import { Search, Send, Paperclip, MoreHorizontal } from 'lucide-react';
import axios from 'axios';
import io from 'socket.io-client';
import { cookies } from '../../lib/api';

function ChatTest() {
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);
    const socketRef = useRef(null);
    const [socket, setSocket] = useState(null)

    const API_BASE_URL = 'https://backend-online-courses.onrender.com/api/v1/chat';

    const token = cookies.get('token')

    useEffect(() => {
        const socket = io('https://backend-online-courses.onrender.com', {
            auth: {
                token: `Bearer ${token}`
            },
        });
        if (socket) {
            setSocket(socket)
        }

        socket.on('onlineUsers', (data) => {

            console.log('Online users:', data);


        })


        return () => {
            socket.disconnect();
        }




    }, []);

    const fetchConversations = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${API_BASE_URL}/conversations`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('Conversations fetched:', response.data);
            setConversations(response.data.data);
        } catch (error) {
            console.error('Error fetching conversations:', error);
            setError('Failed to load conversations. Please check your connection.');

            const mockConversations = [
                {
                    id: 1,
                    name: 'User Name',
                    email: 'alexandra@gmail.com',
                    lastMessage: 'Lorem ipsum dolor sit amet consectetur...',
                    timestamp: '03/04/2025',
                    avatar: '👤',
                    unread: 0
                },
                {
                    id: 2,
                    name: 'User Name',
                    email: 'user@example.com',
                    lastMessage: 'Lorem ipsum dolor sit amet consectetur...',
                    timestamp: '03/04/2025',
                    avatar: '👤',
                    unread: 2
                }
            ];
            setConversations(mockConversations);
        } finally {
            setLoading(false);
        }
    };

    const fetchMessages = async (conversationId) => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${API_BASE_URL}/messages/${conversationId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('Messages fetched:', response.data);

            // const transformedMessages = response.data.data.map(msg => ({
            //     ...msg,
            //     isOwn: msg.senderId === getCurrentUserId(),
            //     timestamp: formatTimestamp(msg.createdAt || msg.timestamp)
            // }));

            setMessages((prev) => [...prev, ...response.data.data]);
        } catch (error) {
            console.error('Error fetching messages:', error);
            setError('Failed to load messages.');

            const mockMessages = [
                {
                    id: 1,
                    senderId: 2,
                    text: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
                    timestamp: '8:00 PM',
                    isOwn: false
                },
                {
                    id: 2,
                    senderId: 1,
                    text: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
                    timestamp: '8:30 PM',
                    isOwn: true
                }
            ];
            setMessages(mockMessages);
        } finally {
            setLoading(false);
        }
    };

    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        const messageData = {
            message: newMessage,
            senderId: 3,
            receiverId: 6 // ← حط هنا ID ثابت للتجربة أو خليه ديناميكي لاحقًا
        };

        socket.emit('newMessage', messageData);

        // استمع للرسالة المرتجعة (يمكن يكون محتاج يتنقل لفوق في useEffect لتجنب تكراره)
        socket.on('newMessage', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        setNewMessage('');
    };



    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Load conversations on component mount
    useEffect(() => {
        fetchConversations();
    }, []);

    // Scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Handle conversation selection
    const handleConversationSelect = (conversation) => {
        setSelectedConversation(conversation);
        fetchMessages(conversation.id);

        // Join the conversation room for Socket.io
        if (socketRef.current && isConnected) {
            socketRef.current.emit('joinConversation', { conversationId: conversation.id });
        }
    };

    const formatDate = (dateStr) => {
        const today = new Date();
        const messageDate = new Date(dateStr);

        if (messageDate.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (messageDate.toDateString() === new Date(today.setDate(today.getDate() - 1)).toDateString()) {
            return 'Yesterday';
        } else {
            return messageDate.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            });
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-gray-200">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Connection Status */}
                    <div className="mt-2 flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-xs text-gray-500">
                            {isConnected ? 'Connected' : 'Disconnected'}
                        </span>
                    </div>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="p-3 m-3 bg-red-100 border border-red-300 rounded-lg">
                        <p className="text-sm text-red-700">{error}</p>
                        <button
                            onClick={() => {
                                setError(null);
                                fetchConversations();
                            }}
                            className="text-xs text-red-600 underline mt-1"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="p-4 text-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="text-sm text-gray-500 mt-2">Loading...</p>
                    </div>
                )}

                {/* Conversations List */}
                <div className="flex-1 overflow-y-auto">
                    {conversations.map((conversation) => (
                        <div
                            key={conversation.id}
                            onClick={() => handleConversationSelect(conversation)}
                            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${selectedConversation?.id === conversation.id ? 'bg-blue-50 border-r-2 border-r-blue-500' : ''
                                }`}
                        >
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-lg">
                                    {conversation.avatar || conversation.name?.charAt(0) || '👤'}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-medium text-gray-900 truncate">
                                            {conversation.name || conversation.username || 'Unknown User'}
                                        </h3>
                                        <span className="text-xs text-gray-500">
                                            {formatTimestamp(conversation.updatedAt || conversation.timestamp)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 truncate mt-1">
                                        {conversation.lastMessage || 'No messages yet'}
                                    </p>
                                </div>
                                {conversation.unread > 0 && (
                                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                        <span className="text-xs text-white">{conversation.unread}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                {selectedConversation ? (
                    <>
                        {/* Chat Header */}
                        <div className="bg-white border-b border-gray-200 p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-lg">
                                        {selectedConversation.avatar || selectedConversation.name?.charAt(0) || '👤'}
                                    </div>
                                    <div>
                                        <h2 className="font-medium text-gray-900">
                                            {selectedConversation.name || selectedConversation.username || 'Unknown User'}
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            {selectedConversation.email || 'No email'}
                                        </p>
                                    </div>
                                </div>
                                <button className="p-2 hover:bg-gray-100 rounded-lg">
                                    <MoreHorizontal className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {/* Date divider */}
                            <div className="flex justify-center">
                                <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full border">
                                    {formatDate(new Date())}
                                </span>
                            </div>

                            {messages.reverse().map((message) => (
                                <div key={message.id} className={`flex ${message.sendBy !== 14 ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${message.sendBy !== 14
                                        ? 'bg-orange-400 text-white'
                                        : 'bg-orange-100 text-gray-800'
                                        } shadow-sm ${message.pending ? 'opacity-70' : ''}`}>
                                        <p className="text-sm">{message.message}</p>
                                        <div className="flex items-center justify-end mt-1 space-x-1">
                                            <span className={`text-xs ${message.isOwn ? 'text-orange-100' : 'text-gray-500'}`}>
                                                {message.timestamp}
                                            </span>
                                            {message.isOwn && (
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
                            <div ref={messagesEndRef} />
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
                                    // disabled={!isConnected}
                                    />
                                </div>
                                <button
                                    onClick={sendMessage}
                                    // disabled={!newMessage.trim() || !isConnected}
                                    className="p-2 bg-orange-400 hover:bg-orange-500 disabled:bg-gray-300 rounded-full transition-colors"
                                >
                                    <Send className="w-5 h-5 text-white" />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center bg-gray-50">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                            <p className="text-gray-500">Choose a conversation from the sidebar to start chatting</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChatTest