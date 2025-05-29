

import axios from "axios";
import BASE_URL, { cookies } from "../../lib/api";

const token = cookies.get("token");



export const fetchConversations = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/chat/conversations`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('Conversations fetched:', response.data);

        return response?.data?.data;

    } catch (error) {
        console.error('Error fetching conversations:', error);

    }
};


export const fetchMessages = async (conversationId) => {
    try {

        const response = await axios.get(`${BASE_URL}/chat/messages/${conversationId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        console.log(response.data);

        return response?.data?.data;


    } catch (error) {
        console.error('Error fetching messages:', error);



    }
};

