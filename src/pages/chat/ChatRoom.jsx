import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';





function ChatRoom() {

    const { id } = useParams



    return (
        <div className="flex h-[85vh] bg-gray-50">


            <div className='flex w-full'>
                <Sidebar />
                <ChatArea />
            </div>



        </div>
    );
}

export default ChatRoom;