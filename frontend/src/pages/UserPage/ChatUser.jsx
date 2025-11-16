import React from "react";
import ChatBox from "../../components/Chat/ChatBox";

const ChatUser = () => {
  // Replace this later with your real logged-in user data
  const currentUser = { _id: "user123", name: "User", role: "user" };
  const chatPartner = { _id: "pandit123", name: "Pandit Ji", role: "pandit" };

  return (
    <div className="p-6">
      <ChatBox currentUser={currentUser} chatPartner={chatPartner} />
    </div>
  );
};

export default ChatUser;
