import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';

function ChatRoom() {
    const location = useLocation();
    const [showChat, setShowChat] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const searchParams = new URLSearchParams(location.search);
    const conversationId = searchParams.get('conversationId');

    useEffect(() => {
        if (conversationId) {
            setShowChat(true);
        } else {
            setShowChat(false);
        }
    }, [conversationId]);

    return (
        <div className="flex h-[85vh] bg-gray-50">
            <div className='flex w-full'>
                <div className={`${showChat ? 'hidden md:block' : 'block'} w-full md:w-[400px]`}>
                    <Sidebar setShowChat={setShowChat} setSelectedUser={setSelectedUser} />
                </div>

                <div className={`${showChat ? 'block' : 'hidden md:block'} flex-1`}>
                    <ChatArea setShowChat={setShowChat} selectedUser={selectedUser} />
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;