// @refresh reset
"use client"

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { generateChatResponse } from "../utils/action";
import toast from "react-hot-toast";

const Chat = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const { mutate } = useMutation({
    mutationFn: (query) => generateChatResponse([...messages, query]),
    onSuccess: (data) => {
      if (!data) {
        toast.error("Something went wrong.");
        return;
      }
      setMessages((prev) => [...prev, data]);
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = {role: "user", content: text};
    mutate(query);
    setMessages((prev) => [...prev, query]);
    setText("");
  }

  console.log(messages);

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
