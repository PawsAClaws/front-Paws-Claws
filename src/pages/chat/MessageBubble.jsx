// components/Chat/MessageBubble.jsx

const MessageBubble = ({ message, isOwn }) => {
    return (
        <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl shadow
          ${isOwn ? "bg-blue-500 text-white rounded-br-none" : "bg-gray-200 text-black rounded-bl-none"}`}
            >
                <p className="text-sm">{message.content}</p>
                <span className="block text-[10px] mt-1 opacity-70 text-right">
                    {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </span>
            </div>
        </div>
    );
};

export default MessageBubble;
