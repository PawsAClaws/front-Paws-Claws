import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { fetchConversations } from './useChat'
import myImg from '../../assets/avatar.png'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Sidebar = ({ setShowChat, setSelectedUser }) => {
    const [conversations, setConversations] = useState([])
    const navigate = useNavigate()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const selectedConversationId = searchParams.get('conversationId')

    const userData = useSelector((state) => state.getUser.user);

    console.log(userData);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const response = await fetchConversations()
                const processedData = response.map(item => ({
                    ...item.receiverId === userData.id ? item.sender : item.receiver,
                    conversationId: item.id, // important!
                    lastMessage: item.lastMessage,
                    unread: item.unread,
                    createdAt: item.createdAt
                }))
                setConversations(processedData)
            } catch (error) {
                console.error(error)
            }
        }

        if (userData.id)
            getConversations()

    }, [userData.id])

    const handleClick = (conversationId, senderId) => {
        navigate(`/chatRoom/${senderId}`)

        const selectedConversation = conversations.find(conv => conv.conversationId === conversationId);
        if (selectedConversation && setSelectedUser) {
            setSelectedUser(selectedConversation);
        }

        if (setShowChat) {
            setShowChat(true)
        }
    }

    console.log(conversations);

    return (
        <div className="p-4 border-r border-[#BCBCBC] w-full h-full">
            {/* Header */}
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none "
                />
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
                {conversations.map((conversation) => (
                    <div
                        key={conversation.conversationId}
                        onClick={() => handleClick(conversation.conversationId, conversation.id)}
                        className={`p-4 border-b border-gray-100 cursor-pointer transition-colors rounded-lg mb-2 ${selectedConversationId === conversation.conversationId.toString() ? 'bg-[#FBF0E7]' : 'hover:bg-gray-50'
                            }`}
                    >
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-lg">
                                <img className="w-full h-full rounded-full" src={conversation.photo || myImg} alt="" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-medium text-gray-900 truncate">
                                        {conversation.firstName + ' ' + conversation.lastName}
                                    </h3>
                                    <span className="text-sm text-gray-400">
                                        {new Date(conversation.createdAt).toLocaleDateString('en-GB')}
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
    )
}

export default Sidebar