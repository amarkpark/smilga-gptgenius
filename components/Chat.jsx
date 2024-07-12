// @refresh reset
"use client"

import { useState } from "react";

const Chat = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("text submitted: ", text);
    // console.log("messages", messages);

    // // clear the text input
    // setText("");
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
      <div>
        <h2 className="text-3xl">messages</h2>
      </div>
      <form onSubmit={handleSubmit} className="w-full container mx-auto">
        <div className="join w-full">
          <input
            className="input input-bordered w-full join-item"
            placeholder="Message GeniusGPT"
            type="text"
            value={text}
            required
            onChange={(event) => setText(event.target.value)}
          />
          <button className="btn btn-primary join-item">Ask Genius</button>
        </div>
      </form>
    </div>
  )
}

export default Chat;
