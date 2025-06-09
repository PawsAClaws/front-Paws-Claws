import React from 'react'
import { CheckCheck } from "lucide-react";
import avatar from '../../assets/avatar.png'
import { useSelector } from "react-redux";

const Message = ({ message }) => {
    const userData = useSelector((state) => state.getUser.user);
    const senderId = userData.id;
    const date = new Date(message.createdAt);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    hours = hours.toString().padStart(2, '0');

    const time = `${hours}:${minutes} ${ampm}`;
    return (
        <div
        className={`flex ${
            message.sendBy !== senderId ? "justify-start" : "justify-end "
        }`}
        >
        <div
            className={`flex relative ${
            message.sendBy === senderId ? "flex-row-reverse" : ""
            } gap-2 items-center`}
        >
            <div className="min-w-[30px] h-[30px]">
            <img
                className="w-7 h-7 rounded-full"
                src={message?.send?.photo ? message?.send?.photo : avatar}
                alt=""
            />
            </div>
            <div
            className={`max-w-xs lg:max-w-md px-6 py-2 rounded-md relative ${
                message.sendBy === senderId
                ? "bg-orange-400 text-white"
                : "bg-orange-100 text-gray-800"
            }`}
            >
            <p className="text-sm">{message.message}</p>
            <p className={`text-xs text-gray-500 absolute -bottom-4 ${
                    message.sendBy === senderId ? "right-0" : "left-0"
                }`}>
                {time}
            </p>
            {message.sendBy === senderId && (
                <p
                className={`text-sm ${
                    message.seen ? "text-green-500" : "text-gray-500"
                } absolute -bottom-2 ${
                    message.sendBy !== senderId ? "-right-2" : "-left-2"
                }`}
                >
                <CheckCheck size={15} />
                </p>
            )}
            </div>
        </div>
        </div>
    );
};

export default Message;
