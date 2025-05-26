// import axios from "axios";
// import BASE_URL, { cookies } from "./api";



// const token = cookies.get("token");





// export const getConversations = async () => {
//     const response = await axios.get(`${BASE_URL}/chat/conversations`,
//         {
//             headers: {

//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//         }
//     );
//     return response.data;
// };

// export const getMessages = async (conversationId) => {
//     const response = await axios.get(`${BASE_URL}//chat/messages/${conversationId}`,
//         {
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//         }
//     );
//     return response.data;
// };

// export const updateMessage = async (messageId, message) => {
//     const response = await axios.put(`${BASE_URL}/chat/message/${messageId}`, { message },
//         {
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//         }
//     );
//     return response.data;
// };








