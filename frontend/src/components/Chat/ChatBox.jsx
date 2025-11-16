// // src/components/Chat/ChatBox.jsx
// import React, { useEffect, useState, useRef } from "react";
// import socket from "../../services/socket";
// import axios from "axios";

// const ChatBox = ({ currentUser, chatPartner }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const messagesEndRef = useRef(null);

//   // ✅ create consistent roomId format
//   const roomId = `user_${currentUser._id}_pandit_${chatPartner._id}`;

//   // 🔹 Scroll to bottom on new message
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   // 🔹 Join chat room + fetch history
//   useEffect(() => {
//     socket.emit("join_room", { roomId, role: currentUser.role });

//     // Fetch old messages from backend
//     const fetchHistory = async () => {
//       try {
//         const res = await axios.get(`/api/chat/history/${roomId}`);
//         if (res.data.success) setMessages(res.data.messages);
//       } catch (err) {
//         console.error("Error loading chat history:", err);
//       }
//     };
//     fetchHistory();

//     // Listen for new messages
//     socket.on("receive_message", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     // Cleanup
//     return () => socket.off("receive_message");
//   }, [roomId, currentUser.role]);

//   // 🔹 Send a message
//   const sendMessage = async () => {
//     if (!newMessage.trim()) return;

//     const messageData = {
//       roomId,
//       userId: currentUser.role === "user" ? currentUser._id : chatPartner._id,
//       panditId: currentUser.role === "pandit" ? currentUser._id : chatPartner._id,
//       sender: currentUser.name,
//       message: newMessage.trim(),
//     };

//     socket.emit("send_message", messageData);
//     setNewMessage("");
//   };

//   return (
//     <div className="flex flex-col h-[80vh] border rounded-lg shadow-md p-4 bg-white">
//       {/* Header */}
//       <div className="border-b pb-3 mb-4">
//         <h2 className="text-xl font-semibold">
//           Chat with {chatPartner.name || "Partner"}
//         </h2>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto space-y-2">
//         {messages.map((msg, i) => {
//           const isMine = msg.sender === currentUser.name;
//           return (
//             <div
//               key={i}
//               className={`p-2 rounded-lg max-w-[70%] ${
//                 isMine ? "ml-auto bg-orange-200" : "mr-auto bg-gray-100"
//               }`}
//             >
//               <p>{msg.message || msg.text}</p>
//               <span className="block text-xs text-gray-500 mt-1">
//                 {new Date(msg.time).toLocaleTimeString()}
//               </span>
//             </div>
//           );
//         })}
//         <div ref={messagesEndRef}></div>
//       </div>

//       {/* Input */}
//       <div className="flex mt-4 gap-2">
//         <input
//           type="text"
//           className="flex-1 border rounded-lg p-2"
//           placeholder="Type a message..."
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-orange-500 text-white px-4 py-2 rounded-lg"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatBox;
