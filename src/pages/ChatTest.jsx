import { useEffect } from "react";
import { io } from "socket.io-client";
import React from "react";
import { cookies } from "../lib/api";




const ChatComponent = () => {

    const token = cookies.get("token");

    useEffect(() => {

        const socket = io("https://backend-online-courses.onrender.com", {
            extraHeaders: {

                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });

        socket.on("connect", () => {
            console.log("✅ متصل بالسيرفر");

            socket.emit("newMessage", {
                senderId: 3,        // لازم يطابق التوكن اللي داخل بيه
                receiverId: 2,      // أي يوزر تاني موجود في قاعدة البيانات
                message: " test id 2 "
            });

            console.log("📤 تم إرسال الرسالة");
        });

        socket.on("newMessage", (data) => {
            console.log("رسالة مستلمة:", data);
        });

        return () => socket.disconnect();
    }, []);

    return <div>تشات جاري...</div>;
};

export default ChatComponent;
