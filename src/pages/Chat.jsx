import React, { useState, useEffect } from 'react';
import { DotsThree } from 'phosphor-react'
import avatar from '../assets/avatar.png'




const ChatApp = () => {


    const [conversations, setConversations] = useState([]); // قائمة المحادثات
    const [selectedChat, setSelectedChat] = useState(null); // المحادثة المختارة
    const [messages, setMessages] = useState([]); // رسائل المحادثة
    const [newMessage, setNewMessage] = useState(''); // الرسالة الجديدة



    // جلب الداتا من الباك ايند
    useEffect(() => {
        // هنا تجيب قائمة المحادثات
        // fetch('/api/conversations').then...
    }, []);

    const handleSelectChat = (chatId) => {
        setSelectedChat(chatId);
        // جلب الرسائل بناءً على المحادثة
        // fetch(`/api/messages/${chatId}`).then...
    };

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;

        // ارسال الرسالة للباك ايند
        // await fetch(...)

        // مؤقتاً هنضيفها يدوي
        const newMsg = {
            id: Date.now(),
            text: newMessage,
            sender: 'you',
            timestamp: new Date().toLocaleTimeString(),
        };
        setMessages([...messages, newMsg]);
        setNewMessage('');
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* القائمة الجانبية */}
            <aside className="w-1/4 border-r overflow-y-auto">
                {conversations.map((conv) => (
                    <div
                        key={conv.id}
                        className="p-4 hover:bg-gray-100 cursor-pointer border-b"
                        onClick={() => handleSelectChat(conv.id)}
                    >
                        <div className="font-semibold">{conv.userName}</div>
                        <div className="text-sm text-gray-500">{conv.lastMessage}</div>
                    </div>
                ))}
            </aside>

            {/* نافذة الرسائل */}
            <main className="flex flex-col w-3/4">
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`max-w-md p-3 rounded-lg text-sm ${msg.sender === 'you'
                                ? 'bg-orange-100 self-end text-right ml-auto'
                                : 'bg-white border self-start'
                                }`}
                        >
                            <p>{msg.text}</p>
                            <div className="text-xs text-gray-400 mt-1">
                                {msg.timestamp}
                            </div>
                        </div>
                    ))}
                </div>

                {/* شريط كتابة الرسائل */}
                <div className="p-4 border-t flex items-center gap-2">
                    <input
                        type="text"
                        className="flex-1 border p-2 rounded"
                        placeholder="Write a message"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button
                        onClick={handleSendMessage}
                        className="bg-orange-500 text-white px-4 py-2 rounded"
                    >
                        ➤
                    </button>
                </div>
            </main>
        </div>
    );
};

export default ChatApp;
