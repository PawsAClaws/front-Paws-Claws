// import React from "react";
// import { useEffect, useState } from "react";
// import { getConversations } from "./ChatApi";
// import avatar from "./assets/avatar.png"


// export default function ChatList({ onSelectConversation }) {


//     // const [conversations, setConversations] = useState([]);

//     // useEffect(() => {
//     //     const fetchData = async () => {
//     //         try {
//     //             const data = await getConversations();

//     //             console.log("Conversations data:", data);

//     //             setConversations(data?.data);
//     //         } catch (error) {
//     //             console.error("Failed to fetch conversations:", error);
//     //         }
//     //     };

//     //     fetchData();
//     // }, []);


//     const conversations = [

//         { name: "User Name", date: "03/04/2025", dis: "Lorem ipsum dolor sit amet consectetur...", img: avatar },
//         { name: "User Name", date: "03/04/2025", dis: "Lorem ipsum dolor sit amet consectetur...", img: avatar },
//         { name: "User Name", date: "03/04/2025", dis: "Lorem ipsum dolor sit amet consectetur...", img: avatar },
//         { name: "User Name", date: "03/04/2025", dis: "Lorem ipsum dolor sit amet consectetur...", img: avatar },
//         { name: "User Name", date: "03/04/2025", dis: "Lorem ipsum dolor sit amet consectetur...", img: avatar },
//         { name: "User Name", date: "03/04/2025", dis: "Lorem ipsum dolor sit amet consectetur...", img: avatar },
//         { name: "User Name", date: "03/04/2025", dis: "Lorem ipsum dolor sit amet consectetur...", img: avatar },
//         { name: "User Name", date: "03/04/2025", dis: "Lorem ipsum dolor sit amet consectetur...", img: avatar },
//         { name: "User Name", date: "03/04/2025", dis: "Lorem ipsum dolor sit amet consectetur...", img: avatar },
//         { name: "User Name", date: "03/04/2025", dis: "Lorem ipsum dolor sit amet consectetur...", img: avatar },
//         { name: "User Name", date: "03/04/2025", dis: "Lorem ipsum dolor sit amet consectetur...", img: avatar },
//         { name: "User Name", date: "03/04/2025", dis: "Lorem ipsum dolor sit amet consectetur...", img: avatar },
//         { name: "User Name", date: "03/04/2025", dis: "Lorem ipsum dolor sit amet consectetur...", img: avatar },
//         { name: "User Name", date: "03/04/2025", dis: "Lorem ipsum dolor sit amet consectetur...", img: avatar },
//         { name: "User Name", date: "03/04/2025", dis: "Lorem ipsum dolor sit amet consectetur...", img: avatar },
//         { name: "User Name", date: "03/04/2025", dis: "Lorem ipsum dolor sit amet consectetur...", img: avatar },

//     ]

//     return (

//         <div className="border-r border-[#BCBCBC] p-[18px] w-full h-full overflow-hidden">
//             <div className="pt-[18px] pb-3">
//                 <input
//                     className="border border-[#A1A1A1] w-full outline-none p-2.5 rounded-lg"
//                     type="search"
//                     placeholder="Search"
//                 />
//             </div>


//             <div className="overflow-y-auto max-h-[800px] pr-1">
//                 <div className="flex gap-2.5 flex-col">
//                     {conversations.map((conv) => (
//                         <div
//                             key={conv.id}
//                             onClick={() => onSelectConversation(conv.id)}
//                         >
//                             <div className="flex gap-2.5 p-2 items-center hover:bg-[#FBF0E7] hover:rounded-lg cursor-pointer">

//                                 <div className="w-[50px] h-[50px] rounded-full">
//                                     <img className="w-full h-full" src={conv.img} alt="" />
//                                 </div>

//                                 <div className="w-full">
//                                     <div className="flex justify-between items-center w-full">
//                                         <div>{conv.name}</div>
//                                         <div>{conv.date}</div>
//                                     </div>
//                                     <div>{conv.dis}</div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>

//     );
// }
